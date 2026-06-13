import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Contact() {
  return (
    <SectionShell id="contact" ariaLabelledBy="contact-heading">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2
            id="contact-heading"
            className="font-grotesk text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone"
          >
            Start a project.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mt-5 font-jetbrains text-sm leading-relaxed text-mute md:text-base">
            30-minute call. We scope your build and quote a fixed monthly rate
            on the spot.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <MagneticButton href={BOOK_CALL_URL}>Book a call -&gt;</MagneticButton>
          <a
            href="mailto:barry@nexraft.com"
            className={`inline-flex items-center justify-center border border-line px-5 py-3 font-jetbrains text-[12px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-mute ${focusRing}`}
          >
            Send a brief
          </a>
        </Reveal>
      </div>
    </SectionShell>
  );
}
