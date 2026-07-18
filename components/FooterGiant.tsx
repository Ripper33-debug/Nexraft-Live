"use client";

import { useRef } from "react";

const WORD = "NEXRAFT";

/**
 * Oversized outline wordmark that sits above the footer links. On hover the
 * characters run a wave (data-wave retriggers the CSS animation with per-char
 * delays). Pure decoration: aria-hidden, and static under reduced motion.
 */
export function FooterGiant() {
  const ref = useRef<HTMLDivElement>(null);

  const wave = () => {
    const el = ref.current;
    if (!el) return;
    el.removeAttribute("data-wave");
    // Force reflow so re-adding the attribute restarts the animation.
    void el.offsetWidth;
    el.setAttribute("data-wave", "true");
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      onMouseEnter={wave}
      className="fg select-none overflow-hidden border-t border-line bg-ink px-7 pb-2 pt-10"
    >
      <div className="mx-auto flex max-w-[1180px] justify-between">
        {WORD.split("").map((ch, i) => (
          <span
            key={i}
            className="fg-char font-display font-semibold leading-none tracking-[-0.02em]"
            style={{ "--fi": i } as React.CSSProperties}
          >
            {ch}
          </span>
        ))}
      </div>
    </div>
  );
}
