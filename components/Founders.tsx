"use client";

import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { TEAM } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function TeamAvatar({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden="true"
      className="flex h-16 w-16 shrink-0 items-center justify-center border border-line bg-ink2 font-display text-lg font-semibold tracking-[-0.02em] text-bone"
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
          className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
        >
          You work with us directly.
        </h2>
        <p className="mt-4 max-w-xl font-body text-lg leading-relaxed text-mute">
          Founder-led, with a dedicated account manager who actually answers.
          No handoffs to junior devs.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 md:gap-x-12 md:gap-y-10">
        {TEAM.map((member) => (
          <Reveal key={member.email} delay={0.06}>
            <div className="flex gap-5">
              <TeamAvatar initials={member.initials} />
              <div className="min-w-0">
                <h3 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
                  {member.name}
                </h3>
                <p className="mt-1 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
                  {member.role}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className={`mt-3 inline-block break-all text-sm text-faint transition-colors hover:text-bone ${focusRing}`}
                >
                  {member.email}
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
