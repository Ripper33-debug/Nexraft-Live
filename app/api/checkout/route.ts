import { NextResponse, type NextRequest } from "next/server";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";
import {
  getPlanLabel,
  getStripePriceId,
  resolveCheckoutPlans,
} from "@/lib/stripe/plans";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { plan?: string; plans?: string[] };
    const resolved = resolveCheckoutPlans(body);

    if ("error" in resolved) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }

    const { plans } = resolved;
    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const planKeys = plans.join(",");
    const planNames = plans.map((p) => getPlanLabel(p)).join(", ");

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: plans.map((plan) => ({
        price: getStripePriceId(plan)!,
        quantity: 1,
      })),
      success_url: `${siteUrl}/pay?status=success`,
      cancel_url: `${siteUrl}/pricing`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan_keys: planKeys,
        plan_names: planNames,
      },
      subscription_data: {
        metadata: {
          plan_keys: planKeys,
          plan_names: planNames,
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
