"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { WorkTrack } from "@/components/WorkTrack";
import { FEATURED_PROJECT, WORK_GRID } from "@/lib/work";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Work() {
  return (
    <SectionShell id="work" ariaLabelledBy="work-heading" wide>
      <div className="px-7">
        <Reveal>
          <SectionHeader
            specLabel="03 / DELIVERY"
            titleId="work-heading"
            title="Selected delivery."
            subtitle="Recent builds across web, hosting, and 3D."
          />
        </Reveal>
      </div>

      {FEATURED_PROJECT.image ? (
        <Reveal delay={0.06} className="mt-12">
          <Link
            href={FEATURED_PROJECT.href}
            className={`group relative mx-auto block max-w-[1400px] overflow-hidden border-y border-line ${focusRing}`}
          >
            <div className="relative aspect-[21/9] min-h-[220px] w-full md:min-h-[320px]">
              <Image
                src={FEATURED_PROJECT.image}
                alt={`${FEATURED_PROJECT.name} case study preview`}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.015]"
                sizes="100vw"
                priority={false}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12">
                <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-mute">
                  Case study
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {FEATURED_PROJECT.name}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone/90 md:text-base">
                  {FEATURED_PROJECT.outcome}
                </p>
                <span className="mt-5 text-sm text-soft transition-colors group-hover:text-bone">
                  Read the case study {"\u2192"}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <WorkTrack projects={WORK_GRID} />
    </SectionShell>
  );
}
