/**
 * Creates Nexraft products/prices in Stripe and prints env vars for .env.local.
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... npm run stripe:sync
 */

import Stripe from "stripe";

const PLANS = [
  {
    key: "care_150",
    env: "STRIPE_PRICE_CARE_150",
    name: "Nexraft Care",
    amount: 15000,
    interval: "month",
  },
  {
    key: "care_275",
    env: "STRIPE_PRICE_CARE_275",
    name: "Nexraft Care",
    amount: 27500,
    interval: "month",
  },
  {
    key: "care_400",
    env: "STRIPE_PRICE_CARE_400",
    name: "Nexraft Care",
    amount: 40000,
    interval: "month",
  },
  {
    key: "growth_750",
    env: "STRIPE_PRICE_GROWTH_750",
    name: "Nexraft Growth",
    amount: 75000,
    interval: "month",
  },
  {
    key: "growth_1125",
    env: "STRIPE_PRICE_GROWTH_1125",
    name: "Nexraft Growth",
    amount: 112500,
    interval: "month",
  },
  {
    key: "growth_1500",
    env: "STRIPE_PRICE_GROWTH_1500",
    name: "Nexraft Growth",
    amount: 150000,
    interval: "month",
  },
  {
    key: "build_3000",
    env: "STRIPE_PRICE_BUILD_3000",
    name: "Nexraft Build",
    amount: 300000,
    interval: null,
  },
  {
    key: "build_4500",
    env: "STRIPE_PRICE_BUILD_4500",
    name: "Nexraft Build",
    amount: 450000,
    interval: null,
  },
  {
    key: "build_6000",
    env: "STRIPE_PRICE_BUILD_6000",
    name: "Nexraft Build",
    amount: 600000,
    interval: null,
  },
];

async function main() {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    console.error("Missing STRIPE_SECRET_KEY.");
    process.exit(1);
  }

  const stripe = new Stripe(secret);
  const lines = [];

  console.log("Syncing Nexraft plans to Stripe...\n");

  for (const plan of PLANS) {
    const label =
      plan.interval === "month"
        ? `$${(plan.amount / 100).toLocaleString()}/mo`
        : `$${(plan.amount / 100).toLocaleString()} one-time`;

    const product = await stripe.products.create({
      name: `${plan.name} (${label})`,
      metadata: {
        nexraft_plan_key: plan.key,
      },
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.amount,
      currency: "usd",
      ...(plan.interval
        ? { recurring: { interval: plan.interval } }
        : {}),
      metadata: {
        nexraft_plan_key: plan.key,
      },
    });

    lines.push(`${plan.env}=${price.id}`);
    console.log(`${plan.key} -> ${price.id} (${label})`);
  }

  console.log("\nAdd these to .env.local and Vercel:\n");
  console.log(lines.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
