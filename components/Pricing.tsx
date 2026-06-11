"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";
import { BookCallButton } from "@/components/BookCallButton";
import { PricingCompare } from "@/components/PricingCompare";
import { sectionLabel } from "@/lib/sections";
import {
  BUNDLE_GROWTH_MANAGED,
  FOUNDING_RATE_LINE,
  PRICES,
  formatUsd,
} from "@/lib/pricing";

type Category = "web" | "hosting" | "threeD";

type Plan = {
  index: string;
  name: string;
  price: number;
  cadence: string;
  summary: string;
  deliverables: readonly string[];
  popular?: boolean;
  foundingEligible?: boolean;
};

const categories: { id: Category; label: string }[] = [
  { id: "web", label: "Web" },
  { id: "hosting", label: "Hosting" },
  { id: "threeD", label: "3D" },
];

const plans: Record<Category, Plan[]> = {
  web: [
    {
      index: "01",
      name: "Starter",
      price: PRICES.web.starter,
      cadence: "monthly retainer",
      foundingEligible: true,
      summary: "Ongoing site care, content updates, and performance monitoring.",
      deliverables: [
        "Custom-built CMS included",
        "Up to 8 pages maintained",
        "Content updates and publishing",
        "Monthly performance report",
        "Bug fixes within 48h SLA",
      ],
    },
    {
      index: "02",
      name: "Growth",
      price: PRICES.web.growth,
      cadence: "monthly retainer",
      popular: true,
      foundingEligible: true,
      summary: "Active development hours for features, integrations, and optimization.",
      deliverables: [
        "Custom-built CMS included",
        "20 dev hours per month",
        "CMS fields, workflows, and roles",
        "A/B tests and conversion work",
        "API and third-party integrations",
        "Bi-weekly sync and roadmap",
      ],
    },
    {
      index: "03",
      name: "Build",
      price: PRICES.web.build,
      cadence: "monthly retainer",
      foundingEligible: true,
      summary: "Dedicated build capacity for apps, platforms, and complex systems.",
      deliverables: [
        "Custom-built CMS included",
        "40 dev hours per month",
        "Full-stack feature delivery",
        "Multi-editor CMS and permissions",
        "Architecture and code review",
        "Priority queue and same-day triage",
      ],
    },
  ],
  hosting: [
    {
      index: "01",
      name: "Managed",
      price: PRICES.hosting.managed,
      cadence: "monthly subscription",
      summary: "Production hosting with SSL, backups, and uptime monitoring.",
      deliverables: [
        "Vercel or equivalent deploy",
        "SSL and DNS management",
        "Daily automated backups",
        "99.9% uptime SLA",
      ],
    },
    {
      index: "02",
      name: "Performance",
      price: PRICES.hosting.performance,
      cadence: "monthly subscription",
      popular: true,
      summary: "Edge tuning, CDN config, and proactive performance optimization.",
      deliverables: [
        "Everything in Managed",
        "CDN and edge configuration",
        "Core Web Vitals monitoring",
        "Monthly optimization pass",
      ],
    },
    {
      index: "03",
      name: "Enterprise",
      price: PRICES.hosting.enterprise,
      cadence: "monthly subscription",
      summary: "Multi-environment ops with observability and incident response.",
      deliverables: [
        "Staging and production environments",
        "Log aggregation and alerting",
        "Incident response within 2h",
        "Quarterly infrastructure review",
      ],
    },
  ],
  threeD: [
    {
      index: "01",
      name: "Asset",
      price: PRICES.threeD.asset,
      cadence: "monthly retainer",
      summary: "Steady output of models and renders for catalog and marketing.",
      deliverables: [
        "Up to 4 models or renders per month",
        "GLTF export and optimization",
        "Revision rounds included",
        "Print and web-ready formats",
      ],
    },
    {
      index: "02",
      name: "Scene",
      price: PRICES.threeD.scene,
      cadence: "monthly retainer",
      popular: true,
      summary: "Interactive scenes and walkthroughs delivered on a rolling basis.",
      deliverables: [
        "1 interactive scene per month",
        "WebGL or Three.js integration",
        "Lighting and material passes",
        "Browser performance testing",
      ],
    },
    {
      index: "03",
      name: "Studio",
      price: PRICES.threeD.studio,
      cadence: "monthly retainer",
      summary: "Full 3D pipeline capacity for product lines and real-time assets.",
      deliverables: [
        "Dedicated 3D production hours",
        "Blender to browser pipeline",
        "Real-time and static deliverables",
        "Asset library management",
      ],
    },
  ],
};

