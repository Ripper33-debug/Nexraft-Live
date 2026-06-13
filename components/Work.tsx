"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const rows = [
  {
    index: "01",
    name: "Weatherhaven",
    description: "Global deploy-map catalog for 95-country operations",
    meta: `NEXT.JS ${dot} CMS ${dot} CATALOG`,
    href: "/work/weatherhaven",
    external: false,
  },
  {
    index: "02",
    name: "Outfyre",
    description: "AI growth-studio site with a 3-tier retainer funnel",
    meta: `NEXT.JS ${dot} TS ${dot} TAILWIND`,
    href: "https://outfyre.com",
    external: true,
  },
  {
    index: "03",
    name: "Nexraft WebGL",
    description: "Live browser-native product-visualization pipeline",
    meta: `THREE.JS ${dot} R3F ${dot} GLTF`,
    href: "#do",
    external: false,
  },
] as const;

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Work() {
  return (
    <SectionShell id="work" ariaLabelledBy="work-heading">
      <Reveal>
        <SectionHeader
          titleId="work-heading"
          title="Selected delivery."
          tag="RECORD"
        />
      </Reveal>

      <div className="mt-10 border border-line md:mt-14">
        {rows.map((row, i) => (
          <Reveal key={row.index} delay={i * 0.08}>
            <Link
              href={row.href}
              target={row.external ? "_blank" : undefined}
              rel={row.external ? "noopener noreferrer" : undefined}
              className={`group grid grid-cols-12 items-center gap-3 border-t border-line bg-ink2 px-4 py-5 transition-colors duration-300 ease-[cubic-bezier(.16,1,.3,1)] first:border-t-0 hover:bg-panel md:gap-6 md:px-6 md:py-6 ${focusRing}`}
            >
              <span className="col-span-2 font-jetbrains text-xs tabular-nums text-faint md:col-span-1">
                {row.index}
              </span>
              <span className="col-span-10 font-grotesk text-lg font-semibold text-bone transition-colors duration-300 group-hover:text-signal md:col-span-3 md:text-xl">
                {row.name}
              </span>
              <span className="col-span-10 col-start-3 hidden text-sm text-mute md:col-span-5 md:block">
                {row.description}
              </span>
              <span className="col-span-8 col-start-3 hidden font-jetbrains text-[10px] uppercase tracking-[0.15em] text-faint md:col-span-2 md:col-start-auto md:block md:text-right">
                {row.meta}
              </span>
              <span
                aria-hidden="true"
                className="col-span-2 text-right font-jetbrains text-sm text-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-signal md:col-span-1"
              >
                {"\u2197"}
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
