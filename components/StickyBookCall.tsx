"use client";

import { useEffect, useState } from "react";
import { BookCallButton } from "@/components/BookCallButton";

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
          Taking 2 new retainers this quarter
        </p>
        <div className="col-span-12 md:col-span-6 md:flex md:justify-end">
          <BookCallButton label="Book a call" variant="primary" />
        </div>
      </div>
    </div>
  );
}
