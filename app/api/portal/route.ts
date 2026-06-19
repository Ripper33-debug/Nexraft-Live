import { NextResponse, type NextRequest } from "next/server";
import { sendPortalMagicLink, emailConfigured } from "@/lib/email";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { createPortalToken, redisConfigured } from "@/lib/redis";
import { getSiteUrl } from "@/lib/stripe/client";
import { findStripeCustomerIdByEmail } from "@/lib/supabase/billing";
import { supabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const PORTAL_ERROR =
  "Unable to open billing portal. Confirm your checkout email or subscribe first.";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIpFromHeaders(request.headers.get("x-forwarded-for"));
    const limit = await checkRateLimit(`portal:${ip}`, 5, 15 * 60 * 1000);

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

    if (!redisConfigured()) {
      return NextResponse.json(
        {
          error:
            "Billing portal verification is temporarily unavailable. Email barry@nexraft.com for help.",
        },
        { status: 503 },
      );
    }

    if (!emailConfigured()) {
      return NextResponse.json(
        {
          error:
            "Billing portal verification is temporarily unavailable. Email barry@nexraft.com for help.",
        },
        { status: 503 },
      );
    }

    const stripeCustomerId = await findStripeCustomerIdByEmail(email);

    if (!stripeCustomerId) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 400 });
    }

    const token = await createPortalToken({
      stripeCustomerId,
      email,
    });

    if (!token) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 500 });
    }

    const siteUrl = getSiteUrl();
    const verifyUrl = `${siteUrl}/api/portal/verify?token=${encodeURIComponent(token)}`;
    const sent = await sendPortalMagicLink(email, verifyUrl);

    if (!sent.ok) {
      return NextResponse.json({ error: PORTAL_ERROR }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      message:
        "Check your inbox for a secure billing link. It expires in 15 minutes.",
    });
  } catch {
    return NextResponse.json({ error: PORTAL_ERROR }, { status: 500 });
  }
}
