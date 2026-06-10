"use client";

import { useId, useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { ServiceGlyph } from "@/components/ServiceGlyph";
import { sectionLabel } from "@/lib/sections";

const services = [
  {
    index: "01",
    name: "Web",
    glyph: "web" as const,
    summary:
      "Applications, sites, and APIs. Each ships with a custom-built CMS.",
    detail:
      "Next.js, TypeScript, and a CMS tailored to your content workflow. Not WordPress, not a generic dashboard. E-commerce, internal tools, performance budgets enforced from day one.",
    stack: "Next.js · Custom CMS · TypeScript",
  },
  {
    index: "02",
    name: "Hosting",
    glyph: "hosting" as const,
    summary: "Managed infrastructure with uptime you can measure.",
    detail:
      "Vercel, edge config, CDN tuning, monitoring, SSL, backups. We run what we build.",
    stack: "Vercel · Edge · Observability",
  },
  {
    index: "03",
    name: "3D",
    glyph: "threeD" as const,
    summary: "Models, renders, and real-time assets for web and print.",
    detail:
      "Product visualization, architectural walkthroughs, WebGL scenes, GLTF pipelines, from mesh to browser.",
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
      className="section-pad-tight scroll-mt-20 border-b border-border"
      aria-labelledby="services-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {sectionLabel("services")}
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

          <p className="mt-5 max-w-lg font-mono text-xs text-muted">
            Three disciplines. One delivery standard. All available on monthly
            retainers.
          </p>
        </div>

        <div className="col-span-12 mt-6 md:col-start-1">
          <div role="list" className="border-t border-border">
            {services.map((service) => {
              const isOpen = expanded === service.index;
              const panelId = `${baseId}-panel-${service.index}`;

              return (
                <article
                  key={service.index}
                  role="listitem"
                  className={`service-row group relative grid grid-cols-12 items-start gap-4 border-b border-border py-5 md:gap-5 md:py-6 ${
                    "highlight" in service && service.highlight
                      ? "border-l-2 border-l-accent/40 pl-4 md:pl-5"
                      : ""
                  } ${isOpen ? "is-open bg-accent/[0.04]" : ""}`}
                >
                  <span className="service-row-accent" aria-hidden="true" />

                  <button
                    type="button"
                    className="col-span-12 grid grid-cols-12 items-start gap-4 text-left md:col-span-12 md:gap-5"
                    onClick={() =>
                      setExpanded(isOpen ? null : service.index)
                    }
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    data-cursor-hover
                  >
                    <div className="col-span-2 md:col-span-1">
                      <span
                        className={`font-display text-[clamp(2rem,5vw,3.25rem)] font-bold leading-none tracking-tighter transition-colors ${
                          isOpen
                            ? "text-accent/60"
                            : "text-foreground/20 group-hover:text-accent/40"
                        }`}
                        aria-hidden="true"
                      >
                        {service.index}
                      </span>
                    </div>

                    <div className="col-span-10 md:col-span-10 md:grid md:grid-cols-10 md:items-start md:gap-5">
                      <div className="flex items-start justify-between gap-3 md:col-span-2 md:block">
                        <div>
                          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                            {service.name}
                          </h3>
                          {"highlight" in service && service.highlight && (
                            <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                              Real-time / Print-ready
                            </p>
                          )}
                        </div>
                        <ServiceChevron open={isOpen} />
                      </div>

                      <div className="mt-2 md:col-span-4 md:mt-0">
                        <p className="text-sm leading-relaxed text-muted">
                          {service.summary}
                        </p>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted/80 md:hidden">
                          {isOpen ? "Hide details" : "Show details"}
                        </p>
                      </div>

                      <div className="mt-3 md:col-span-2 md:mt-0">
                        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                          {service.stack}
                        </p>
                      </div>

                      <div className="hidden md:col-span-2 md:flex md:justify-end md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                        <ServiceGlyph variant={service.glyph} />
                      </div>
                    </div>
                  </button>

                  <div
                    id={panelId}
                    className={`service-detail-wrap col-span-12 md:col-span-10 md:col-start-2 ${
                      isOpen ? "is-open" : ""
                    }`}
                  >
                    <p className="service-detail mt-0 font-mono text-xs leading-relaxed text-muted md:mt-1">
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
