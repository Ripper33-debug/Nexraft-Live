"use client";

import { useEffect, useState } from "react";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const SHOW_AFTER_PX = 520;

export function StickyBookCall() {
  const [scrolled, setScrolled] = useState(false);
  // Hide once the visitor reaches the contact section / footer: they already
  // have the CTA in front of them there, and the bar would otherwise cover
  // the footer links at the bottom of the page.
  const [atEnd, setAtEnd] = useState(false);

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
        setScrolled(y > SHOW_AFTER_PX);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const targets = [
      document.getElementById("contact"),
      document.querySelector("footer"),
    ].filter((el): el is HTMLElement => Boolean(el));
    if (targets.length === 0) return;

    const seen = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) seen.set(entry.target, entry.isIntersecting);
        setAtEnd([...seen.values()].some(Boolean));
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const visible = scrolled && !atEnd;

  return (
    <div
      className={`sticky-cta pointer-events-none fixed inset-x-0 bottom-0 z-50 px-4 pb-4 md:px-7 ${
        visible ? "sticky-cta-visible" : ""
      }`}
      aria-hidden={!visible}
    >
      <div className="pointer-events-auto mx-auto flex max-w-[1180px] items-center justify-between gap-4 border border-line bg-[color-mix(in_srgb,var(--color-ink)_92%,transparent)] backdrop-blur-md px-4 py-3 md:px-5">
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
