import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticLink } from "@/components/MagneticLink";
import { ContactForm } from "@/components/ContactForm";
import { CalEmbed } from "@/components/CalEmbed";
import { sectionLabel } from "@/lib/sections";

const EMAIL = "hello@nexraft.com";

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
    detail: "Subscribe, manage payment method, or view invoices.",
    href: "/pay",
  },
] as const;

export function Contact() {
  return (
    <section
      id="contact"
      className="section-pad-tight scroll-mt-20 border-b border-border bg-surface-deep"
      aria-labelledby="contact-heading"
    >
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            {sectionLabel("contact")}
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
            className="prose-measure mt-5 text-body-sm text-muted"
          >
            Tell us what you&apos;re building — or book a call and skip the
            form. We respond within two business days with scope and a fixed
            monthly rate.
          </ScrollReveal>
        </div>

        <div className="col-span-12 mt-8 border-t border-border md:col-start-1">
          <div className="grid grid-cols-12 gap-0 lg:gap-8">
            <div className="col-span-12 border-b border-border py-6 lg:col-span-6 lg:border-b-0 lg:py-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Project inquiry
              </p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>

            <div className="col-span-12 py-6 lg:col-span-6 lg:border-l lg:py-8 lg:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Book a call
              </p>
              <CalEmbed />

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Direct line
                </p>
                <MagneticLink
                  href={`mailto:${EMAIL}`}
                  className="link-underline mt-4 block font-display text-[clamp(1.15rem,2.5vw,1.5rem)] font-medium leading-tight text-foreground"
                >
                  {EMAIL}
                </MagneticLink>
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Other inquiries
                </p>
                <ul className="mt-3 divide-y divide-border" role="list">
                  {channels.map((channel) => (
                    <li key={channel.index}>
                      <Link
                        href={channel.href}
                        className="contact-channel group flex min-h-11 items-start gap-3 py-3"
                        data-cursor-hover
                      >
                        <span className="font-mono text-[10px] tabular-nums text-muted">
                          {channel.index}
                        </span>
                        <div>
                          <p className="font-display text-sm font-medium text-foreground">
                            {channel.label}
                          </p>
                          <p className="mt-0.5 font-mono text-[11px] text-muted">
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
