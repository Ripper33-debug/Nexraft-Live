"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECT, WORK_GRID } from "@/lib/work";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function ProjectVisual({
  name,
  image,
  demo,
}: {
  name: string;
  image?: string;
  demo?: boolean;
}) {
  if (demo) {
    return (
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center border border-line bg-gradient-to-br from-panel via-ink2 to-ink md:aspect-auto md:h-full md:min-h-[140px]">
        <span className="font-display text-sm font-semibold text-bone">3D</span>
        <span className="mt-1 text-xs text-faint">Live demo</span>
      </div>
    );
  }
  if (image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-ink md:aspect-auto md:h-full md:min-h-[140px]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center border border-line bg-gradient-to-br from-panel to-ink md:aspect-auto md:h-full md:min-h-[140px]">
      <span className="font-display text-4xl font-semibold text-line">
        {name.charAt(0)}
      </span>
    </div>
  );
}

export function Work() {
  return (
    <SectionShell id="work" ariaLabelledBy="work-heading" wide>
      <div className="px-7">
        <Reveal>
          <SectionHeader
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
                alt=""
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
                <p className="text-sm text-mute">Case study</p>
                <p className="mt-2 font-display text-2xl font-semibold text-bone md:text-4xl">
                  {FEATURED_PROJECT.name}
                </p>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-bone/90 md:text-base">
                  {FEATURED_PROJECT.outcome}
                </p>
                <span className="mt-5 text-sm text-mute transition-colors group-hover:text-bone">
                  Read the case study {"\u2192"}
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <div className="mx-auto mt-12 max-w-[1180px] px-7">
        <div className="grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {WORK_GRID.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className={`group grid grid-cols-1 bg-ink2 transition-colors hover:bg-panel sm:grid-cols-[minmax(0,42%)_1fr] ${focusRing}`}
            >
              <ProjectVisual
                name={project.name}
                image={project.image}
                demo={project.demo}
              />
              <div className="flex flex-col justify-center p-6 md:p-8">
                <p className="font-display text-xl font-semibold text-bone">
                  {project.name}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  {project.outcome}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-sm text-faint transition-colors group-hover:text-mute"
                >
                  {project.external ? "Visit site" : "View project"} {"\u2197"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
