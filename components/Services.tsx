"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const services = [
  {
    title: "Web",
    summary:
      "Fast, custom sites and apps built to convert, not just look good. Every one ships with its own CMS.",
    stack: `Next.js ${dot} Custom CMS ${dot} TypeScript`,
  },
  {
    title: "Hosting",
    summary:
      "We run what we build. Uptime, CDN, SSL, backups and monitoring, handled, and included with every retainer.",
    stack: `Edge network ${dot} CDN ${dot} Observability`,
  },
  {
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
          title="Web, hosting, and 3D."
          subtitle="Three disciplines. One delivery standard."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {services.map((service) => (
          <article
            key={service.title}
            className="border-t border-line pt-6 transition-colors hover:border-mute/40"
          >
            <h3 className="font-display text-xl font-semibold text-bone">
              {service.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              {service.summary}
            </p>
            <p className="mt-5 text-xs text-faint">{service.stack}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}
