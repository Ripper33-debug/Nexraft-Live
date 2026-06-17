import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  /** Value shown before animation and used as the animation start point. */
  start?: number;
  duration?: number;
  decimals?: number;
  /** When true, animates from start to end once (requires ~50% in-view trigger). */
  active?: boolean;
};

export function useCountUp({
  end,
  start = 0,
  duration = 1200,
  decimals = 0,
  active = false,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(start);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!active) return;

    if (hasAnimated.current) {
      setValue(end);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(end);
      hasAnimated.current = true;
      return;
    }

    const range = end - start;
    const t0 = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - t0) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(start + range * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        hasAnimated.current = true;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, end, start]);

  return value.toFixed(decimals);
}
