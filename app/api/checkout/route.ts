import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";
import { getSiteUrl, getStripe } from "@/lib/stripe/client";
import {
  getPlanLabel,
  getStripePriceId,
  partitionPlansByBilling,
  resolveCheckoutPlans,
} from "@/lib/stripe/plans";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const ip = clientIpFromHeaders(request.headers.get("x-forwarded-for"));
    const limit = checkRateLimit(`checkout:${ip}`, 10, 10 * 60 * 1000);

    if (!limit.ok) {
      return NextResponse.json(
        { error: `Too many checkout attempts. Try again in ${limit.retryAfterSec}s.` },
        { status: 429 },
      );
    }

    const body = (await request.json()) as { plan?: string; plans?: string[] };
    const resolved = resolveCheckoutPlans(body);

    if ("error" in resolved) {
      return NextResponse.json({ error: resolved.error }, { status: 400 });
    }

    const { plans } = resolved;
    const { subscription, payment } = partitionPlansByBilling(plans);
    const stripe = getStripe();
    const siteUrl = getSiteUrl();
    const planKeys = plans.join(",");
    const planNames = plans.map((p) => getPlanLabel(p)).join(", ");

    const line_items = [
      ...subscription.map((plan) => ({
        price: getStripePriceId(plan)!,
        quantity: 1,
      })),
      ...payment.map((plan) => ({
        price: getStripePriceId(plan)!,
        quantity: 1,
      })),
    ];

    const session = await stripe.checkout.sessions.create({
      mode: subscription.length > 0 ? "subscription" : "payment",
      line_items,
      success_url: `${siteUrl}/pay?status=success`,
      cancel_url: `${siteUrl}/pay`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      metadata: {
        plan_keys: planKeys,
        plan_names: planNames,
      },
      ...(subscription.length > 0
        ? {
            subscription_data: {
              metadata: {
                plan_keys: planKeys,
                plan_names: planNames,
              },
            },
          }
        : {}),
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
