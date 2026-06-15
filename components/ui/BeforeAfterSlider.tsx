"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const LIVE_VIEWPORT = { width: 1440, height: 900 } as const;

export type BeforeAfterScreenshot = {
  src: string;
  alt: string;
  domain: string;
  href: string;
};

type BeforeAfterSliderProps = {
  mode?: "metrics" | "screenshots";
  beforeLabel?: string;
  afterLabel?: string;
  before?: BeforeAfterScreenshot;
  after?: BeforeAfterScreenshot;
  afterLive?: boolean;
  className?: string;
  caption?: string;
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

function PanelChrome({
  label,
  shot,
  badge,
}: {
  label: string;
  shot: BeforeAfterScreenshot;
  badge?: string;
}) {
  return (
    <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-3 border-b border-line/70 bg-[rgba(10,14,12,0.9)] px-4 py-3 md:px-5">
      <div className="flex min-w-0 items-center gap-3">
        <p className="font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint">
          {label}
        </p>
        {badge ? (
          <span className="font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
            {badge}
          </span>
        ) : null}
      </div>
      <a
        href={shot.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`shrink-0 font-jetbrains text-[10px] uppercase tracking-[0.14em] text-mute transition-colors hover:text-bone ${focusRing}`}
      >
        {shot.domain} {"\u2197"}
      </a>
    </div>
  );
}

function ScreenshotPanel({
  side,
  label,
  shot,
}: {
  side: "before" | "after";
  label: string;
  shot: BeforeAfterScreenshot;
}) {
  return (
    <div className="relative h-full w-full bg-ink">
      <Image
        src={shot.src}
        alt={shot.alt}
        fill
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 1180px"
        priority={side === "after"}
      />
      <PanelChrome label={label} shot={shot} />
    </div>
  );
}

function LiveSitePanel({
  label,
  shot,
  allowInteraction,
  onEnableInteraction,
}: {
  label: string;
  shot: BeforeAfterScreenshot;
  allowInteraction: boolean;
  onEnableInteraction: () => void;
}) {
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const [liveBlocked, setLiveBlocked] = useState(false);

  useEffect(() => {
    const node = frameWrapRef.current;
    if (!node) return;

    const update = () => {
      setScale(node.clientWidth / LIVE_VIEWPORT.width);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const iframe = frameWrapRef.current?.querySelector("iframe");
      if (!iframe) return;
      try {
        const doc = iframe.contentDocument;
        if (!doc || !doc.body?.childElementCount) setLiveBlocked(true);
      } catch {
        /* cross-origin load succeeded */
      }
    }, 4500);
    return () => window.clearTimeout(timer);
  }, []);

  const handleInteract = () => {
    if (liveBlocked) {
      window.open(shot.href, "_blank", "noopener,noreferrer");
      return;
    }
    onEnableInteraction();
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink">
      <Image
        src={shot.src}
        alt=""
        fill
        aria-hidden
        className="object-cover object-top"
        sizes="(max-width: 768px) 100vw, 1180px"
      />

      {!liveBlocked ? (
        <div ref={frameWrapRef} className="absolute inset-0">
          <iframe
            src={shot.href}
            title={shot.alt}
            className="absolute left-0 border-0 bg-ink"
            style={{
              top: 46,
              width: LIVE_VIEWPORT.width,
              height: LIVE_VIEWPORT.height,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              pointerEvents: allowInteraction ? "auto" : "none",
            }}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onError={() => setLiveBlocked(true)}
          />
        </div>
      ) : null}

      <PanelChrome
        label={label}
        shot={shot}
        badge={liveBlocked ? "Snapshot" : "Live"}
      />

      {!allowInteraction ? (
        <div className="absolute inset-x-0 bottom-0 z-20 border-t border-line bg-[rgba(10,14,12,0.92)] px-4 py-3 md:px-5">
          <button
            type="button"
            onClick={handleInteract}
            className={`font-jetbrains text-[10px] uppercase tracking-[0.14em] text-bone underline decoration-line underline-offset-4 transition-colors hover:text-signal ${focusRing}`}
          >
            {liveBlocked ? "Open live site in new tab" : "Interact with live site"}
          </button>
        </div>
      ) : null}
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

export const WEATHERHAVEN_COMPARISON = {
  before: {
    src: "/case-studies/weatherhaven-com.png",
    alt: "Weatherhaven corporate site at weatherhaven.com",
    domain: "weatherhaven.com",
    href: "https://weatherhaven.com",
  },
  after: {
    src: "/case-studies/weatherhavenusa-com.png",
    alt: "Weatherhaven USA site rebuilt by Nexraft at weatherhavenusa.com",
    domain: "weatherhavenusa.com",
    href: "https://weatherhavenusa.com",
  },
} satisfies { before: BeforeAfterScreenshot; after: BeforeAfterScreenshot };

export function BeforeAfterSlider({
  mode = "metrics",
  beforeLabel = "Before",
  afterLabel = "After",
  before,
  after,
  afterLive = false,
  className = "",
  caption,
}: BeforeAfterSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(afterLive ? 38 : 50);
  const [allowInteraction, setAllowInteraction] = useState(false);
  const dragging = useRef(false);

  const beforeShot = before ?? WEATHERHAVEN_COMPARISON.before;
  const afterShot = after ?? WEATHERHAVEN_COMPARISON.after;

  const setFromClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPct(Math.min(96, Math.max(4, next)));
  }, []);

  const onPointerDown = (event: React.PointerEvent) => {
    dragging.current = true;
    setAllowInteraction(false);
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

  const handleEnableInteraction = () => {
    setAllowInteraction(true);
  };

  const sliderLabel =
    mode === "screenshots"
      ? "Drag to compare Weatherhaven sites"
      : "Drag to compare before and after migration";

  const footerCaption =
    caption ??
    (mode === "screenshots"
      ? afterLive
        ? `Drag to compare \u00b7 ${beforeShot.domain} vs live ${afterShot.domain}`
        : `Drag to compare \u00b7 ${beforeShot.domain} vs ${afterShot.domain}`
      : "Drag to compare \u00b7 Representative migration outcomes");

  const afterPanel =
    mode === "screenshots" && afterLive ? (
      <LiveSitePanel
        label={afterLabel}
        shot={afterShot}
        allowInteraction={allowInteraction}
        onEnableInteraction={handleEnableInteraction}
      />
    ) : mode === "screenshots" ? (
      <ScreenshotPanel side="after" label={afterLabel} shot={afterShot} />
    ) : (
      <MetricPanel variant="after" title={afterLabel} metrics={AFTER_METRICS} />
    );

  return (
    <div className={className}>
      <div
        ref={trackRef}
        className="before-after-track relative aspect-[16/10] overflow-hidden border border-line select-none touch-none"
      >
        <div className="absolute inset-0">{afterPanel}</div>

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          aria-hidden="true"
        >
          {mode === "screenshots" ? (
            <ScreenshotPanel side="before" label={beforeLabel} shot={beforeShot} />
          ) : (
            <MetricPanel variant="before" title={beforeLabel} metrics={BEFORE_METRICS} />
          )}
        </div>

        <div
          className="before-after-handle pointer-events-none absolute inset-y-0 z-30 w-px bg-bone/80"
          style={{ left: `${pct}%` }}
          aria-hidden="true"
        />

        <button
          type="button"
          role="slider"
          aria-label={sliderLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pct)}
          className={`before-after-knob relative absolute top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 ${focusRing}`}
          style={{ left: `${pct}%` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>
      <p className="mt-3 text-center font-jetbrains text-[10px] uppercase tracking-[0.16em] text-faint">
        {footerCaption}
      </p>
    </div>
  );
}
