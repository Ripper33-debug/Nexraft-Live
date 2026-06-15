"use client";

import { useCallback, useRef, useState } from "react";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

type BeforeAfterSliderProps = {
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

function MetricPanel({
  variant,
  title,
  metrics,
}: {
  variant: "before" | "after";
  title: string;
  metrics: { label: string; value: string; bad?: boolean }[];
}) {
  const isBefore = variant === "before";

  return (
    <div
      className={`flex h-full flex-col p-5 md:p-7 ${
        isBefore ? "bg-[#120808]" : "bg-ink2"
      }`}
    >
      <p className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint">
        {title}
      </p>
      <p
        className={`mt-3 font-display text-lg font-semibold ${
          isBefore ? "text-mute" : "text-bone"
        }`}
      >
        {isBefore ? "Legacy builder stack" : "Nexraft managed stack"}
      </p>
      <ul className="mt-6 flex-1 space-y-3">
        {metrics.map((item) => (
          <li
            key={item.label}
            className="flex items-baseline justify-between gap-4 border-b border-line pb-3 text-sm"
          >
            <span className="text-mute">{item.label}</span>
            <span
              className={`font-jetbrains text-xs uppercase tracking-[0.12em] ${
                item.bad ? "text-[#c45c5c]" : "text-signal-dim"
              }`}
            >
              {item.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const BEFORE_METRICS = [
  { label: "Lighthouse performance", value: "58", bad: true },
  { label: "Largest contentful paint", value: "4.6s", bad: true },
  { label: "Plugin / script weight", value: "24 deps", bad: true },
  { label: "Editor deploy cycle", value: "3-5 days", bad: true },
];

const AFTER_METRICS = [
  { label: "Lighthouse performance", value: "96" },
  { label: "Largest contentful paint", value: "0.9s" },
  { label: "Plugin / script weight", value: "Static" },
  { label: "Editor deploy cycle", value: "Same day" },
];

export function BeforeAfterSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: BeforeAfterSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };

  const onPointerMove = (event: React.PointerEvent) => {
    if (!dragging.current) return;
    setFromClientX(event.clientX);
  };

  const onPointerUp = (event: React.PointerEvent) => {
    dragging.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="before-after-track relative aspect-[16/10] overflow-hidden border border-line select-none touch-none"
      >
        <div className="absolute inset-0">
          <MetricPanel variant="after" title={afterLabel} metrics={AFTER_METRICS} />
        </div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          aria-hidden="true"
        >
          <MetricPanel variant="before" title={beforeLabel} metrics={BEFORE_METRICS} />
        </div>

        <div
          className="before-after-handle pointer-events-none absolute inset-y-0 z-10 w-px bg-bone/80"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />

        <button
          type="button"
          role="slider"
          aria-label="Drag to compare before and after migration"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          className={`before-after-knob relative absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 ${focusRing}`}
          style={{ left: `${pct}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      <p className="mt-3 text-center font-jetbrains text-[10px] uppercase tracking-[0.16em] text-faint">
        Drag to compare {"\u00b7"} Representative migration outcomes
      </p>
    </div>
  );
}
