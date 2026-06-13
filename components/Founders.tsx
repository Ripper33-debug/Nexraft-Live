"use client";

import { useState } from "react";
import Image from "next/image";
import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { FOUNDERS } from "@/lib/site";

const bios: Record<string, string> = {
  "Barry Castelli": "Full-stack builds, hosting, and client delivery.",
  "Alex Cridge": "3D production, WebGL pipelines, and visual systems.",
};

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

function FounderAvatar({
  initials,
  photo,
}: {
  initials: string;
  photo: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line bg-panel">
      {!failed ? (
        <Image
          src={photo}
          alt={`${initials} portrait`}
          fill
          className="object-cover"
          sizes="64px"
          onError={() => setFailed(true)}
        />
      ) : null}
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center font-display text-lg font-semibold text-bone ${failed ? "" : "opacity-0"}`}
      >
        {initials}
      </span>
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
          className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
        >
          You work with us directly.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute md:text-base">
          Two founders. No account managers, no handoffs to junior devs.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-12">
        {FOUNDERS.map((founder) => (
          <Reveal key={founder.email} delay={0.06}>
            <div className="flex gap-5">
              <FounderAvatar
                initials={founder.initials}
                photo={founder.photo}
              />
              <div className="min-w-0">
                <p className="font-display text-lg font-semibold text-bone">
                  {founder.name}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-mute">
                  {bios[founder.name]}
                </p>
                <a
                  href={`mailto:${founder.email}`}
                  className={`mt-3 inline-block text-sm text-faint transition-colors hover:text-bone ${focusRing}`}
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
