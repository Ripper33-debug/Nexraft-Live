import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";
import { findStripeCustomerIdByEmail } from "@/lib/supabase/billing";
import { supabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim().toLowerCase();

    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json(
        { error: "Enter the email used at checkout." },
        { status: 400 },
      );
    }

    if (!supabaseConfigured()) {
      return NextResponse.json(
        { error: "Billing portal is not configured yet." },
        { status: 503 },
      );
    }

    const stripeCustomerId = await findStripeCustomerIdByEmail(email);

    if (!stripeCustomerId) {
      return NextResponse.json(
        {
          error:
            "No billing account found for that email. Subscribe first or use your checkout email.",
        },
        { status: 404 },
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${siteUrl}/pay`,
    });

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Unable to open billing portal. Please try again." },
      { status: 500 },
    );
  }
}
