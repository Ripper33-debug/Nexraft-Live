"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/BookCallButton";
import {
  FOUNDING_DISCOUNT_PCT,
  FOUNDING_SLOTS_REMAINING,
  FOUNDING_SLOTS_TOTAL,
} from "@/lib/pricing";

export function StickyBookCall() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.42);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="sticky-cta" role="complementary" aria-label="Book a call">
      <div className="sticky-cta-inner grid-editorial items-center gap-3 py-3 md:py-3.5">
        <p className="sticky-cta-copy col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:col-span-6">
          Founding rate {"\u2014"} {FOUNDING_DISCOUNT_PCT}% off retainers{" "}
          {"\u00b7"} {FOUNDING_SLOTS_REMAINING} of {FOUNDING_SLOTS_TOTAL} slots
          open
        </p>
        <div className="col-span-12 md:col-span-6 md:flex md:justify-end">
          <BookCallButton label="Book a call" variant="primary" />
        </div>
      </div>
    </div>
  );
}
