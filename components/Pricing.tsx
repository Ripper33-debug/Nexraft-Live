"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { PrimaryButton, GhostButton } from "@/components/ui/PrimaryButton";
import {
  FOUNDING_DISCOUNT_MONTHS,
  FOUNDING_DISCOUNT_PCT,
  FOUNDING_SLOTS_TOTAL,
  PRICES,
  THREE_D_OFFERS,
  AI_OFFERS,
  formatUsd,
} from "@/lib/pricing";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function StartLink({ className = "" }: { className?: string }) {
  return (
    <a
      href="/pay"
      className={`inline-flex items-center justify-center gap-1.5 text-sm text-soft underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-bone ${focusRing} ${className}`}
    >
      Start With Nexraft
      <span aria-hidden="true">{"\u2192"}</span>
    </a>
  );
}

const webPlans = [
  {
    id: "starter",
    name: "Starter",
    tier: "Managed Website Ops",
    price: PRICES.web.starter,
    summary:
      "Your website, fully handled. We run hosting, CMS, monitoring, and fixes so you do not have to think about it.",
    items: [
      "Managed hosting included",
      "CMS support",
      "Uptime monitoring",
      "Backups",
      "Security updates",
      "Monthly performance report",
      "Up to 5 support hours per month",
      "48-hour turnaround on small fixes",
    ],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    tier: "Website + Content Support",
    price: PRICES.web.growth,
    summary:
      "Your site gets better every month. Content, SEO, landing pages, and conversion work — handled by one team.",
    items: [
      "Everything in Starter",
      "Up to 20 dev and design hours per month",
      "Landing page updates",
      "Content updates",
      "SEO improvements",
      "Analytics and reporting",
      "Conversion improvements",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "build",
    name: "Build",
    tier: "Product + Web Development",
    price: PRICES.web.build,
    summary:
      "For companies building real tools — custom features, integrations, and full-stack delivery every month.",
    items: [
      "Everything in Growth",
      "Up to 40 dev and design hours per month",
      "Full-stack web development",
      "Custom features",
      "Technical architecture",
      "Integrations",
      "Same-day triage",
      "Priority roadmap planning",
    ],
    popular: false,
  },
] as const;

const hostingIncludes = [
  "Website migration",
  "Managed hosting",
  "SSL",
  "Backups",
  "Uptime monitoring",
  "Performance checks",
  "Basic support",
] as const;

export function Pricing() {
  return (
    <SectionShell id="pricing" ariaLabelledBy="pricing-heading">
      <Reveal>
        <SectionHeader
          specLabel="06 / PRICING"
          titleId="pricing-heading"
          title="Monthly rates. No surprises."
          subtitle="Pick a retainer. We handle the rest — web, hosting, and ops in one invoice."
        />
      </Reveal>

      <Reveal delay={0.04}>
        <div className="mt-10 border border-line bg-ink2 p-5 md:mt-12 md:p-6">
          <p className="text-sm leading-relaxed text-mute">
            <span className="text-bone">Founding client rate.</span> Available
            for the first {FOUNDING_SLOTS_TOTAL} qualified retainer clients —{" "}
            {FOUNDING_DISCOUNT_PCT}% off for the first {FOUNDING_DISCOUNT_MONTHS}{" "}
            months.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-faint">
            Month-to-month after the initial term. No build fee, no setup fee.
          </p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3 md:items-stretch">
        {webPlans.map((plan, index) => (
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
                  Most Popular
                </span>
              ) : null}

              <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                {plan.name}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                {plan.tier}
              </h3>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone">
                {formatUsd(plan.price)}
                <span className="ml-1 text-base font-normal text-mute">/mo</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                {plan.summary}
              </p>

              <p className="mt-4 border-l border-line pl-3 font-body text-xs leading-normal text-mute">
                Includes a 6-month initial term - enough runway to actually
                move your numbers, not just launch and leave.
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
                {plan.popular ? (
                  <PrimaryButton href={BOOK_CALL_URL} className="w-full">
                    Book a Call
                  </PrimaryButton>
                ) : (
                  <GhostButton href={BOOK_CALL_URL} external className="w-full">
                    Book a Call
                  </GhostButton>
                )}
                <StartLink className="w-full" />
              </div>
            </article>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <article className="mt-8 border border-line bg-ink2 p-6 md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-xl">
              <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                Hosting only
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                Managed Hosting + Migration
              </h3>
              <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone">
                {formatUsd(PRICES.hosting.managed)}
                <span className="ml-1 text-base font-normal text-mute">/mo</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-mute">
                Leaving Squarespace, Wix, or WordPress? We migrate your site,
                then run it — not just a server bill. One team owns the move and
                the stack after launch.
              </p>
            </div>

            <ul className="grid flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2 lg:max-w-md">
              {hostingIncludes.map((item) => (
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
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <GhostButton href={BOOK_CALL_URL} external className="sm:min-w-[200px]">
              Book a Call
            </GhostButton>
            <StartLink />
          </div>
        </article>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="mt-16 border-t border-line pt-12">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
            3D Configurators & Interactive Product Experiences
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
            Browser-native 3D for products that need to be seen, configured, or
            explored — scoped on a call, priced to the build.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {THREE_D_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="flex h-full flex-col bg-ink2 p-6 md:p-7"
              >
                <h4 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {offer.name}
                </h4>
                <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone">
                  {offer.price}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
                  {offer.description}
                </p>
                <div className="mt-8">
                  <GhostButton href={BOOK_CALL_URL} external className="w-full">
                    Book a Call
                  </GhostButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <div className="mt-16 border-t border-line pt-12">
          <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
            Custom AI Tools & Automations
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-mute">
            Purpose-built copilots and assistants for your team or your
            customers - scoped on a call, priced to the workflow.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
            {AI_OFFERS.map((offer) => (
              <article
                key={offer.id}
                className="flex h-full flex-col bg-ink2 p-6 md:p-7"
              >
                <h4 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {offer.name}
                </h4>
                <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-bone">
                  {offer.price}
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-mute">
                  {offer.description}
                </p>
                <div className="mt-8">
                  <GhostButton href={BOOK_CALL_URL} external className="w-full">
                    Book a Call
                  </GhostButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="mt-10 font-body text-xs leading-normal text-faint">
        Managed hosting ({formatUsd(PRICES.hosting.managed)}/mo value) included
        with every retainer {"\u00b7"} 6-month initial term, then month-to-month{" "}
        {"\u00b7"} 30 days notice to cancel {"\u00b7"} All prices in USD {"\u00b7"}{" "}
        <a
          href="/legal/sla"
          className="text-soft underline decoration-line underline-offset-2 hover:text-bone"
        >
          SLA summary
        </a>
      </p>
    </SectionShell>
  );
}
