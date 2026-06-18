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
      "Custom Next.js site with CMS, performance baseline, and production deploy. Complex builds with 3D or deep integrations land at the top of the range.",
    items: [
      "Custom design and build",
      "CMS tailored to your content",
      "Managed edge deploy and DNS cutover",
      "Mobile-first, Core Web Vitals tuned",
      "Optional 3D or product viewer add-on",
    ],
    popular: false,
  },
  {
    id: "care",
    name: "Care",
    kind: "monthly" as const,
    priceLabel: "$150–$400/mo",
    summary:
      "The easy attach after every build. We run hosting, security, uptime, and small monthly changes so the site stays fast without you touching servers.",
    items: [
      "Managed hosting and SSL",
      "Uptime and performance monitoring",
      "Security updates and backups",
      "Small content and fix requests",
      "One invoice, no separate server bill",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    kind: "monthly" as const,
    priceLabel: "$750–$1,500/mo",
    summary:
      "Where recurring revenue actually lives. SEO, Google Business Profile, reviews, and AI automation wired into how you sell and support customers.",
    items: [
      "Everything in Care",
      "SEO and local search (GBP)",
      "Review and reputation workflows",
      "AI chat, follow-up, and lead routing",
      "Landing pages and conversion work each month",
    ],
    popular: true,
  },
] as const;

/** Legacy reference rates for Stripe catalog and SEO landing pages. */
export const PRICES = {
  web: {
    buildMin: 3000,
    buildMax: 6000,
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

export const FOUNDING_RATE_LINE = `Founding client rate available for the first ${FOUNDING_SLOTS_TOTAL} qualified retainer clients — ${FOUNDING_DISCOUNT_PCT}% off for the first ${FOUNDING_DISCOUNT_MONTHS} months.`;
