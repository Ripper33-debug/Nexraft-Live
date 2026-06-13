"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import {
  FOUNDING_DISCOUNT_MONTHS,
  FOUNDING_DISCOUNT_PCT,
  FOUNDING_SLOTS_REMAINING,
  FOUNDING_SLOTS_TOTAL,
  PRICES,
  formatUsd,
} from "@/lib/pricing";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

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

            <div className="mt-8">
              {plan.popular ? (
                <MagneticButton href={BOOK_CALL_URL} className="w-full">
                  Book a call
                </MagneticButton>
              ) : (
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex w-full items-center justify-center border border-line px-5 py-3 text-sm text-bone transition-colors duration-300 hover:border-mute ${focusRing}`}
                >
                  Book a call
                </a>
              )}
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
        <Link
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex shrink-0 items-center justify-center border border-line px-5 py-3 text-sm text-bone transition-colors duration-300 hover:border-mute ${focusRing}`}
        >
          Migrate my site
        </Link>
      </div>

      <p className="mt-8 text-xs leading-relaxed text-faint">
        Managed hosting ({formatUsd(PRICES.hosting.managed)}/mo value) included
        with every retainer {"\u00b7"} First-month money-back {"\u00b7"} Cancel
        anytime, 30 days notice
      </p>
    </SectionShell>
  );
}
