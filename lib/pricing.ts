/**
 * Public pricing ranges and offer copy. Stripe checkout uses separate plan keys.
 */

export const FOUNDING_SLOTS_TOTAL = 3;
export const FOUNDING_SLOTS_REMAINING = 3;
export const FOUNDING_DISCOUNT_PCT = 25;
export const FOUNDING_DISCOUNT_MONTHS = 3;

export const PUBLIC_PLANS = [
  {
    id: "build",
    name: "Build",
    kind: "one-time" as const,
    priceLabel: "$3,000–$6,000",
    summary:
      "One-time custom Next.js sites for businesses that need a modern foundation.",
    items: [
      "Custom site or add-on to your existing stack",
      "One focused tool: quote form, portal slice, or simple 3D viewer",
      "Production deploy, hosting setup, and handoff docs",
      "Scope call locks exact price before build starts",
    ],
    popular: false,
  },
  {
    id: "care",
    name: "Care",
    kind: "monthly" as const,
    priceLabel: "$150–$400/mo",
    summary:
      "Managed hosting and upkeep for your site. We handle security, updates, and monitoring.",
    items: [
      "Managed hosting, monitoring, and security updates",
      "Bug fixes and small feature changes",
      "Performance optimization and Core Web Vitals monitoring",
      "Direct access to founders for support",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    kind: "monthly" as const,
    priceLabel: "$750–$1,500/mo",
    summary:
      "SEO, Google Business Profile, reviews, and AI automation to grow your revenue.",
    items: [
      "SEO optimization and content strategy",
      "Google Business Profile management",
      "Review generation and reputation management",
      "Custom AI tools: copilots, automations, RAG",
    ],
    popular: true,
  },
] as const;

/** Reference rates for SEO landing pages, Stripe catalog, and internal estimates. */
export const PRICES = {
  foundation: {
    min: 3000,
    max: 7500,
  },
  toolBuild: {
    min: 7500,
    max: 25000,
  },
  partner: {
    min: 750,
    max: 2500,
  },
  /** Legacy keys used by migration and SEO landing pages. */
  web: {
    buildMin: 3000,
    buildMax: 7500,
  },
  care: {
    min: 150,
    max: 400,
  },
  growth: {
    min: 750,
    max: 1500,
  },
  threeD: {
    asset: 800,
    scene: 1800,
    studio: 3500,
  },
} as const;

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export function formatUsdRange(min: number, max: number): string {
  return `${formatUsd(min)}–${formatUsd(max)}`;
}

export const FOUNDING_RATE_LINE = `Founding client rate available for the first ${FOUNDING_SLOTS_TOTAL} qualified tool builds — ${FOUNDING_DISCOUNT_PCT}% off the first ${FOUNDING_DISCOUNT_MONTHS} months of a managed partner plan.`;
