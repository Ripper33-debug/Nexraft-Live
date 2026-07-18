"use client";

import { useEffect, useRef } from "react";

type Props = {
  text: string;
  className?: string;
};

/**
 * Splits a string into per-character spans that rise in with a stagger when
 * the element scrolls into view (IntersectionObserver sets data-shown; CSS in
 * globals.css does the animating, gated behind prefers-reduced-motion). Words
 * are wrapped in nowrap spans so line-breaking stays natural. Screen readers
 * get the plain string via aria-label; the char soup is aria-hidden.
 */
export function CharTitle({ text, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          el.dataset.shown = "true";
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let i = 0;
  return (
    <span ref={ref} className={`ct ${className}`.trim()} aria-label={text} role="text">
      <span aria-hidden="true">
        {text.split(" ").map((word, wi) => (
          <span key={wi} className="ct-word">
            {word.split("").map((ch, ci) => (
              <span
                key={ci}
                className="ct-char"
                style={{ "--ci": i++ } as React.CSSProperties}
              >
                {ch}
              </span>
            ))}
            {wi < text.split(" ").length - 1 ? "\u00a0" : null}
          </span>
        ))}
      </span>
    </span>
  );
}
