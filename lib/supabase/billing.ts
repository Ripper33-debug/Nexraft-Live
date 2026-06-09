import "server-only";

import type Stripe from "stripe";
import { planKeyFromPriceId } from "@/lib/stripe/plans";
import { getStripe } from "@/lib/stripe/client";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

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

function plansFromSubscription(subscription: Stripe.Subscription): string | null {
  const keys = subscription.items.data
    .map((item) => planKeyFromPriceId(item.price?.id))
    .filter((key): key is NonNullable<typeof key> => !!key);

  return keys.length > 0 ? keys.join(",") : null;
}

function periodEndFromSubscription(
  subscription: Stripe.Subscription,
): string | null {
  const ends = subscription.items.data
    .map((item) => item.current_period_end)
    .filter((n): n is number => typeof n === "number");

  if (ends.length === 0) return null;
  const max = Math.max(...ends);
  return new Date(max * 1000).toISOString();
}

export async function upsertSubscription(input: {
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  email?: string | null;
  subscription: Stripe.Subscription;
}) {
  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const plan = plansFromSubscription(input.subscription);
  const periodEnd = periodEndFromSubscription(input.subscription);
  const email = await resolveCustomerEmail(input.stripeCustomerId, input.email);

  const { error } = await supabase.from("subscriptions").upsert(
    {
      stripe_customer_id: input.stripeCustomerId,
      stripe_subscription_id: input.stripeSubscriptionId,
      email,
      plan,
      status: input.subscription.status,
      current_period_end: periodEnd,
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
