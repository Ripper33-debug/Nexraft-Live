"use client";

import { SectionHeader, SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";

const USE_CASES = [
  "Let customers explore a product in 3D",
  "Turn CAD files into a web-ready viewer",
  "Let customers configure options and request a quote",
  "Let clients upload files, photos, or documents",
  "Let customers approve estimates and pay deposits",
  "Connect forms to QuickBooks, CRM, email, or internal systems",
  "Give sales teams a better demo tool",
] as const;

export function ToolLayer() {
  return (
    <SectionShell id="tools" ariaLabelledBy="tools-heading">
      <Reveal>
        <SectionHeader
          specLabel="02 / THE LAYER"
          titleId="tools-heading"
          title="Not just a website. The system behind it."
          subtitle="Most companies already have a website. The problem is that the site does not help customers choose, quote, approve, upload, configure, or buy. Nexraft builds the custom layer that turns a normal site into a real business tool."
        />
      </Reveal>

      <Reveal delay={0.06}>
        <ul className="mt-12 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-2">
          {USE_CASES.map((item) => (
            <li
              key={item}
              className="flex gap-3 bg-ink2 px-5 py-4 text-sm leading-relaxed text-mute md:px-6 md:py-5"
            >
              <span className="text-signal-dim" aria-hidden="true">
                {"\u2013"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-faint">
          Need a new marketing site too? We build that as the foundation. The
          custom tool is usually why teams hire us.
        </p>
      </Reveal>
    </SectionShell>
  );
}
