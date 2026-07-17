"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { FOUNDERS } from "@/lib/site";

const bios: Record<string, string> = {
  "Barry Castelli": "Full-stack builds, hosting, and client delivery.",
  "Alex Cridge": "3D production, WebGL pipelines, and visual systems.",
};

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]";

function FounderAvatar({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-16 w-16 shrink-0 items-center justify-center border border-border bg-bg-secondary font-display text-lg font-semibold tracking-tight text-text-primary"
    >
      {initials}
    </div>
  );
}

export function Founders() {
  return (
    <SectionShell id="team" ariaLabelledBy="founders-heading">
      <Reveal>
        <SpecLabel className="mb-4">02 / TEAM</SpecLabel>
        <h2
          id="founders-heading"
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-text-primary"
        >
          You work with us directly.
        </h2>
        <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-text-secondary">
          Founder-led team of 5–10. You work directly with Barry and Alex. No account managers, no handoffs.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12">
        {FOUNDERS.map((founder) => (
          <Reveal key={founder.email} delay={0.06}>
            <div className="flex gap-5">
              <FounderAvatar initials={founder.initials} />
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary">
                  {founder.name}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                  {bios[founder.name]}
                </p>
                <a
                  href={`mailto:${founder.email}`}
                  className={`mt-3 inline-block text-sm text-text-muted transition-colors hover:text-text-primary ${focusRing}`}
                >
                  {founder.email}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
