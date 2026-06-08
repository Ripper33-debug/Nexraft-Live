"use client";

import { useState } from "react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CountUp } from "@/components/CountUp";

type Category = "web" | "hosting" | "threeD";

type Plan = {
  index: string;
  name: string;
  price: number;
  cadence: string;
  summary: string;
  deliverables: readonly string[];
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
      price: 1200,
      cadence: "monthly retainer",
      summary: "Ongoing site care, content updates, and performance monitoring.",
      deliverables: [
        "Up to 8 pages maintained",
        "CMS updates and publishing",
        "Monthly performance report",
        "Bug fixes within 48h SLA",
      ],
    },
    {
      index: "02",
      name: "Growth",
      price: 2800,
      cadence: "monthly retainer",
      summary: "Active development hours for features, integrations, and optimization.",
      deliverables: [
        "20 dev hours per month",
        "A/B tests and conversion work",
        "API and third-party integrations",
        "Bi-weekly sync and roadmap",
      ],
    },
    {
      index: "03",
      name: "Build",
      price: 4500,
      cadence: "monthly retainer",
      summary: "Dedicated build capacity for apps, platforms, and complex systems.",
      deliverables: [
        "40 dev hours per month",
        "Full-stack feature delivery",
        "Architecture and code review",
        "Priority queue and same-day triage",
      ],
    },
  ],
  hosting: [
    {
      index: "01",
      name: "Managed",
      price: 350,
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
      price: 650,
      cadence: "monthly subscription",
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
      price: 1200,
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
      price: 800,
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
      price: 1800,
      cadence: "monthly retainer",
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
      price: 3500,
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
  const [activePlan, setActivePlan] = useState<string>("01");
  const current = plans[category];
  const selected =
    current.find((p) => p.index === activePlan) ?? current[0];

  const onCategoryChange = (id: Category) => {
    setCategory(id);
    setActivePlan("01");
  };

  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-b border-border bg-surface-deep py-24 md:py-32"
      aria-labelledby="pricing-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 mb-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            04 / Pricing
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="pricing-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Monthly rates. No surprises.
          </ScrollReveal>

          <p className="mt-6 max-w-xl font-mono text-xs leading-relaxed text-muted">
            All plans billed monthly. Cancel with 30 days notice. Custom scope
            quoted on request.
          </p>

          <div
            className="pricing-tabs mt-12 flex gap-0 border-b border-border"
            role="tablist"
            aria-label="Pricing categories"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                aria-controls={`panel-${cat.id}`}
                id={`tab-${cat.id}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`pricing-tab shrink-0 border-b px-5 py-4 font-mono text-xs uppercase tracking-widest transition-colors ${
                  category === cat.id
                    ? "border-accent text-foreground"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
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
            className="pricing-panel mt-0"
          >
            <div className="border-b border-border py-10 md:py-12">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                Selected plan
              </p>
              <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="font-display text-3xl font-semibold text-foreground md:text-4xl">
                  {selected.name}
                </span>
                <span className="font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tight text-foreground">
                  <CountUp
                    key={`${category}-${selected.index}`}
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
                    className={`pricing-row group grid grid-cols-12 items-start gap-4 border-b border-border py-6 md:gap-6 md:py-8 ${
                      isActive ? "bg-accent/[0.04]" : ""
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActivePlan(plan.index)}
                      className="col-span-12 grid grid-cols-12 items-start gap-4 text-left md:col-span-12 md:gap-6"
                      aria-pressed={isActive}
                      data-cursor-hover
                    >
                      <div className="col-span-2 md:col-span-1">
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

                      <div className="col-span-10 md:col-span-3">
                        <h3 className="font-display text-xl font-semibold text-foreground md:text-2xl">
                          {plan.name}
                        </h3>
                      </div>

                      <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto">
                        <p className="text-sm text-muted">{plan.summary}</p>
                      </div>

                      <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto md:text-right">
                        <p className="font-display text-lg font-medium text-foreground md:text-xl">
                          <CountUp
                            value={plan.price}
                            prefix="$"
                            suffix="/mo"
                          />
                        </p>
                      </div>
                    </button>

                    <div
                      className={`pricing-deliverables col-span-12 md:col-span-11 md:col-start-2 ${
                        isActive ? "is-open" : ""
                      }`}
                    >
                      <ul className="mt-2 space-y-2 border-t border-border pt-4 md:mt-0 md:pt-4">
                        {plan.deliverables.map((item, i) => (
                          <li
                            key={item}
                            className="flex items-baseline gap-4 font-mono text-xs text-muted"
                          >
                            <span className="tabular-nums text-foreground/30">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs text-muted">
              Need a custom monthly arrangement? We scope to your runway.
            </p>
            <Link
              href="#contact"
              className="link-underline shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-foreground"
              data-cursor-hover
            >
              Request a quote ?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
