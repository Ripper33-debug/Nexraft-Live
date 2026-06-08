import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pay Bill — Nexraft",
  description: "Client billing portal for Nexraft.",
};

export default function PayPage() {
  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="grid-editorial">
        <div className="col-span-12 md:col-span-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
            Billing
          </p>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h1 className="font-display text-[clamp(2rem,5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-foreground">
            Pay bill
          </h1>

          <div className="mt-12 max-w-xl space-y-6 border-t border-border pt-12">
            <p className="text-base leading-relaxed text-muted md:text-lg">
              Client billing portal — configure your payment provider and point
              this route when ready.
            </p>
            <p className="font-mono text-xs text-muted">
              Route: /pay · Status: placeholder
            </p>
            <Link
              href="/"
              className="link-underline inline-block font-mono text-xs uppercase tracking-[0.2em] text-foreground"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
