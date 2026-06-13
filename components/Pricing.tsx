"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryButton, GhostButton } from "@/components/ui/PrimaryButton";
import {
  FOUNDING_DISCOUNT_MONTHS,
  FOUNDING_DISCOUNT_PCT,
  FOUNDING_SLOTS_REMAINING,
  FOUNDING_SLOTS_TOTAL,
  PRICES,
  formatUsd,
} from "@/lib/pricing";
import { BOOK_CALL_URL } from "@/lib/site";

const plans = [
  {
    name: "Starter",
    price: PRICES.web.starter,
    summary:
      "Ongoing site care, content updates, and performance monitoring.",
    items: [
      "Custom-built CMS included",
      "Up to 8 pages maintained",
      "Content updates & publishing",
      "Monthly performance report",
      "Bug fixes within 48h",
    ],
    popular: false,
  },
  {
    name: "Growth",
    price: PRICES.web.growth,
    summary:
      "Active development for features, integrations, and optimization.",
    items: [
      "Everything in Starter",
      "20 dev hours per month",
      "A/B tests & conversion work",
      "API & third-party integrations",
      "Bi-weekly sync & roadmap",
    ],
    popular: true,
  },
  {
    name: "Build",
    price: PRICES.web.build,
    summary: "Dedicated capacity for apps, platforms, and complex systems.",
    items: [
      "Everything in Growth",
      "40 dev hours per month",
      "Full-stack feature delivery",
      "Architecture & code review",
      "Priority queue, same-day triage",
    ],
    popular: false,
  },
] as const;

export function Pricing() {
  return (
    <SectionShell id="pricing" ariaLabelledBy="pricing-heading">
      <Reveal>
        <SectionHeader
          specLabel="06 / PRICING"
          titleId="pricing-heading"
          title="Monthly rates. No surprises."
        />
      </Reveal>

      <div className="mt-10 border border-line bg-ink2 p-5 md:mt-12 md:p-6">
        <p className="text-sm leading-relaxed text-mute">
          <span className="text-bone">Founding rate.</span> First{" "}
          {FOUNDING_SLOTS_TOTAL} clients get {FOUNDING_DISCOUNT_PCT}% off any
          retainer for {FOUNDING_DISCOUNT_MONTHS} months.{" "}
          {FOUNDING_SLOTS_REMAINING} of {FOUNDING_SLOTS_TOTAL} slots open.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3 md:items-stretch">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`relative flex h-full flex-col p-6 md:p-7 ${
              plan.popular
                ? "z-10 bg-panel md:-translate-y-3 md:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
                : "bg-ink2"
            }`}
          >
            {plan.popular ? (
              <span className="absolute right-0 top-0 border-b border-l border-line bg-ink px-3 py-1.5 text-xs text-faint">
                Most common
              </span>
            ) : null}

            <h3 className="font-display text-2xl font-semibold text-bone">
              {plan.name}
            </h3>
            <p className="mt-2 font-display text-3xl font-semibold tracking-tight text-bone">
              {formatUsd(plan.price)}
              <span className="ml-1 text-base font-normal text-mute">/mo</span>
            </p>
            <p className="mt-4 text-sm leading-relaxed text-mute">
              {plan.summary}
            </p>

            <ul className="mt-6 flex-1 space-y-2.5">
              {plan.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-mute"
                >
                  <span className="text-faint" aria-hidden="true">
                    {"\u2013"}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3">
              <PrimaryButton href={BOOK_CALL_URL} className="w-full">
                Book a call
              </PrimaryButton>
              <GhostButton href="/pay" className="w-full">
                Activate retainer
              </GhostButton>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-6 border border-line bg-ink2 p-6 md:flex-row md:items-center md:justify-between md:p-7">
        <div>
          <p className="font-display text-2xl font-semibold text-bone md:text-3xl">
            {formatUsd(PRICES.hosting.managed)}/mo
          </p>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-mute">
            On Squarespace, Wix, or WordPress? We migrate you to managed edge
            infrastructure and run it. Migration included.
          </p>
        </div>
        <GhostButton href={BOOK_CALL_URL} external>
          Migrate my site
        </GhostButton>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-faint">
        Managed hosting ({formatUsd(PRICES.hosting.managed)}/mo value) included
        with every retainer {"\u00b7"} First-month money-back {"\u00b7"} Cancel
        anytime, 30 days notice {"\u00b7"} All prices in USD {"\u00b7"}{" "}
        <a href="/legal/sla" className="text-mute underline decoration-line underline-offset-2 hover:text-bone">
          SLA summary
        </a>
      </p>
    </SectionShell>
  );
}
