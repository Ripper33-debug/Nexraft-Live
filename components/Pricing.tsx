"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryButton, GhostButton } from "@/components/ui/PrimaryButton";
import { FOUNDING_RATE_LINE, PUBLIC_PLANS } from "@/lib/pricing";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Pricing() {
  return (
    <SectionShell id="pricing" ariaLabelledBy="pricing-heading">
      <Reveal>
        <SectionHeader
          specLabel="06 / PRICING"
          titleId="pricing-heading"
          title="Build once. Grow every month."
          subtitle="Three ways to work with us. Exact quote on a discovery call - no surprise invoices."
        />
      </Reveal>

      <Reveal delay={0.04}>
        <div className="mt-10 border border-line bg-ink2 p-5 md:mt-12 md:p-6">
          <p className="text-sm leading-relaxed text-mute">
            <span className="text-bone">How it stacks.</span> Most clients start
            with a Build, attach Care for hosting and upkeep, then move to Growth
            when they want SEO, reviews, and AI automation driving leads.
          </p>
          <p className="mt-3 font-body text-xs leading-normal text-faint">
            {FOUNDING_RATE_LINE}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3 md:items-stretch">
        {PUBLIC_PLANS.map((plan, index) => (
          <Reveal key={plan.id} delay={0.06 + index * 0.04} className="h-full">
            <article
              className={`relative flex h-full flex-col p-6 md:p-7 ${
                plan.popular
                  ? "z-10 border border-signal/25 bg-panel md:-translate-y-3 md:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
                  : "bg-ink2"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-0 top-0 border-b border-l border-line bg-ink px-3 py-1.5 font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
                  Primary MRR
                </span>
              ) : null}

              <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                {plan.kind === "one-time" ? "One-time" : "Monthly"}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                {plan.name}
              </h3>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone">
                {plan.priceLabel}
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
                  <PrimaryButton href={BOOK_CALL_URL} className="w-full">
                    Book a call
                  </PrimaryButton>
                ) : (
                  <GhostButton href={BOOK_CALL_URL} external className="w-full">
                    Book a call
                  </GhostButton>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 font-body text-xs leading-normal text-faint">
        3D configurators and enterprise AI platforms scoped separately on a call{" "}
        {"\u00b7"} Care and Growth retainers run month-to-month after an initial
        term {"\u00b7"} 30 days notice to cancel {"\u00b7"} All prices in USD{" "}
        {"\u00b7"}{" "}
        <a
          href="/legal/sla"
          className={`text-soft underline decoration-line underline-offset-2 hover:text-bone ${focusRing}`}
        >
          SLA summary
        </a>
      </p>
    </SectionShell>
  );
}
