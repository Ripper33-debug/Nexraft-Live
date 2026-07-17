import { SectionShell } from "@/components/ui/SectionShell";
import { Reveal } from "@/components/ui/Reveal";
import { SpecLabel } from "@/components/ui/SpecLabel";
import { ContactForm } from "@/components/ContactForm";
import { BOOK_CALL_URL, FOUNDERS } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-accent)] focus-visible:[outline-offset:2px]";

const founderNames = FOUNDERS.map((f) => f.name).join(" and ");

export function Contact() {
  return (
    <SectionShell id="contact" ariaLabelledBy="contact-heading">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <SpecLabel className="mb-4">08 / CONTACT</SpecLabel>
          <h2
            id="contact-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-tight text-text-primary"
          >
            Tell us what tool you need.
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-5 font-body text-lg leading-relaxed text-text-secondary">
            30-minute discovery call or a short brief below. We will scope the
            tool, integrations, and timeline, then send a fixed quote before
            anyone builds.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-4 font-body text-xs leading-normal text-text-muted">
            You work directly with {founderNames}. No account managers.
          </p>
        </Reveal>

        <Reveal
          delay={0.14}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <a
            href={BOOK_CALL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 border border-border-light bg-bg-tertiary px-6 py-3 font-jetbrains text-[11px] uppercase tracking-[0.15em] text-text-primary transition-colors hover:bg-border hover:text-text-primary ${focusRing}`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success" />
            Book a discovery call
          </a>
          <a
            href="#contact-form"
            className={`inline-flex items-center justify-center border border-border px-5 py-3 text-sm text-text-primary transition-colors duration-300 hover:border-text-tertiary ${focusRing}`}
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
