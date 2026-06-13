import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";
import { findStripeCustomerIdByEmail } from "@/lib/supabase/billing";
import { supabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PORTAL_ERROR =
  "Unable to open billing portal. Confirm your checkout email or subscribe first.";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIpFromHeaders(request.headers.get("x-forwarded-for"));
    const limit = checkRateLimit(`portal:${ip}`, 5, 15 * 60 * 1000);

    if (!limit.ok) {
      return NextResponse.json(
        { error: `Too many attempts. Try again in ${limit.retryAfterSec}s.` },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 400 });
    }

    if (!supabaseConfigured()) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 503 });
    }

    const stripeCustomerId = await findStripeCustomerIdByEmail(email);

    if (!stripeCustomerId) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 400 });
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${siteUrl}/pay`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json({ error: PORTAL_ERROR }, { status: 500 });
  }
}
