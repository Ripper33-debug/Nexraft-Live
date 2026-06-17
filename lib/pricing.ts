/**
 * Single source of truth for all pricing and offer mechanics.
 * Update FOUNDING_SLOTS_REMAINING here when a slot is claimed.
 */

export const FOUNDING_SLOTS_TOTAL = 3;
export const FOUNDING_SLOTS_REMAINING = 3;
export const FOUNDING_DISCOUNT_PCT = 25;
export const FOUNDING_DISCOUNT_MONTHS = 3;

export const PRICES = {
  web: {
    starter: 1200,
    growth: 2800,
    build: 4500,
  },
  hosting: {
    managed: 350,
    performance: 650,
    enterprise: 1200,
  },
  threeD: {
    asset: 800,
    scene: 1800,
    studio: 3500,
  },
  ai: {
    workflow: 750,
    customer: 1500,
    platform: 3500,
  },
} as const;

export const BUNDLE_GROWTH_MANAGED =
  PRICES.web.growth + PRICES.hosting.managed;

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export const FOUNDING_RATE_LINE = `Founding client rate available for the first ${FOUNDING_SLOTS_TOTAL} qualified retainer clients — ${FOUNDING_DISCOUNT_PCT}% off for the first ${FOUNDING_DISCOUNT_MONTHS} months.`;

/** Homepage 3D configurators section (scoped on discovery call; not self-serve checkout). */
export const THREE_D_OFFERS = [
  {
    id: "viewer",
    name: "3D Viewer",
    price: "From $3,500 setup + $500/mo",
    description:
      "For companies that want customers to view and explore a product in 3D.",
  },
  {
    id: "configurator",
    name: "3D Configurator",
    price: "From $8,000–$15,000 setup + $1,000–$3,000/mo",
    description:
      "For products with options, colors, parts, layouts, or custom configurations.",
  },
  {
    id: "enterprise",
    name: "Industrial / Enterprise Configurator",
    price: "Custom quote",
    description:
      "For complex products, large models, CAD workflows, private portals, or advanced integrations.",
  },
] as const;

/** Homepage custom AI tools section (scoped on discovery call; not self-serve checkout). */
export const AI_OFFERS = [
  {
    id: "workflow",
    name: "Workflow Copilot",
    price: "From $2,500 setup + $750/mo",
    description:
      "Internal tools that automate repetitive work: document search, draft generation, CRM updates, and ops checklists wired to your stack.",
  },
  {
    id: "customer",
    name: "Customer AI Tool",
    price: "From $5,000 setup + $1,500/mo",
    description:
      "A branded assistant on your site or app: product Q&A, support triage, lead qualification, and handoff to your team when it matters.",
  },
  {
    id: "platform",
    name: "Custom AI Platform",
    price: "Custom quote",
    description:
      "Multi-step agents, private data pipelines, admin dashboards, and integrations with your CRM, ERP, or product APIs.",
  },
] as const;
