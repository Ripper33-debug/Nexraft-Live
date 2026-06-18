import "server-only";

import {
  STRIPE_PLAN_KEYS,
  type StripePlanKey,
  isStripePlanKey,
  STRIPE_PLAN_LABELS,
  validatePlanSelection,
  partitionPlansByBilling,
} from "@/lib/stripe/plan-keys";

export {
  STRIPE_PLAN_KEYS,
  type StripePlanKey,
  isStripePlanKey,
  validatePlanSelection,
  partitionPlansByBilling,
};
export { planKeyFromWebIndex } from "@/lib/stripe/plan-keys";

const PRICE_ENV: Record<StripePlanKey, string> = {
  care_150: "STRIPE_PRICE_CARE_150",
  care_275: "STRIPE_PRICE_CARE_275",
  care_400: "STRIPE_PRICE_CARE_400",
  growth_750: "STRIPE_PRICE_GROWTH_750",
  growth_1125: "STRIPE_PRICE_GROWTH_1125",
  growth_1500: "STRIPE_PRICE_GROWTH_1500",
  build_3000: "STRIPE_PRICE_BUILD_3000",
  build_4500: "STRIPE_PRICE_BUILD_4500",
  build_6000: "STRIPE_PRICE_BUILD_6000",
};

export function getStripePriceEnvName(plan: StripePlanKey): string {
  return PRICE_ENV[plan];
}

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
      return {
        error: `Billing is not configured for ${getPlanLabel(plan)} yet. Run npm run stripe:sync or set ${getStripePriceEnvName(plan)}.`,
      };
    }
  }

  return { plans };
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
