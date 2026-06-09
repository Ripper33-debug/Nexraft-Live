import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { ManageBilling } from "@/components/ManageBilling";
import { PlanCheckoutConfigurator } from "@/components/PlanCheckoutConfigurator";

export const metadata: Metadata = {
  title: "Billing",
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
    <section className="section-pad-tight border-b border-border bg-surface-deep">
      <div className="grid-editorial">
        <div className="col-span-12 section-label-gap md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            07 / Billing
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h1 className="text-display-section font-display font-semibold text-foreground">
            Activate your retainer.
          </h1>

          {success ? (
            <div
              className="mt-6 border border-accent/30 bg-accent/[0.06] p-4 md:p-5"
              role="status"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                Status: subscribed
              </p>
              <p className="mt-3 text-sm text-foreground">
                Subscription started. Use the portal below to manage payment
                methods and invoices.
              </p>
            </div>
          ) : (
            <p className="prose-measure mt-6 text-body text-muted">
              Configured on your discovery call? Pick your plans below. Web,
              Hosting, and 3D combine into one monthly Stripe subscription.
            </p>
          )}

          <div className="mt-8 border border-border bg-surface/40 p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Not set up yet?
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Retainers are scoped on a call first. Book a discovery session and
              we&apos;ll quote a fixed monthly rate before you subscribe.
            </p>
            <div className="mt-5">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Start your plan
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              One plan per category. Combined into a single monthly invoice.
            </p>
            <div className="mt-6">
              <PlanCheckoutConfigurator />
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Manage billing
            </p>
            <p className="mt-3 max-w-lg font-mono text-xs leading-relaxed text-muted">
              Already a client? Update payment method, view invoices, or cancel
              through the Stripe customer portal.
            </p>
            <div className="mt-6 max-w-md">
              <ManageBilling />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Compare plans
              </p>
              <Link
                href="/#pricing"
                className="link-underline mt-3 inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground"
                data-cursor-hover
              >
                View pricing
              </Link>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
                Billing support
              </p>
              <div className="mt-3">
                <ContactEmails stacked />
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8">
            <Link
              href="/"
              className="link-underline inline-block font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
              data-cursor-hover
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
