import type { StripePlanKey } from "@/lib/stripe/plan-keys";

export type PlanCategory = "retainer" | "build";

export type PlanCatalogEntry = {
  key: StripePlanKey;
  category: PlanCategory;
  name: string;
  price: number;
  priceLabel: string;
  summary: string;
  popular?: boolean;
};

export const PLAN_CATALOG: PlanCatalogEntry[] = [
  {
    key: "care_150",
    category: "retainer",
    name: "Care",
    price: 150,
    priceLabel: "$150/mo",
    summary: "Hosting, security, uptime, and small monthly changes.",
  },
  {
    key: "care_275",
    category: "retainer",
    name: "Care",
    price: 275,
    priceLabel: "$275/mo",
    summary: "Mid-tier Care for active sites with regular content updates.",
    popular: true,
  },
  {
    key: "care_400",
    category: "retainer",
    name: "Care",
    price: 400,
    priceLabel: "$400/mo",
    summary: "Higher-touch Care with more monthly fix and content capacity.",
  },
  {
    key: "growth_750",
    category: "retainer",
    name: "Growth",
    price: 750,
    priceLabel: "$750/mo",
    summary: "SEO, Google profile, reviews, and light AI automation.",
  },
  {
    key: "growth_1125",
    category: "retainer",
    name: "Growth",
    price: 1125,
    priceLabel: "$1,125/mo",
    summary: "Full Growth retainer: SEO, local search, reviews, and AI workflows.",
    popular: true,
  },
  {
    key: "growth_1500",
    category: "retainer",
    name: "Growth",
    price: 1500,
    priceLabel: "$1,500/mo",
    summary: "Maximum Growth capacity for aggressive lead-gen and automation.",
  },
  {
    key: "build_3000",
    category: "build",
    name: "Build",
    price: 3000,
    priceLabel: "$3,000",
    summary: "Custom Next.js site with CMS and production deploy.",
  },
  {
    key: "build_4500",
    category: "build",
    name: "Build",
    price: 4500,
    priceLabel: "$4,500",
    summary: "Mid-range custom build with richer CMS and integrations.",
    popular: true,
  },
  {
    key: "build_6000",
    category: "build",
    name: "Build",
    price: 6000,
    priceLabel: "$6,000",
    summary: "Complex build with 3D, configurators, or deep custom work.",
  },
];

export const PLAN_CATEGORIES: {
  id: PlanCategory;
  label: string;
  hint?: string;
}[] = [
  {
    id: "retainer",
    label: "Monthly retainer",
    hint: "Pick Care for hosting and upkeep, or Growth for SEO and AI automation.",
  },
  {
    id: "build",
    label: "Build (one-time)",
    hint: "Optional. Custom site build billed once at checkout. Most clients add Care after launch.",
  },
];

export function plansForCategory(category: PlanCategory): PlanCatalogEntry[] {
  return PLAN_CATALOG.filter((p) => p.category === category);
}

export function catalogEntry(key: StripePlanKey): PlanCatalogEntry | undefined {
  return PLAN_CATALOG.find((p) => p.key === key);
}

export function totalMonthlyPrice(keys: StripePlanKey[]): number {
  return keys.reduce((sum, key) => {
    const entry = catalogEntry(key);
    if (!entry || entry.category !== "retainer") return sum;
    return sum + entry.price;
  }, 0);
}

export function totalBuildPrice(keys: StripePlanKey[]): number {
  return keys.reduce((sum, key) => {
    const entry = catalogEntry(key);
    if (!entry || entry.category !== "build") return sum;
    return sum + entry.price;
  }, 0);
}
