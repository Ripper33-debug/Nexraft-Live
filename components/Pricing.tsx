"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { FOUNDING_RATE_LINE, PUBLIC_PLANS } from "@/lib/pricing";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]";

export function Pricing() {
  return (
    <SectionShell id="pricing" ariaLabelledBy="pricing-heading">
      <Reveal>
        <SectionHeader
          specLabel="07 / PRICING"
          titleId="pricing-heading"
          title="Scoped to the tool you need."
          subtitle="Three common starting points. Exact pricing depends on scope, integrations, and timeline. We quote on a discovery call before any build starts."
        />
      </Reveal>

      <Reveal delay={0.04}>
        <div className="mt-10 border border-border bg-bg-secondary p-5 md:mt-12 md:p-6">
          <p className="text-sm leading-relaxed text-text-secondary">
            <span className="text-text-primary">How it works.</span> Most clients start
            with a focused tool build or a site plus one custom feature, then
            move to a managed partner plan for hosting, updates, and new
            capabilities each month.
          </p>
          <p className="mt-3 font-body text-xs leading-normal text-text-muted">
            {FOUNDING_RATE_LINE}
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3 md:items-stretch">
        {PUBLIC_PLANS.map((plan, index) => (
          <Reveal key={plan.id} delay={0.06 + index * 0.04} className="h-full">
            <article
              className={`relative flex h-full flex-col p-6 md:p-7 ${
                plan.popular
                  ? "z-10 border border-accent-dim bg-bg-secondary md:-translate-y-3 md:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.6)]"
                  : "bg-bg-primary"
              }`}
            >
              {plan.popular ? (
                <span className="absolute right-0 top-0 border-b border-l border-border bg-bg-tertiary px-3 py-1.5 font-jetbrains text-[10px] uppercase tracking-[0.14em] text-accent">
                  Most common
                </span>
              ) : null}

              <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-text-muted">
                {plan.kind === "one-time" ? "One-time" : "Monthly"}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                {plan.name}
              </h3>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-text-primary">
                {plan.priceLabel}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                {plan.summary}
              </p>

              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-text-secondary"
                  >
                    <span className="text-text-muted" aria-hidden="true">
                      {"\u2013"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <a
                  href={BOOK_CALL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full border border-border-light bg-bg-tertiary px-6 py-3 text-center font-jetbrains text-[11px] uppercase tracking-[0.15em] text-text-primary transition-colors hover:bg-border hover:text-text-primary ${focusRing}`}
                >
                  Book a discovery call
                </a>
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 font-body text-xs leading-normal text-text-muted">
        Ranges are starting points, not fixed packages {"\u00b7"} Final quote
        after scope call {"\u00b7"} Managed partner plans run month-to-month
        after an initial term {"\u00b7"} 30 days notice to cancel {"\u00b7"}{" "}
        All prices in USD {"\u00b7"}{" "}
        <a
          href="/legal/sla"
          className={`text-text-tertiary underline decoration-border underline-offset-2 hover:text-text-primary ${focusRing}`}
        >
          SLA summary
        </a>
      </p>
    </SectionShell>
  );
}
