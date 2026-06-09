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
    name: "Starter",
    price: 1200,
    summary: "Site care, content updates, and performance monitoring.",
  },
  {
    key: "growth",
    category: "web",
    name: "Growth",
    price: 2800,
    summary: "Active development hours for features, integrations, and optimization.",
    popular: true,
  },
  {
    key: "build",
    category: "web",
    name: "Build",
    price: 4500,
    summary: "Dedicated build capacity for apps, platforms, and complex systems.",
  },
  {
    key: "hosting_managed",
    category: "hosting",
    name: "Managed",
    price: 350,
    summary: "Production hosting with SSL, backups, and uptime monitoring.",
  },
  {
    key: "hosting_performance",
    category: "hosting",
    name: "Performance",
    price: 650,
    summary: "Edge tuning, CDN config, and proactive performance optimization.",
    popular: true,
  },
  {
    key: "hosting_enterprise",
    category: "hosting",
    name: "Enterprise",
    price: 1200,
    summary: "Multi-environment ops with observability and incident response.",
  },
  {
    key: "three_d_asset",
    category: "three_d",
    name: "Asset",
    price: 800,
    summary: "Steady output of models and renders for catalog and marketing.",
  },
  {
    key: "three_d_scene",
    category: "three_d",
    name: "Scene",
    price: 1800,
    summary: "Interactive scenes and walkthroughs delivered on a rolling basis.",
    popular: true,
  },
  {
    key: "three_d_studio",
    category: "three_d",
    name: "Studio",
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
    hint: "Monthly retainer for design, development, and site care.",
  },
  {
    id: "hosting",
    label: "Hosting",
    hint: "Most web clients add hosting so we deploy and monitor the live site.",
  },
  {
    id: "three_d",
    label: "3D",
    hint: "Optional add-on for models, scenes, and interactive assets.",
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
