"use client";

import { useEffect, useRef, type RefObject } from "react";

type FrameHandler = (progress: number, velocity: number) => void;

type Options = {
  /** Lerp factor per frame (lower = smoother/laggier). */
  ease?: number;
};

/**
 * Drives a pinned scroll scene without React re-renders. A single rAF loop
 * (only running while the element is near the viewport) eases a displayed
 * progress toward the raw scroll progress and hands it to `onFrame`, which
 * writes styles straight to the DOM. This is what keeps the scroll effects
 * buttery instead of janking on every discrete scroll event.
 *
 * `progress` is 0..1 across the element's over-scroll distance; `velocity` is
 * the per-frame change in raw progress (useful for skew / motion accents).
 * Under reduced motion the handler is called once with (1, 0) and the loop
 * never starts.
 */
export function useScrollScene<T extends HTMLElement>(
  onFrame: FrameHandler,
  options: Options = {},
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const handlerRef = useRef(onFrame);
  handlerRef.current = onFrame;

  const ease = options.ease ?? 0.12;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const target = () => {
      const rect = el.getBoundingClientRect();
      const distance = rect.height - window.innerHeight;
      if (distance <= 0) return 1;
      return Math.min(Math.max(-rect.top, 0), distance) / distance;
    };

    if (reduce) {
      handlerRef.current(1, 0);
      return;
    }

    let raf = 0;
    let active = false;
    let shown = target();
    let last = shown;

    const loop = () => {
      raf = 0;
      const t = target();
      const velocity = t - last;
      last = t;
      shown += (t - shown) * ease;
      if (Math.abs(t - shown) < 0.0004) shown = t;
      handlerRef.current(shown, velocity);
      if (active) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry?.isIntersecting ?? false;
        if (active && !raf) raf = requestAnimationFrame(loop);
      },
      { rootMargin: "30% 0px 30% 0px" },
    );
    io.observe(el);

    // Paint the correct initial frame before the loop kicks in.
    handlerRef.current(shown, 0);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ease]);

  return ref;
}
