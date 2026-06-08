import { ScrollReveal } from "@/components/ScrollReveal";

const EMAIL = "hello@nexraft.com";

const briefLines = [
  "What you're building and who it's for",
  "Target launch date or timeline",
  "Budget range (ballpark is fine)",
  "Links to references or existing work",
] as const;

const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Project inquiry — Nexraft")}&body=${encodeURIComponent(
  [
    "Project summary:",
    "",
    "Timeline:",
    "",
    "Budget range:",
    "",
    "References:",
    "",
  ].join("\n"),
)}`;

export function Contact() {
  return (
    <section
      id="contact"
      className="scroll-mt-20 border-b border-border bg-surface-deep py-24 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 mb-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            04 / Contact
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="contact-heading"
            className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground"
          >
            Start a project.
          </ScrollReveal>

          <div className="mt-12 border-t border-border pt-12">
            <ScrollReveal
              as="p"
              className="max-w-xl text-base text-muted md:text-lg"
            >
              Tell us what you&apos;re building. We respond within two business
              days with scope, timeline, and a fixed quote.
            </ScrollReveal>

            <div className="mt-10 flex flex-col gap-8 border-b border-border pb-10 sm:flex-row sm:items-start sm:justify-between">
              <a
                href={mailtoHref}
                className="link-underline font-display text-2xl font-medium text-foreground md:text-3xl"
              >
                {EMAIL}
              </a>
              <div className="space-y-1 font-mono text-xs text-muted">
                <p>Mon–Fri · 09:00–18:00 UTC</p>
                <p className="text-accent">Response within 48h</p>
              </div>
            </div>

            <div className="mt-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Include in your email
              </p>
              <ul className="mt-6 space-y-3 border-t border-border pt-6">
                {briefLines.map((line, i) => (
                  <li
                    key={line}
                    className="flex items-baseline gap-4 font-mono text-xs text-muted"
                  >
                    <span className="tabular-nums text-foreground/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
