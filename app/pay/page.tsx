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
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            Activate your retainer.
          </h1>
          <p className="text-sm text-faint">Billing</p>
        </div>

        {success ? (
          <div
            className="mt-8 border border-line bg-ink2 p-5 md:p-6"
            role="status"
          >
            <p className="text-sm font-medium text-bone">Subscription started</p>
            <p className="mt-3 text-sm text-mute">
              Use the portal below to manage payment methods and invoices.
            </p>
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-mute">
            Configured on your discovery call? Pick your plans below. Web,
            Hosting, and 3D combine into one monthly Stripe subscription.
          </p>
        )}

        <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-ink2 p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              Start your plan
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              One plan per category. Combined into a single monthly invoice.
            </p>
            <div className="mt-6">
              <PlanCheckoutConfigurator />
            </div>
          </div>

          <div className="flex flex-col bg-ink2 p-6 md:p-8">
            <h2 className="font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
              Manage billing
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              Already a client? Update payment method, view invoices, or cancel
              through the Stripe customer portal.
            </p>
            <div className="mt-6 flex-1">
              <ManageBilling />
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="text-sm text-faint">Not set up yet?</p>
              <p className="mt-3 text-sm leading-relaxed text-mute">
                Retainers are scoped on a call first. We quote a fixed monthly
                rate before you subscribe.
              </p>
              <div className="mt-5">
                <BookCallButton label="Book a call" variant="primary" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm text-faint">Compare plans</p>
            <Link
              href="/#pricing"
              className="mt-2 inline-block text-sm text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              View pricing
            </Link>
          </div>
          <div>
            <p className="text-sm text-faint">Billing support</p>
            <div className="mt-2">
              <ContactEmails stacked />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <Link
            href="/"
            className="text-sm text-soft transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
