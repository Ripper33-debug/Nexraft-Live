export const STRIPE_PLAN_KEYS = [
  "care_150",
  "care_275",
  "care_400",
  "growth_750",
  "growth_1125",
  "growth_1500",
  "build_3000",
  "build_4500",
  "build_6000",
] as const;

export type StripePlanKey = (typeof STRIPE_PLAN_KEYS)[number];

export type PlanCategory = "care" | "growth" | "build";

export type RetainerFamily = "care" | "growth";

export const PLAN_CATEGORY_BY_KEY: Record<StripePlanKey, PlanCategory> = {
  care_150: "care",
  care_275: "care",
  care_400: "care",
  growth_750: "growth",
  growth_1125: "growth",
  growth_1500: "growth",
  build_3000: "build",
  build_4500: "build",
  build_6000: "build",
};

export const RETAINER_FAMILY_BY_KEY: Record<
  StripePlanKey,
  RetainerFamily | null
> = {
  care_150: "care",
  care_275: "care",
  care_400: "care",
  growth_750: "growth",
  growth_1125: "growth",
  growth_1500: "growth",
  build_3000: null,
  build_4500: null,
  build_6000: null,
};

export const PLAN_BILLING_MODE: Record<
  StripePlanKey,
  "subscription" | "payment"
> = {
  care_150: "subscription",
  care_275: "subscription",
  care_400: "subscription",
  growth_750: "subscription",
  growth_1125: "subscription",
  growth_1500: "subscription",
  build_3000: "payment",
  build_4500: "payment",
  build_6000: "payment",
};

export function isStripePlanKey(value: string): value is StripePlanKey {
  return STRIPE_PLAN_KEYS.includes(value as StripePlanKey);
}

/** Legacy deep links from proposal indexes. */
export function planKeyFromWebIndex(index: string): StripePlanKey | null {
  const map: Record<string, StripePlanKey> = {
    "01": "care_275",
    "02": "growth_1125",
    "03": "build_4500",
  };
  return map[index] ?? null;
}

export const STRIPE_PLAN_LABELS: Record<StripePlanKey, string> = {
  care_150: "Care — $150/mo",
  care_275: "Care — $275/mo",
  care_400: "Care — $400/mo",
  growth_750: "Growth — $750/mo",
  growth_1125: "Growth — $1,125/mo",
  growth_1500: "Growth — $1,500/mo",
  build_3000: "Build — $3,000",
  build_4500: "Build — $4,500",
  build_6000: "Build — $6,000",
};

export function validatePlanSelection(plans: StripePlanKey[]): string | null {
  if (plans.length === 0) {
    return "Select Care, Growth, or a Build package.";
  }

  const care = plans.filter((p) => PLAN_CATEGORY_BY_KEY[p] === "care");
  const growth = plans.filter((p) => PLAN_CATEGORY_BY_KEY[p] === "growth");
  const builds = plans.filter((p) => PLAN_CATEGORY_BY_KEY[p] === "build");

  if (care.length > 1) {
    return "Pick one Care tier.";
  }

  if (growth.length > 1) {
    return "Pick one Growth tier.";
  }

  if (care.length > 0 && growth.length > 0) {
    return "Pick Care or Growth, not both.";
  }

  if (builds.length > 1) {
    return "Pick one build package.";
  }

  return null;
}

export function partitionPlansByBilling(plans: StripePlanKey[]): {
  subscription: StripePlanKey[];
  payment: StripePlanKey[];
} {
  const subscription: StripePlanKey[] = [];
  const payment: StripePlanKey[] = [];

  for (const plan of plans) {
    if (PLAN_BILLING_MODE[plan] === "payment") {
      payment.push(plan);
    } else {
      subscription.push(plan);
    }
  }

  return { subscription, payment };
}
