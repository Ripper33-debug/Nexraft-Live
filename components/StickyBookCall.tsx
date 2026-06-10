"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/BookCallButton";
import {
  FOUNDING_DISCOUNT_PCT,
  FOUNDING_SLOTS_REMAINING,
  FOUNDING_SLOTS_TOTAL,
} from "@/lib/pricing";

export function StickyBookCall() {
  const [pastHero, setPastHero] = useState(false);
  const [endInView, setEndInView] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    const contact = document.getElementById("contact");
    const footer = document.querySelector("footer");

    const visibility = new Map<Element, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target, entry.isIntersecting);
        }
        setPastHero(hero ? visibility.get(hero) === false : true);
        setEndInView(
          [contact, footer].some((el) => el && visibility.get(el)),
        );
      },
      { threshold: 0 },
    );

    for (const el of [hero, contact, footer]) {
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  if (!pastHero || endInView) return null;

  return (
    <div className="sticky-cta" role="complementary" aria-label="Book a call">
      <div className="sticky-cta-inner grid-editorial items-center gap-3 py-3 md:py-3.5">
        <p className="sticky-cta-copy col-span-12 font-mono text-[10px] uppercase tracking-[0.16em] text-muted md:col-span-6">
          Founding rate: {FOUNDING_DISCOUNT_PCT}% off retainers{" "}
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
