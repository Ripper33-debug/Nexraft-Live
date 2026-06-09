import type { Metadata } from "next";
import Link from "next/link";
import { ManageBilling } from "@/components/ManageBilling";

export const metadata: Metadata = {
  title: "Billing — Nexraft",
  description:
    "Manage Nexraft monthly retainer subscriptions, invoices, and payment methods.",
  robots: { index: false, follow: false },
};

const steps = [
  {
    index: "01",
    title: "Subscribe",
    detail: "Pick a Web retainer on pricing and complete Stripe Checkout.",
  },
  {
    index: "02",
    title: "Manage billing",
    detail: "Update cards, pay invoices, or cancel in the hosted customer portal.",
  },
  {
    index: "03",
    title: "Stay active",
    detail: "Receipts and renewals are handled automatically each month.",
  },
] as const;

type PayPageProps = {
  searchParams: Promise<{ status?: string }>;
};

export default async function PayPage({ searchParams }: PayPageProps) {
  const { status } = await searchParams;
  const success = status === "success";

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
            Billing
          </h1>

          {success && (
            <p className="mt-6 border border-border bg-accent/[0.06] px-4 py-3 font-mono text-xs text-accent">
              Subscription started. Use the portal below to manage payment methods
              and invoices.
            </p>
          )}

          <p className="prose-measure mt-6 text-body text-muted">
            Monthly retainers run through Stripe. Checkout and billing management
            use Stripe&apos;s hosted flows — cards are never handled on this site.
          </p>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Manage billing
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Enter the email you used at checkout. You&apos;ll be redirected to
              Stripe&apos;s customer portal to update cards, view invoices, or
              cancel.
            </p>
            <div className="mt-6 max-w-md">
              <ManageBilling />
            </div>
          </div>

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
                New subscription
              </p>
              <Link
                href="/#pricing"
                className="link-underline mt-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                data-cursor-hover
              >
                View pricing →
              </Link>
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
