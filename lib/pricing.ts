/**
 * Public pricing ranges and offer copy. Stripe checkout uses separate plan keys.
 */

export const FOUNDING_SLOTS_TOTAL = 3;
export const FOUNDING_SLOTS_REMAINING = 3;
export const FOUNDING_DISCOUNT_PCT = 25;
export const FOUNDING_DISCOUNT_MONTHS = 3;

export const PUBLIC_PLANS = [
  {
    id: "starter",
    name: "Starter",
    buildLabel: "$1,500",
    monthlyLabel: "$299/mo",
    firstYearLabel: "First year $5,088",
    summary:
      "A fast, credible site for a simple local business — built, launched, and fully managed.",
    items: [
      "Up to 5 core pages",
      "Custom mobile-first design",
      "Contact / quote form + gallery",
      "Managed hosting, SSL, security & backups",
      "1 hour of edits each month",
    ],
    popular: false,
  },
  {
    id: "business",
    name: "Business",
    buildLabel: "$2,500",
    monthlyLabel: "$399/mo",
    firstYearLabel: "First year $7,288",
    summary:
      "Our default. Room for established companies with several services or products to sell.",
    items: [
      "Up to 10 pages",
      "Product / service pages + case studies",
      "Contact and quote forms",
      "Managed hosting, monitoring & priority support",
      "2 hours of edits each month",
    ],
    popular: true,
  },
  {
    id: "pro",
    name: "Pro",
    buildLabel: "$4,000+",
    monthlyLabel: "$599/mo",
    firstYearLabel: "First year $11,188+",
    summary:
      "For premium brands, manufacturers, and larger, more complex sites that need more room.",
    items: [
      "Up to 15 pages, premium design",
      "Multiple product / service sections",
      "Advanced lead forms + case studies",
      "Premium hosting, priority backups & support",
      "4 hours of edits + conversion tweaks / month",
    ],
    popular: false,
  },
] as const;

/** Separate monthly add-on — never bundled into the managed plan fee. */
export const GROWTH_ADDON = {
  name: "Growth",
  priceLabel: "From $750/mo",
  summary:
    "A separate monthly add-on that makes the site actually bring in leads: SEO, Google Business Profile, reviews, landing pages, and lead-follow-up automation with monthly reporting.",
} as const;

/** Legacy reference rates for Stripe catalog and SEO landing pages. */
export const PRICES = {
  web: {
    buildMin: 1500,
    buildMax: 4000,
  },
  care: {
    min: 299,
    max: 599,
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
