"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const web = {
  title: "Web",
  summary:
    "Fast, custom sites and apps built to convert, not just look good. Every one ships with its own CMS.",
  stack: `Next.js ${dot} Custom CMS ${dot} TypeScript`,
};

const hosting = {
  title: "Hosting",
  summary:
    "We run what we build. Uptime, CDN, SSL, backups and monitoring, handled, and included with every retainer.",
  stack: `Edge network ${dot} CDN ${dot} Observability`,
};

const threeD = {
  title: "3D",
  summary:
    "Product spins, walkthroughs and web-ready 3D that make you look like nobody else in your market.",
  stack: `Blender ${dot} GLTF ${dot} Three.js ${dot} WebGL`,
  href: "/3d-product-viewer",
};

export function Services() {
  return (
    <SectionShell id="do" ariaLabelledBy="services-heading">
      <Reveal>
        <SectionHeader
          specLabel="01 / SERVICES"
          titleId="services-heading"
          title="Web, hosting, and 3D."
          subtitle="Three disciplines. One delivery standard."
        />
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-6">
        <article className="border-t border-line pt-6 md:col-span-12 md:border md:border-line md:bg-ink2 md:p-8 md:pt-8">
          <h3 className="font-display text-2xl font-semibold text-bone md:text-3xl">
            {web.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mute md:text-base">
            {web.summary}
          </p>
          <p className="mt-6 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">{web.stack}</p>
        </article>

        <article className="border-t border-line pt-6 md:col-span-5 md:border md:border-line md:bg-ink2 md:p-7 md:pt-7">
          <h3 className="font-display text-xl font-semibold text-bone">
            {hosting.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            {hosting.summary}
          </p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">{hosting.stack}</p>
        </article>

        <article className="border-t border-line pt-6 md:col-span-7 md:border md:border-line md:bg-panel md:p-7 md:pt-7">
          <h3 className="font-display text-xl font-semibold text-bone">
            {threeD.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            {threeD.summary}
          </p>
          <p className="mt-5 font-jetbrains text-[11px] uppercase tracking-[0.16em] text-faint">{threeD.stack}</p>
          <Link
            href={threeD.href}
            className="mt-6 inline-block text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal"
          >
            See the live demo
          </Link>
        </article>
      </div>
    </SectionShell>
  );
}
