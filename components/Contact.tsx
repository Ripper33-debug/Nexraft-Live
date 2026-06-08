import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticLink } from "@/components/MagneticLink";
import { ContactForm } from "@/components/ContactForm";

const EMAIL = "hello@nexraft.com";
const BILLING_EMAIL = "billing@nexraft.com";

const channels = [
  {
    index: "01",
    label: "Plan change",
    detail: "Upgrade or adjust your monthly retainer.",
    href: `mailto:${EMAIL}?subject=${encodeURIComponent("Plan change — Nexraft")}`,
  },
  {
    index: "02",
    label: "Billing",
    detail: "Invoices, payment method, or account questions.",
    href: `mailto:${BILLING_EMAIL}?subject=${encodeURIComponent("Billing inquiry — Nexraft")}`,
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="section-pad scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="contact-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            05 / Contact
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <ScrollReveal
            as="h2"
            id="contact-heading"
            className="text-display-section text-pretty font-display font-semibold text-foreground"
          >
            Start a&nbsp;project.
          </ScrollReveal>

          <ScrollReveal
            as="p"
            className="prose-measure mt-6 text-body-sm text-muted"
          >
            Tell us what you&apos;re building. We respond within two business
            days with a monthly scope, timeline, and fixed&nbsp;rate.
          </ScrollReveal>
        </div>

        <div className="col-span-12 mt-10 border-t border-border md:col-start-1">
          <div className="grid grid-cols-12 gap-0 lg:gap-8">
            <div className="col-span-12 border-b border-border py-8 lg:col-span-7 lg:border-b-0 lg:py-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Project inquiry
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>

            <div className="col-span-12 py-8 lg:col-span-5 lg:border-l lg:py-10 lg:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Direct line
              </p>
              <MagneticLink
                href={`mailto:${EMAIL}`}
                className="link-underline mt-5 block font-display text-[clamp(1.25rem,3vw,1.75rem)] font-medium leading-tight text-foreground"
              >
                {EMAIL}
              </MagneticLink>
              <div className="mt-6 space-y-1 font-mono text-xs text-muted">
                <p>Mon–Fri · 09:00–18:00 UTC</p>
                <p className="text-accent">Response within 48h</p>
              </div>

              <div className="mt-10 border-t border-border pt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Other inquiries
                </p>
                <ul className="mt-4 divide-y divide-border" role="list">
                  {channels.map((channel) => (
                    <li key={channel.index}>
                      <Link
                        href={channel.href}
                        className="contact-channel group flex items-start gap-3 py-4"
                        data-cursor-hover
                      >
                        <span className="font-mono text-[10px] tabular-nums text-muted">
                          {channel.index}
                        </span>
                        <div>
                          <p className="font-display text-sm font-medium text-foreground">
                            {channel.label}
                          </p>
                          <p className="mt-1 font-mono text-[11px] text-muted">
                            {channel.detail}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
