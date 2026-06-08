"use client";

import { useEffect, useRef, useState } from "react";
import { CountUp } from "@/components/CountUp";

type CountUpOnViewProps = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
};

export function CountUpOnView({
  value,
  duration = 900,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: CountUpOnViewProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (decimals > 0) {
    return (
      <span ref={ref} className={className}>
        {prefix}
        {active ? (
          <DecimalCount value={value} duration={duration} decimals={decimals} />
        ) : (
          <span className="tabular-nums">0</span>
        )}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref}>
      {active ? (
        <CountUp
          value={value}
          duration={duration}
          prefix={prefix}
          suffix={suffix}
          className={className}
        />
      ) : (
        <span className={`tabular-nums ${className}`}>
          {prefix}0{suffix}
        </span>
      )}
    </span>
  );
}

function DecimalCount({
  value,
  duration,
  decimals,
}: {
  value: number;
  duration: number;
  decimals: number;
}) {
  const [display, setDisplay] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setDisplay(value);
      return;
    }

    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);

      if (progress < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [value, duration]);

  return (
    <span className="tabular-nums">{display.toFixed(decimals)}</span>
  );
}
