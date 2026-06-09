import "server-only";

import {
  STRIPE_PLAN_KEYS,
  type StripePlanKey,
  isStripePlanKey,
  STRIPE_PLAN_LABELS,
  validatePlanSelection,
} from "@/lib/stripe/plan-keys";

export {
  STRIPE_PLAN_KEYS,
  type StripePlanKey,
  isStripePlanKey,
  validatePlanSelection,
};
export { planKeyFromWebIndex } from "@/lib/stripe/plan-keys";

const PRICE_ENV: Record<StripePlanKey, string> = {
  starter: "STRIPE_PRICE_STARTER",
  growth: "STRIPE_PRICE_GROWTH",
  build: "STRIPE_PRICE_BUILD",
  hosting_managed: "STRIPE_PRICE_HOSTING_MANAGED",
  hosting_performance: "STRIPE_PRICE_HOSTING_PERFORMANCE",
  hosting_enterprise: "STRIPE_PRICE_HOSTING_ENTERPRISE",
  three_d_asset: "STRIPE_PRICE_THREE_D_ASSET",
  three_d_scene: "STRIPE_PRICE_THREE_D_SCENE",
  three_d_studio: "STRIPE_PRICE_THREE_D_STUDIO",
};

export function getStripePriceId(plan: StripePlanKey): string | null {
  const envName = PRICE_ENV[plan];
  return process.env[envName] ?? null;
}

export function getPlanLabel(plan: StripePlanKey): string {
  return STRIPE_PLAN_LABELS[plan];
}

export function resolveCheckoutPlans(
  input: { plan?: string; plans?: string[] },
): { plans: StripePlanKey[] } | { error: string } {
  const raw =
    input.plans?.map((p) => p.toLowerCase()) ??
    (input.plan ? [input.plan.toLowerCase()] : []);

  const plans: StripePlanKey[] = [];

  for (const key of raw) {
    if (!isStripePlanKey(key)) {
      return { error: "One or more selected plans are invalid." };
    }
    if (!plans.includes(key)) plans.push(key);
  }

  const validationError = validatePlanSelection(plans);
  if (validationError) return { error: validationError };

  for (const plan of plans) {
    if (!getStripePriceId(plan)) {
      return { error: `Billing is not configured for ${getPlanLabel(plan)} yet.` };
    }
  }

  return { plans };
}

export function stripeCheckoutEnabled(): boolean {
  return (
    !!process.env.STRIPE_SECRET_KEY &&
    STRIPE_PLAN_KEYS.every((plan) => !!getStripePriceId(plan))
  );
}

export function planKeyFromPriceId(
  priceId: string | null | undefined,
): StripePlanKey | null {
  if (!priceId) return null;

  for (const plan of STRIPE_PLAN_KEYS) {
    if (getStripePriceId(plan) === priceId) return plan;
  }

  return null;
}
