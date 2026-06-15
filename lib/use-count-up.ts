import { useEffect, useRef, useState } from "react";

type UseCountUpOptions = {
  end: number;
  duration?: number;
  decimals?: number;
  active?: boolean;
};

export function useCountUp({
  end,
  duration = 1200,
  decimals = 0,
  active = true,
}: UseCountUpOptions): string {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!active) {
      setValue(0);
      started.current = false;
      return;
    }
    if (started.current) return;
    started.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(end);
      return;
    }

    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(end * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, end]);

  return value.toFixed(decimals);
}
