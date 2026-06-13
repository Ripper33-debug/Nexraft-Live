"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const services = [
  {
    index: "01",
    label: "WEB",
    title: "Web",
    summary:
      "Fast, custom sites and apps built to convert, not just look good. Every one ships with its own CMS.",
    stack: `Next.js ${dot} Custom CMS ${dot} TypeScript`,
  },
  {
    index: "02",
    label: "HOSTING",
    title: "Hosting",
    summary:
      "We run what we build. Uptime, CDN, SSL, backups and monitoring, handled, and included with every retainer.",
    stack: `Edge network ${dot} CDN ${dot} Observability`,
  },
  {
    index: "03",
    label: "3D",
    title: "3D",
    summary:
      "Product spins, walkthroughs and web-ready 3D that make you look like nobody else in your market.",
    stack: `Blender ${dot} GLTF ${dot} Three.js ${dot} WebGL`,
  },
] as const;

export function Services() {
  return (
    <SectionShell id="do" ariaLabelledBy="services-heading">
      <Reveal>
        <SectionHeader
          titleId="services-heading"
          title="Three disciplines. One delivery standard."
          tag="03 / SERVICES"
        />
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-px border border-line bg-line md:mt-14 md:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.index} delay={i * 0.08} className="group relative bg-ink2">
            <article className="relative flex h-full flex-col p-6 transition-colors duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:bg-panel md:p-7">
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                {service.index} - {service.label}
              </p>
              <h3 className="mt-4 font-grotesk text-xl font-semibold text-bone">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-mute">
                {service.summary}
              </p>
              <p className="mt-6 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-faint">
                {service.stack}
              </p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[2px] w-0 bg-signal transition-[width] duration-[600ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:w-full"
              />
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
