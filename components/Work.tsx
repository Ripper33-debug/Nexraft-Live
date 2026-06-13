"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const dot = "\u00b7";

const rows = [
  {
    name: "Weatherhaven",
    description: "Global deploy-map catalog for 95-country operations",
    meta: `Next.js ${dot} CMS ${dot} catalog`,
    href: "/work/weatherhaven",
    external: false,
    image: "/case-studies/weatherhaven.png",
    featured: true,
  },
  {
    name: "Outfyre",
    description: "AI growth-studio site with a 3-tier retainer funnel",
    meta: `Next.js ${dot} TypeScript ${dot} Tailwind`,
    href: "https://outfyre.com",
    external: true,
    featured: false,
  },
  {
    name: "Nexraft WebGL",
    description: "Live browser-native product visualization pipeline",
    meta: `Three.js ${dot} R3F ${dot} GLTF`,
    href: "#do",
    external: false,
    featured: false,
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
        />
      </Reveal>

      <div className="mt-12 space-y-0 border-y border-line">
        {rows.map((row) => (
          <Link
            key={row.name}
            href={row.href}
            target={row.external ? "_blank" : undefined}
            rel={row.external ? "noopener noreferrer" : undefined}
            className={`group flex flex-col gap-4 border-t border-line py-6 transition-colors first:border-t-0 hover:bg-ink2/80 md:flex-row md:items-center md:gap-8 md:py-8 ${focusRing}`}
          >
            {row.featured ? (
              <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden border border-line md:w-56 lg:w-64">
                <Image
                  src={row.image!}
                  alt=""
                  fill
                  className="object-cover object-top transition-opacity duration-300 group-hover:opacity-90"
                  sizes="(max-width: 768px) 100vw, 256px"
                />
              </div>
            ) : null}

            <div className="min-w-0 flex-1">
              <p className="font-display text-xl font-semibold text-bone md:text-2xl">
                {row.name}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-mute">
                {row.description}
              </p>
              <p className="mt-3 text-xs text-faint">{row.meta}</p>
            </div>

            <span
              aria-hidden="true"
              className="hidden shrink-0 text-mute transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 md:block"
            >
              {"\u2197"}
            </span>
          </Link>
        ))}
      </div>
    </SectionShell>
  );
}
