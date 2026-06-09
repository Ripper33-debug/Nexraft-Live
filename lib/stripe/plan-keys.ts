export const STRIPE_PLAN_KEYS = ["starter", "growth", "build"] as const;

export type StripePlanKey = (typeof STRIPE_PLAN_KEYS)[number];

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
  starter: "Starter",
  growth: "Growth",
  build: "Build",
};
