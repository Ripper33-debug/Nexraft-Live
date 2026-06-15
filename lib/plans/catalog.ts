import type { StripePlanKey } from "@/lib/stripe/plan-keys";

export type PlanCategory = "web" | "hosting" | "three_d";

export type PlanCatalogEntry = {
  key: StripePlanKey;
  category: PlanCategory;
  name: string;
  price: number;
  summary: string;
  popular?: boolean;
};

export const PLAN_CATALOG: PlanCatalogEntry[] = [
  {
    key: "starter",
    category: "web",
    name: "Starter — Managed Website Ops",
    price: 1200,
    summary:
      "We run your site day to day — hosting, CMS, monitoring, and small fixes handled.",
  },
  {
    key: "growth",
    category: "web",
    name: "Growth — Website + Content Support",
    price: 2800,
    summary:
      "Active monthly improvements — content, SEO, landing pages, and conversion work.",
    popular: true,
  },
  {
    key: "build",
    category: "web",
    name: "Build — Product + Web Development",
    price: 4500,
    summary:
      "Serious build capacity for features, integrations, and custom product work.",
  },
  {
    key: "hosting_managed",
    category: "hosting",
    name: "Managed Hosting + Migration",
    price: 350,
    summary:
      "Full migration plus managed hosting, SSL, backups, monitoring, and basic support.",
  },
  {
    key: "hosting_performance",
    category: "hosting",
    name: "Performance Hosting",
    price: 650,
    summary: "Edge tuning, CDN config, and proactive performance optimization.",
    popular: true,
  },
  {
    key: "hosting_enterprise",
    category: "hosting",
    name: "Enterprise Hosting",
    price: 1200,
    summary: "Multi-environment ops with observability and incident response.",
  },
  {
    key: "three_d_asset",
    category: "three_d",
    name: "3D Asset",
    price: 800,
    summary: "Steady output of models and renders for catalog and marketing.",
  },
  {
    key: "three_d_scene",
    category: "three_d",
    name: "3D Scene",
    price: 1800,
    summary: "Interactive scenes and walkthroughs delivered on a rolling basis.",
    popular: true,
  },
  {
    key: "three_d_studio",
    category: "three_d",
    name: "3D Studio",
    price: 3500,
    summary: "Full 3D pipeline capacity for product lines and real-time assets.",
  },
];

export const PLAN_CATEGORIES: {
  id: PlanCategory;
  label: string;
  hint?: string;
}[] = [
  {
    id: "web",
    label: "Web",
    hint: "Monthly retainer — we operate and improve your site.",
  },
  {
    id: "hosting",
    label: "Hosting",
    hint: "Migration and managed infrastructure. Included with every web retainer.",
  },
  {
    id: "three_d",
    label: "3D",
    hint: "Legacy self-serve 3D retainers. New configurators are scoped on a call.",
  },
];

export function plansForCategory(category: PlanCategory): PlanCatalogEntry[] {
  return PLAN_CATALOG.filter((p) => p.category === category);
}

export function catalogEntry(key: StripePlanKey): PlanCatalogEntry | undefined {
  return PLAN_CATALOG.find((p) => p.key === key);
}

export function totalMonthlyPrice(keys: StripePlanKey[]): number {
  return keys.reduce((sum, key) => sum + (catalogEntry(key)?.price ?? 0), 0);
}
