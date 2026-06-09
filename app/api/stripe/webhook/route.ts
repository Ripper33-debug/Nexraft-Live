import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe/client";
import { upsertSubscription } from "@/lib/supabase/billing";
import { supabaseConfigured } from "@/lib/supabase/admin";

export const runtime = "nodejs";

async function syncCheckoutSession(session: Stripe.Checkout.Session) {
  const customerId =
    typeof session.customer === "string" ? session.customer : session.customer?.id;

  if (!customerId) return;

  const email =
    session.customer_details?.email ?? session.customer_email ?? null;

  const subscriptionId =
    typeof session.subscription === "string"
      ? session.subscription
      : session.subscription?.id;

  if (!subscriptionId) return;

  const stripe = getStripe();
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await upsertSubscription({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscriptionId,
    email,
    subscription,
  });
}

async function syncSubscriptionEvent(subscription: Stripe.Subscription) {
  const customerId = String(subscription.customer);

  await upsertSubscription({
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    subscription,
  });
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  if (!supabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const rawBody = await request.text();
  const stripe = getStripe();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === "subscription") {
          await syncCheckoutSession(session);
        }
        break;
      }
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await syncSubscriptionEvent(subscription);
        break;
      }
      default:
        break;
    }
  } catch {
    return NextResponse.json({ error: "Webhook handler failed." }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
