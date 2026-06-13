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

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export default async function PayPage({ searchParams }: PayPageProps) {
  const { status } = await searchParams;
  const success = status === "success";

  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-grotesk text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            Activate your retainer.
          </h1>
          <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
            Billing
          </p>
        </div>

        {success ? (
          <div
            className="mt-8 border border-signal-dim/40 bg-signal/[0.06] p-5 md:p-6"
            role="status"
          >
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-signal-dim">
              Status: subscribed
            </p>
            <p className="mt-3 text-sm text-mute">
              Subscription started. Use the portal below to manage payment
              methods and invoices.
            </p>
          </div>
        ) : (
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-mute">
            Configured on your discovery call? Pick your plans below. Web,
            Hosting, and 3D combine into one monthly Stripe subscription.
          </p>
        )}

        <div className="mt-10 grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-ink2 p-6 md:p-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Start your plan
            </p>
            <p className="mt-3 max-w-lg font-jetbrains text-xs leading-relaxed text-mute">
              One plan per category. Combined into a single monthly invoice.
            </p>
            <div className="mt-6">
              <PlanCheckoutConfigurator />
            </div>
          </div>

          <div className="flex flex-col bg-ink2 p-6 md:p-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Manage billing
            </p>
            <p className="mt-3 max-w-lg font-jetbrains text-xs leading-relaxed text-mute">
              Already a client? Update payment method, view invoices, or cancel
              through the Stripe customer portal.
            </p>
            <div className="mt-6 flex-1">
              <ManageBilling />
            </div>

            <div className="mt-10 border-t border-line pt-8">
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                Not set up yet?
              </p>
              <p className="mt-3 font-jetbrains text-xs leading-relaxed text-mute">
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
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Compare plans
            </p>
            <Link
              href="/#pricing"
              className={`link-underline mt-3 inline-block font-jetbrains text-xs uppercase tracking-[0.2em] text-bone ${focusRing}`}
            >
              View pricing
            </Link>
          </div>
          <div>
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Billing support
            </p>
            <div className="mt-3">
              <ContactEmails stacked />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <Link
            href="/"
            className={`link-underline inline-block font-jetbrains text-[11px] uppercase tracking-[0.2em] text-mute transition-colors hover:text-bone ${focusRing}`}
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
