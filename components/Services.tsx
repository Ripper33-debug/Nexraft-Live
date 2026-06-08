"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const services = [
  {
    index: "01",
    name: "Web",
    summary:
      "Applications, sites, and APIs — each ships with a custom-built CMS.",
    detail:
      "Next.js, TypeScript, and a CMS tailored to your content workflow — not WordPress, not a generic dashboard. E-commerce, internal tools, performance budgets enforced from day one.",
    stack: "Next.js · Custom CMS · TypeScript",
  },
  {
    index: "02",
    name: "Hosting",
    summary: "Managed infrastructure with uptime you can measure.",
    detail:
      "Vercel, edge config, CDN tuning, monitoring, SSL, backups. We run what we build.",
    stack: "Vercel · Edge · Observability",
  },
  {
    index: "03",
    name: "3D",
    summary: "Models, renders, and real-time assets for web and print.",
    detail:
      "Product visualization, architectural walkthroughs, WebGL scenes, GLTF pipelines — from mesh to browser.",
    stack: "Blender · GLTF · Three.js · WebGL",
    highlight: true,
  },
] as const;

function ServiceChevron({ open }: { open: boolean }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`shrink-0 text-muted transition-transform duration-300 ${
        open ? "rotate-180 text-accent" : ""
      }`}
    >
      <path
        d="M2 4.5 6 8.5 10 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function Services() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const baseId = useId();

  return (
    <section
      id="services"
      className="section-pad scroll-mt-20 border-b border-border"
      aria-labelledby="services-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            03 / Services
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="services-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            What we build and&nbsp;run.
          </ScrollReveal>

          <p className="mt-6 max-w-lg font-mono text-xs text-muted">
            Three disciplines. One delivery standard. All available on monthly
            retainers.
          </p>
        </div>

        <div className="col-span-12 mt-10 md:col-start-1">
          <div role="list" className="border-t border-border">
            {services.map((service) => {
              const isOpen = expanded === service.index;
              const panelId = `${baseId}-panel-${service.index}`;

              return (
                <article
                  key={service.index}
                  role="listitem"
                  className={`service-row group grid grid-cols-12 items-start gap-4 border-b border-border px-0 py-8 md:gap-6 md:py-10 ${
                    "highlight" in service && service.highlight
                      ? "border-l border-l-accent/30 pl-4 md:pl-6"
                      : ""
                  } ${isOpen ? "bg-accent/[0.03]" : ""}`}
                >
                  <button
                    type="button"
                    className="col-span-12 grid grid-cols-12 items-start gap-4 text-left md:col-span-12 md:gap-6"
                    onClick={() =>
                      setExpanded(isOpen ? null : service.index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor-hover
                  >
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={`font-display text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-tighter transition-colors ${
                          isOpen
                            ? "text-accent/60"
                            : "text-foreground/20 group-hover:text-accent/40"
                        }`}
                        aria-hidden="true"
                      >
                        {service.index}
                      </span>
                    </div>

                    <div className="col-span-10 md:col-span-11 md:grid md:grid-cols-11 md:items-start md:gap-6">
                      <div className="flex items-start justify-between gap-3 md:col-span-2 md:block">
                        <div>
                          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                            {service.name}
                          </h3>
                          {"highlight" in service && service.highlight && (
                            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                              Real-time · Print-ready
                            </p>
                          )}
                        </div>
                        <ServiceChevron open={isOpen} />
                      </div>

                      <div className="mt-2 md:col-span-5 md:mt-0">
                        <p className="text-sm leading-relaxed text-muted md:text-base">
                          {service.summary}
                        </p>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted/80 md:hidden">
                          {isOpen ? "Hide details" : "Show details"}
                        </p>
                      </div>

                      <div className="mt-3 md:col-span-4 md:mt-0 md:text-right">
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted md:text-xs">
                          {service.stack}
                        </p>
                      </div>
                    </div>
                  </button>

                  <div
                    id={panelId}
                    className={`service-detail-wrap col-span-12 md:col-span-11 md:col-start-2 ${
                      isOpen ? "is-open" : ""
                    }`}
                  >
                    <p className="service-detail mt-0 font-mono text-xs leading-relaxed text-muted md:mt-2">
                      {service.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
