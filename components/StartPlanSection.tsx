"use client";

import { SubscribeButton } from "@/components/SubscribeButton";
import {
  STRIPE_PLAN_LABELS,
  type StripePlanKey,
} from "@/lib/stripe/plan-keys";

const RETAINER_PLANS: {
  key: StripePlanKey;
  price: number;
  summary: string;
  popular?: boolean;
}[] = [
  {
    key: "starter",
    price: 1200,
    summary: "Site care, content updates, and performance monitoring.",
  },
  {
    key: "growth",
    price: 2800,
    summary: "Active development hours for features, integrations, and optimization.",
    popular: true,
  },
  {
    key: "build",
    price: 4500,
    summary: "Dedicated build capacity for apps, platforms, and complex systems.",
  },
];

export function StartPlanSection() {
  return (
    <div className="divide-y divide-border border border-border">
      {RETAINER_PLANS.map((plan) => (
        <article
          key={plan.key}
          className="grid gap-4 p-5 sm:grid-cols-12 sm:items-center sm:gap-6 sm:p-6"
        >
          <div className="sm:col-span-8">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-lg font-semibold text-foreground">
                {STRIPE_PLAN_LABELS[plan.key]}
              </h3>
              {plan.popular && (
                <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-accent">
                  Popular
                </span>
              )}
            </div>
            <p className="mt-1 font-display text-xl font-medium tabular-nums text-foreground">
              ${plan.price.toLocaleString()}
              <span className="font-mono text-xs font-normal text-muted">/mo</span>
            </p>
            <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
              {plan.summary}
            </p>
          </div>
          <div className="sm:col-span-4 sm:flex sm:justify-end">
            <SubscribeButton plan={plan.key} label="Subscribe" variant="primary" />
          </div>
        </article>
      ))}
    </div>
  );
}
