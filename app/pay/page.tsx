import type { Metadata } from "next";
import Link from "next/link";
import { ManageBilling } from "@/components/ManageBilling";
import { StartPlanSection } from "@/components/StartPlanSection";

export const metadata: Metadata = {
  title: "Billing — Nexraft",
  description:
    "Start a Nexraft retainer plan or manage your subscription, payment method, and invoices.",
  robots: { index: false, follow: false },
};

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
            Retainers are scoped on a call first. When you&apos;re ready to
            activate, subscribe below. Existing clients can manage billing in the
            Stripe customer portal.
          </p>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Start your plan
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Setting up after our call? Choose the plan we discussed.
            </p>
            <div className="mt-6">
              <StartPlanSection />
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Manage billing
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Already a client? Manage your subscription, payment method, and
              invoices here.
            </p>
            <div className="mt-6 max-w-md">
              <ManageBilling />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Not a client yet?
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
