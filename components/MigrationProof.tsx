"use client";

import Link from "next/link";
import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function MigrationProof() {
  return (
    <SectionShell id="migration-proof" ariaLabelledBy="migration-proof-heading">
      <Reveal>
        <SectionHeader
          specLabel="MIGRATION / PROOF"
          titleId="migration-proof-heading"
          title="See the difference."
          subtitle="Drag the slider. weatherhaven.com on the left, the live Nexraft rebuild at weatherhavenusa.com on the right - scroll the hero, explore the site."
        />
      </Reveal>

      <Reveal delay={0.06}>
        <BeforeAfterSlider
          mode="screenshots"
          afterLive
          beforeLabel="Previous site"
          afterLabel="Nexraft rebuild"
          className="mt-10 md:mt-12"
        />
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <Link
            href="/work/weatherhaven"
            className={`text-sm text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal ${focusRing}`}
          >
            Weatherhaven case study
          </Link>
          <Link
            href="/squarespace-migration"
            className={`text-sm text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone ${focusRing}`}
          >
            Squarespace migration
          </Link>
          <Link
            href="/wordpress-too-slow"
            className={`text-sm text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone ${focusRing}`}
          >
            Slow WordPress rebuilds
          </Link>
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-sm text-soft underline decoration-line underline-offset-4 transition-colors hover:text-bone ${focusRing}`}
          >
            Book a migration call
          </a>
        </div>
      </Reveal>
    </SectionShell>
  );
}
