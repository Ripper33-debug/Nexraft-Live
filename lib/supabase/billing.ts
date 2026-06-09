import "server-only";

import type Stripe from "stripe";
import { getStripePriceId, type StripePlanKey } from "@/lib/stripe/plans";
import { getStripe } from "@/lib/stripe/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

function planKeyFromPriceId(priceId: string | null | undefined): StripePlanKey | null {
  if (!priceId) return null;

  const entries: StripePlanKey[] = ["starter", "growth", "build"];
  for (const plan of entries) {
    if (getStripePriceId(plan) === priceId) return plan;
  }

  return null;
}

async function resolveCustomerEmail(
  customerId: string,
  hint?: string | null,
): Promise<string | null> {
  if (hint) return hint;

  const stripe = getStripe();
  const customer = await stripe.customers.retrieve(customerId);

  if (customer.deleted) return null;
  return customer.email ?? null;
}

export async function upsertSubscription(input: {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  email?: string | null;
  subscription: Stripe.Subscription;
}) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();

  const primaryItem = input.subscription.items.data[0];
  const priceId = primaryItem?.price?.id ?? null;
  const plan = planKeyFromPriceId(priceId);
  const periodEnd = primaryItem?.current_period_end;

  const email = await resolveCustomerEmail(input.stripeCustomerId, input.email);

  const { error } = await supabase.from("subscriptions").upsert(
    {
      stripe_customer_id: input.stripeCustomerId,
      stripe_subscription_id: input.stripeSubscriptionId,
      email,
      plan,
      status: input.subscription.status,
      current_period_end: periodEnd
        ? new Date(periodEnd * 1000).toISOString()
        : null,
      updated_at: now,
    },
    { onConflict: "stripe_subscription_id" },
  );

  if (error) throw error;
}

export async function findStripeCustomerIdByEmail(
  email: string,
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  const normalized = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .ilike("email", normalized)
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  return data?.stripe_customer_id ?? null;
}
