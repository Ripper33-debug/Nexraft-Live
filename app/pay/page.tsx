import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pay Bill — Nexraft",
  description:
    "Client billing portal for Nexraft monthly retainers and hosting subscriptions.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    index: "01",
    title: "Locate your invoice",
    detail: "Check your email for the monthly invoice from hello@nexraft.com.",
  },
  {
    index: "02",
    title: "Pay online",
    detail: "Use the secure payment link in your invoice. Cards and ACH accepted.",
  },
  {
    index: "03",
    title: "Confirmation",
    detail: "Receipt sent automatically. Hosting and retainers stay active.",
  },
] as const;

export default function PayPage() {
  return (
    <section className="section-pad border-b border-border">
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Billing
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h1 className="text-display-section font-display font-semibold text-foreground">
            Pay bill
          </h1>

          <p className="prose-measure mt-6 text-body text-muted">
            Monthly invoices for retainers and hosting. Payment portal connects
            here when your provider is configured.
          </p>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              How billing works
            </p>
            <ol className="mt-5 divide-y divide-border" role="list">
              {steps.map((step) => (
                <li
                  key={step.index}
                  className="grid grid-cols-12 gap-3 py-5 md:gap-5"
                >
                  <span className="col-span-2 font-mono text-xs tabular-nums text-muted md:col-span-1">
                    {step.index}
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <p className="font-display text-base font-medium text-foreground">
                      {step.title}
                    </p>
                    <p className="mt-1 font-mono text-xs leading-relaxed text-muted">
                      {step.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Payment portal
              </p>
              <p className="mt-3 font-mono text-xs text-muted">
                Online payments coming soon. Use the link in your invoice for
                now.
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Billing support
              </p>
              <a
                href="mailto:billing@nexraft.com"
                className="link-underline mt-3 inline-block font-display text-lg text-foreground"
                data-cursor-hover
              >
                billing@nexraft.com
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <Link
              href="/"
              className="link-underline inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
              data-cursor-hover
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
