import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { consumePortalToken, redisConfigured } from "@/lib/redis";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const ip = clientIpFromHeaders(request.headers.get("x-forwarded-for"));
  const limit = await checkRateLimit(`portal-verify:${ip}`, 10, 15 * 60 * 1000);

  if (!limit.ok) {
    return NextResponse.redirect(
      new URL(`/pay?portal=rate_limit`, getSiteUrl()),
    );
  }

  if (!redisConfigured()) {
    return NextResponse.redirect(new URL(`/pay?portal=unavailable`, getSiteUrl()));
  }

  const token = request.nextUrl.searchParams.get("token")?.trim();

  if (!token) {
    return NextResponse.redirect(new URL(`/pay?portal=invalid`, getSiteUrl()));
  }

  const payload = await consumePortalToken(token);

  if (!payload) {
    return NextResponse.redirect(new URL(`/pay?portal=invalid`, getSiteUrl()));
  }

  try {
    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.billingPortal.sessions.create({
      customer: payload.stripeCustomerId,
      return_url: `${siteUrl}/pay`,
    });

    if (!session.url) {
      return NextResponse.redirect(new URL(`/pay?portal=error`, getSiteUrl()));
    }

    return NextResponse.redirect(session.url);
  } catch {
    return NextResponse.redirect(new URL(`/pay?portal=error`, getSiteUrl()));
  }
}
