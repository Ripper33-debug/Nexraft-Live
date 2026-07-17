"use client";

import Image from "next/image";
import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { FEATURED_PROJECT, WORK_GRID } from "@/lib/work";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]";

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
      <div className="flex aspect-[16/10] w-full flex-col items-center justify-center border border-border bg-gradient-to-br from-bg-secondary via-bg-primary to-bg-primary md:aspect-auto md:h-full md:min-h-[140px]">
        <span className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-text-primary">3D</span>
        <span className="mt-1 text-xs text-text-muted">Live demo</span>
      </div>
    );
  }
  if (image) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden border border-border bg-bg-primary md:aspect-auto md:h-full md:min-h-[140px]">
        <Image
          src={image}
          alt={`${name} project preview`}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>
    );
  }

  return (
    <div className="flex aspect-[16/10] w-full items-center justify-center border border-border bg-gradient-to-br from-bg-secondary to-bg-primary md:aspect-auto md:h-full md:min-h-[140px]">
      <span className="font-display text-4xl font-semibold text-border">
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
            specLabel="04 / DELIVERY"
            titleId="work-heading"
            title="Selected delivery."
            subtitle="3D product tools, quote flows, and custom add-ons for teams with complex products."
          />
        </Reveal>
      </div>

      {FEATURED_PROJECT.image ? (
        <Reveal delay={0.06} className="mt-12">
          <Link
            href={FEATURED_PROJECT.href}
            className={`group relative mx-auto block max-w-[1400px] overflow-hidden border-y border-border ${focusRing}`}
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
                className="absolute inset-0 bg-gradient-to-r from-bg-primary/90 via-bg-primary/50 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-7 md:p-12">
                <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-text-secondary">
                  Case study
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                  {FEATURED_PROJECT.name}
                </h3>
                <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-primary/90 md:text-base">
                  {FEATURED_PROJECT.outcome}
                </p>
                <span className="mt-5 text-sm text-text-tertiary transition-colors group-hover:text-text-primary">
                  Read the case study →
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      ) : null}

      <div className="mx-auto mt-12 max-w-[1180px] px-7">
        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {WORK_GRID.map((project) => (
            <Link
              key={project.id}
              href={project.href}
              target={project.external ? "_blank" : undefined}
              rel={project.external ? "noopener noreferrer" : undefined}
              className={`group grid grid-cols-1 bg-bg-primary transition-colors hover:bg-bg-secondary sm:grid-cols-[minmax(0,42%)_1fr] ${focusRing}`}
            >
              <ProjectVisual
                name={project.name}
                image={project.image}
                demo={project.demo}
              />
              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.outcome}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 text-sm text-text-muted transition-colors group-hover:text-text-tertiary"
                >
                  {project.external ? "Visit site" : "View project"} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