export function Pricing() {
  const [category, setCategory] = useState<Category>("web");
  const [activePlan, setActivePlan] = useState<string>("02");
  const [slideDir, setSlideDir] = useState<1 | -1>(1);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const current = plans[category];
  const selected =
    current.find((p) => p.index === activePlan) ?? current[0];

  const onCategoryChange = (id: Category) => {
    const newIdx = categories.findIndex((c) => c.id === id);
    const oldIdx = categories.findIndex((c) => c.id === category);
    setSlideDir(newIdx > oldIdx ? 1 : -1);
    setCategory(id);
    const popular = plans[id].find((p) => p.popular);
    setActivePlan(popular?.index ?? "01");
  };

  useEffect(() => {
    const update = () => {
      const el = document.getElementById(`tab-${category}`);
      const list = tabListRef.current;
      if (!el || !list) return;
      const listRect = list.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - listRect.left,
        width: tabRect.width,
      });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [category]);

  return (
    <section
      id="pricing"
      className="section-pad-tight scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="pricing-heading"
    >
      <div className="grid-editorial min-w-0">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {sectionLabel("pricing")}
          </p>
        </div>

        <div className="col-span-12 min-w-0 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="pricing-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            Monthly rates. No&nbsp;surprises.
          </ScrollReveal>

          <p className="mt-6 max-w-xl font-mono text-xs leading-relaxed text-muted">
            All plans billed monthly. Pause or cancel anytime with 30 days
            notice. Custom scope quoted on request.
          </p>
          <p className="mt-4 inline-block border border-accent/35 bg-accent/[0.07] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
            {FOUNDING_RATE_LINE}
          </p>

          <PricingCompare />

          <div className="pricing-anchor mt-6 border border-border bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Where most teams start
            </p>
            <p className="mt-3 font-display text-lg font-semibold text-foreground md:text-xl">
              Growth + Managed hosting
            </p>
            <p className="mt-2 font-mono text-xs text-muted">
              Active dev hours with production care on the stack underneath.
              The combination we recommend after a discovery call.
            </p>
            <p className="mt-4 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              <CountUp value={BUNDLE_GROWTH_MANAGED} prefix="$" suffix="/mo" />
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
              {formatUsd(PRICES.web.growth)} Growth + {formatUsd(PRICES.hosting.managed)} Managed
            </p>
            <div className="mt-5">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </div>

          <div
            ref={tabListRef}
            className="pricing-tabs relative mt-8 flex max-w-full gap-0 overflow-x-auto border-b border-border"
            role="tablist"
            aria-label="Pricing categories"
          >
            <span
              className="pricing-tab-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: indicator.width,
              }}
              aria-hidden="true"
            />
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`pricing-tab relative z-10 shrink-0 px-5 py-4 font-mono text-xs uppercase tracking-widest transition-colors duration-300 ${
                  category === cat.id
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
                data-cursor-hover
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div
            key={category}
            id={`panel-${category}`}
            role="tabpanel"
            aria-labelledby={`tab-${category}`}
            data-dir={slideDir}
            className="pricing-panel-swap mt-0"
          >
            <div
              className={`pricing-selected border-b border-border py-6 transition-colors duration-300 md:py-7 ${
                selected.popular
                  ? "pricing-selected-popular pl-4 md:pl-6"
                  : ""
              }`}
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Selected plan
                </p>
                {selected.popular && (
                  <span className="pricing-popular-badge">Most popular</span>
                )}
                {selected.foundingEligible && (
                  <span className="pricing-founding-badge">
                    Founding rate eligible
                  </span>
                )}
              </div>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {selected.name}
                </span>
                <span className="font-display text-[clamp(1.75rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-foreground">
                  <CountUp
                    key={`${category}-${selected.index}-${selected.price}`}
                    value={selected.price}
                    prefix="$"
                    suffix="/mo"
                  />
                </span>
              </div>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-accent">
                {selected.cadence}
              </p>
              <p className="mt-4 max-w-lg text-sm text-muted md:text-base">
                {selected.summary}
              </p>
            </div>

            <div role="list" className="border-b border-border">
              {current.map((plan) => {
                const isActive = activePlan === plan.index;
                return (
                  <article
                    key={plan.index}
                    role="listitem"
                    className={`pricing-row group grid grid-cols-12 items-start gap-4 border-b border-border py-5 transition-all duration-300 md:gap-6 md:py-6 ${
                      plan.popular ? "pricing-row-popular" : ""
                    } ${
                      isActive
                        ? "is-active bg-accent/[0.06] ring-1 ring-inset ring-accent/20"
                        : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePlan(plan.index)}
                      className="col-span-12 min-w-0 text-left"
                      aria-pressed={isActive}
                      data-cursor-hover
                    >
                      <div className="flex items-start gap-3 md:grid md:grid-cols-12 md:gap-6">
                        <div className="shrink-0 md:col-span-1">
                          <span
                            className={`font-display text-2xl font-bold tabular-nums transition-colors md:text-3xl ${
                              isActive
                                ? "text-accent"
                                : "text-foreground/20 group-hover:text-accent/40"
                            }`}
                          >
                            {plan.index}
                          </span>
                        </div>

                        <div className="min-w-0 flex-1 md:col-span-11 md:grid md:grid-cols-11 md:items-start md:gap-6">
                          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 md:col-span-3 md:block">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-display text-lg font-semibold text-foreground md:text-2xl">
                                {plan.name}
                              </h3>
                              {plan.popular && (
                                <span className="pricing-popular-badge">
                                  Popular
                                </span>
                              )}
                              {plan.foundingEligible && (
                                <span className="pricing-founding-badge">
                                  Founding rate eligible
                                </span>
                              )}
                            </div>
                            <p className="shrink-0 font-display text-base font-medium text-foreground md:hidden">
                              <CountUp
                                key={`${category}-${plan.index}-${plan.price}-m`}
                                value={plan.price}
                                prefix="$"
                                suffix="/mo"
                              />
                            </p>
                          </div>

                          <p className="mt-2 text-sm text-muted md:col-span-5 md:mt-0">
                            {plan.summary}
                          </p>

                          <p className="mt-2 hidden font-display text-lg font-medium text-foreground md:col-span-3 md:mt-0 md:block md:text-right md:text-xl">
                            <CountUp
                              key={`${category}-${plan.index}-${plan.price}`}
                              value={plan.price}
                              prefix="$"
                              suffix="/mo"
                            />
                          </p>
                        </div>
                      </div>
                    </button>

                    <div
                      className={`pricing-deliverables col-span-12 md:col-span-11 md:col-start-2 ${
                        isActive ? "is-open" : ""
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="mt-2 space-y-2 border-t border-border pt-4 md:mt-0 md:pt-4">
                          {plan.deliverables.map((item) => (
                            <li
                              key={item}
                              className="font-mono text-xs text-muted"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-8 border border-border p-4 md:flex md:items-center md:justify-between md:gap-6 md:p-5">
            <div className="min-w-0">
              <p className="font-display text-lg font-semibold text-foreground">
                Hosting rescue {"\u00b7"} {formatUsd(PRICES.hosting.managed)}/mo
              </p>
              <p className="mt-2 max-w-2xl font-mono text-xs leading-relaxed text-muted">
                On Squarespace, Wix, or WordPress? We migrate your site to our
                managed Vercel stack and run it. Migration included. 99.9%
                uptime on stacks we operate.
              </p>
            </div>
            <div className="mt-4 shrink-0 md:mt-0">
              <BookCallButton label="Book a call" />
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-muted">
              Need a custom monthly arrangement? We scope to your runway.
            </p>
            <Link
              href="#contact"
              className="link-underline shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
              data-cursor-hover
            >
              Request a quote →
            </Link>
          </div>

          <div
            className="mt-8 border border-border"
            aria-label="Guarantees"
          >
            <div className="bg-surface-deep px-4 py-3 md:px-5">
              <p className="font-mono text-xs text-muted">
                First month money-back on any retainer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
