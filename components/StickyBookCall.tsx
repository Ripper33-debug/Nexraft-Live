"use client";

import { useEffect, useState } from "react";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const SHOW_AFTER_PX = 520;

export function StickyBookCall() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let lastY = 0;

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        if (Math.abs(y - lastY) < 8) return;
        lastY = y;
        setVisible(y > SHOW_AFTER_PX);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={`sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-7 ${
        visible ? "sticky-cta-visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto mx-auto flex max-w-[1180px] items-center justify-between gap-4 border border-line bg-[color-mix(in_srgb,var(--color-ink)_96%,transparent)] px-4 py-3 md:px-5">
        <p className="hidden text-sm text-mute sm:block">
          Ready to scope your stack?
        </p>
        <a
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={visible ? 0 : -1}
          className={`nav-cta ml-auto shrink-0 ${focusRing}`}
        >
          <span className="nav-cta-dot" aria-hidden="true" />
          Book a call
          <span className="nav-cta-arrow" aria-hidden="true">
            {"\u2192"}
          </span>
        </a>
      </div>
    </div>
  );
}
