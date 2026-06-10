/**
 * Single source of truth for all pricing and offer mechanics.
 * Update FOUNDING_SLOTS_REMAINING here when a slot is claimed.
 */

export const FOUNDING_SLOTS_TOTAL = 3;
export const FOUNDING_SLOTS_REMAINING = 3;
export const FOUNDING_DISCOUNT_PCT = 25;
export const FOUNDING_DISCOUNT_MONTHS = 3;

export const PRICES = {
  launchSprint: 3500,
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
} as const;

export const BUNDLE_GROWTH_MANAGED =
  PRICES.web.growth + PRICES.hosting.managed;

export function formatUsd(value: number): string {
  return `$${value.toLocaleString("en-US")}`;
}

export const FOUNDING_RATE_LINE = `Founding rate \u2014 first ${FOUNDING_SLOTS_TOTAL} clients get ${FOUNDING_DISCOUNT_PCT}% off any retainer for the first ${FOUNDING_DISCOUNT_MONTHS} months. ${FOUNDING_SLOTS_REMAINING} of ${FOUNDING_SLOTS_TOTAL} slots open.`;
