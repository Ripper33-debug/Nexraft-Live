import "server-only";

import {
  STRIPE_PLAN_KEYS,
  type StripePlanKey,
  isStripePlanKey,
  STRIPE_PLAN_LABELS,
} from "@/lib/stripe/plan-keys";

export { STRIPE_PLAN_KEYS, type StripePlanKey, isStripePlanKey };
export { planKeyFromWebIndex } from "@/lib/stripe/plan-keys";

export function getStripePriceId(plan: StripePlanKey): string | null {
  const envMap: Record<StripePlanKey, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    growth: process.env.STRIPE_PRICE_GROWTH,
    build: process.env.STRIPE_PRICE_BUILD,
  };
  return envMap[plan] ?? null;
}

export function getPlanLabel(plan: StripePlanKey): string {
  return STRIPE_PLAN_LABELS[plan];
}

export function stripeCheckoutEnabled(): boolean {
  return (
    !!process.env.STRIPE_SECRET_KEY &&
    STRIPE_PLAN_KEYS.every((plan) => !!getStripePriceId(plan))
  );
}
