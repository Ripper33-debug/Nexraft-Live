import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticLink } from "@/components/MagneticLink";

const EMAIL = "hello@nexraft.com";

const briefLines = [
  "What you're building and who it's for",
  "Preferred monthly plan or budget range",
  "Services needed (Web, Hosting, 3D)",
  "Links to references or existing work",
] as const;

const channels = [
  {
    index: "01",
    label: "New project",
    detail: "Monthly scope, timeline, and fixed rate within 48h.",
    href: `mailto:${EMAIL}?subject=${encodeURIComponent("New project — Nexraft")}`,
  },
  {
    index: "02",
    label: "Plan change",
    detail: "Upgrade, downgrade, or adjust your monthly retainer.",
    href: `mailto:${EMAIL}?subject=${encodeURIComponent("Plan change — Nexraft")}`,
  },
  {
    index: "03",
    label: "Billing",
    detail: "Invoices, payment method, or account questions.",
    href: "/pay",
  },
] as const;

const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent("Monthly plan inquiry — Nexraft")}&body=${encodeURIComponent(
  [
    "Project summary:",
    "",
    "Preferred plan:",
    "",
    "Monthly budget:",
    "",
    "References:",
    "",
  ].join("\n"),
)}`;

export function Contact() {
  return (
    <section
      id="contact"
      className="section-pad scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="contact-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 mb-8 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            05 / Contact
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="contact-heading"
            className="text-display-section font-display font-semibold text-foreground"
          >
            Start a project.
          </ScrollReveal>

          <ScrollReveal
            as="p"
            className="prose-measure mt-6 text-body text-muted"
          >
            Tell us what you&apos;re building. We respond within two business
            days with a monthly scope, timeline, and fixed rate.
          </ScrollReveal>
        </div>

        <div className="col-span-12 mt-10 border-t border-border md:col-start-1 md:mt-12">
          <div className="grid grid-cols-12 gap-0 md:gap-6">
            <div className="col-span-12 border-b border-border py-8 md:col-span-5 md:border-b-0 md:py-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Direct line
              </p>
              <MagneticLink
                href={mailtoHref}
                className="link-underline mt-5 block font-display text-[clamp(1.5rem,4vw,2.25rem)] font-medium leading-tight text-foreground"
              >
                {EMAIL}
              </MagneticLink>
              <div className="mt-6 space-y-1 font-mono text-xs text-muted">
                <p>Mon–Fri · 09:00–18:00 UTC</p>
                <p className="text-accent">Response within 48h</p>
              </div>
            </div>

            <div className="col-span-12 border-b border-border py-8 md:col-span-7 md:border-b-0 md:border-l md:py-10 md:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Inquiry type
              </p>
              <ul className="mt-5 divide-y divide-border" role="list">
                {channels.map((channel) => (
                  <li key={channel.index}>
                    <Link
                      href={channel.href}
                      className="contact-channel group flex items-start gap-4 py-4 transition-colors hover:text-foreground"
                      data-cursor-hover
                    >
                      <span className="font-mono text-[10px] tabular-nums text-muted">
                        {channel.index}
                      </span>
                      <div>
                        <p className="font-display text-base font-medium text-foreground">
                          {channel.label}
                        </p>
                        <p className="mt-1 font-mono text-xs text-muted group-hover:text-muted">
                          {channel.detail}
                        </p>
                      </div>
                      <span className="ml-auto font-mono text-[10px] text-muted opacity-0 transition-opacity group-hover:opacity-100">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-12 mt-0 border-t border-border pt-8 md:pt-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Include in your email
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2" role="list">
            {briefLines.map((line, i) => (
              <li
                key={line}
                className="flex items-baseline gap-3 border-b border-border pb-3 font-mono text-xs text-muted"
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
    </section>
  );
}
