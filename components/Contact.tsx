import Link from "next/link";
import { ScrollReveal } from "@/components/ScrollReveal";
import { MagneticLink } from "@/components/MagneticLink";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactForm } from "@/components/ContactForm";
import { CalEmbed } from "@/components/CalEmbed";
import { sectionLabel } from "@/lib/sections";
import { ContactEmails } from "@/components/ContactEmails";
import { CONTACT_EMAILS } from "@/lib/site";

const channels = [
  {
    index: "01",
    label: "Plan change",
    detail: "Upgrade or adjust your monthly retainer.",
    href: `mailto:${CONTACT_EMAILS[0]}?subject=${encodeURIComponent("Plan change — Nexraft")}`,
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
            Book a discovery call for the fastest path — or send a written brief
            if you prefer. We respond within two business days with scope and a
            fixed monthly rate.
          </ScrollReveal>
        </div>

        <div className="col-span-12 mt-8 border-t border-border md:col-start-1">
          <div className="grid grid-cols-12 gap-0 lg:gap-8">
            <div className="col-span-12 py-6 lg:col-span-6 lg:py-8">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Book a call
                </p>
                <span className="contact-path-badge">Recommended</span>
              </div>
              <p className="mt-3 max-w-md font-mono text-xs leading-relaxed text-muted">
                30 minutes. We scope your build, recommend a plan, and quote a
                fixed monthly rate on the call.
              </p>
              <div className="mt-5">
                <BookCallButton label="Book a call" variant="primary" />
              </div>
              <CalEmbed />

              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                  Direct line
                </p>
                <div className="mt-4">
                  <ContactEmails stacked />
                </div>
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

            <div className="col-span-12 border-t border-border py-6 lg:col-span-6 lg:border-l lg:border-t-0 lg:py-8 lg:pl-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Written brief
              </p>
              <p className="mt-3 font-mono text-xs leading-relaxed text-muted">
                Prefer email-style intake? Send a short summary and we&apos;ll
                reply with scope and pricing.
              </p>
              <div className="mt-5">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
