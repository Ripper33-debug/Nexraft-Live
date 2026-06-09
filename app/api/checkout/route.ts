import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";
import {
  getPlanLabel,
  getStripePriceId,
  isStripePlanKey,
} from "@/lib/stripe/plans";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { plan?: string };
    const plan = body.plan?.toLowerCase();

    if (!plan || !isStripePlanKey(plan)) {
      return NextResponse.json(
        { error: "Select a valid retainer plan to subscribe." },
        { status: 400 },
      );
    }

    const priceId = getStripePriceId(plan);

    if (!priceId) {
      return NextResponse.json(
        { error: "Billing is not configured for this plan yet." },
        { status: 503 },
      );
    }

    const stripe = getStripe();
    const siteUrl = getSiteUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteUrl}/pay?status=success`,
      cancel_url: `${siteUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan_key: plan,
        plan_name: getPlanLabel(plan),
      },
      subscription_data: {
        metadata: {
          plan_key: plan,
          plan_name: getPlanLabel(plan),
        },
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Unable to start checkout. Please try again." },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch {
    return NextResponse.json(
      { error: "Unable to start checkout. Please try again or contact us." },
      { status: 500 },
    );
  }
}
