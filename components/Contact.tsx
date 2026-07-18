import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ContactForm } from "@/components/ContactForm";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function Contact() {
  return (
    <SectionShell id="contact" ariaLabelledBy="contact-heading">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <SpecLabel className="mb-4">08 / CONTACT</SpecLabel>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
          >
            Start a project.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-5 font-body text-lg leading-relaxed text-mute">
            30-minute call. We scope your build, migration, or retainer and quote
            Build, Care, or Growth on the spot - fixed price, no surprise
            invoices.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 font-body text-xs leading-normal text-faint">
            You work directly with Barry and the Nexraft team - your account
            manager is one email away.
          </p>
        </Reveal>

        <Reveal
          delay={0.14}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton href={BOOK_CALL_URL} magnetic={false}>
            Book a call
          </MagneticButton>
          <a
            href="#contact-form"
            className={`inline-flex items-center justify-center border border-line px-5 py-3 text-sm text-bone transition-colors duration-300 hover:border-mute ${focusRing}`}
          >
            Send a brief
          </a>
        </Reveal>

        <Reveal delay={0.18} className="mt-12 text-left">
          <div id="contact-form">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
