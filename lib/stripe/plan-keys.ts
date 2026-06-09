export const STRIPE_PLAN_KEYS = [
  "starter",
  "growth",
  "build",
  "hosting_managed",
  "hosting_performance",
  "hosting_enterprise",
  "three_d_asset",
  "three_d_scene",
  "three_d_studio",
] as const;

export type StripePlanKey = (typeof STRIPE_PLAN_KEYS)[number];

export type PlanCategory = "web" | "hosting" | "three_d";

export const PLAN_CATEGORY_BY_KEY: Record<StripePlanKey, PlanCategory> = {
  starter: "web",
  growth: "web",
  build: "web",
  hosting_managed: "hosting",
  hosting_performance: "hosting",
  hosting_enterprise: "hosting",
  three_d_asset: "three_d",
  three_d_scene: "three_d",
  three_d_studio: "three_d",
};

export function isStripePlanKey(value: string): value is StripePlanKey {
  return STRIPE_PLAN_KEYS.includes(value as StripePlanKey);
}

export function planKeyFromWebIndex(index: string): StripePlanKey | null {
  const map: Record<string, StripePlanKey> = {
    "01": "starter",
    "02": "growth",
    "03": "build",
  };
  return map[index] ?? null;
}

export const STRIPE_PLAN_LABELS: Record<StripePlanKey, string> = {
  starter: "Web Starter",
  growth: "Web Growth",
  build: "Web Build",
  hosting_managed: "Hosting Managed",
  hosting_performance: "Hosting Performance",
  hosting_enterprise: "Hosting Enterprise",
  three_d_asset: "3D Asset",
  three_d_scene: "3D Scene",
  three_d_studio: "3D Studio",
};

export function validatePlanSelection(plans: StripePlanKey[]): string | null {
  if (plans.length === 0) {
    return "Select at least one monthly service.";
  }

  const categories = plans.map((p) => PLAN_CATEGORY_BY_KEY[p]);
  if (new Set(categories).size !== categories.length) {
    return "Pick at most one plan per category (Web, Hosting, 3D).";
  }

  return null;
}
