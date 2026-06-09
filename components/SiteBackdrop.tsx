"use client";

import { useEffect, useState } from "react";

export function SiteBackdrop() {
  const [scroll, setScroll] = useState(0);
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    setMotion(!reduced);

    const onScroll = () => setScroll(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallax = motion
    ? {
        glow: `translate3d(0, ${scroll * 0.06}px, 0)`,
        horizons: `translate3d(0, ${scroll * 0.12}px, 0)`,
        field: `translate3d(0, ${scroll * 0.04}px, 0)`,
        nodes: `translate3d(0, ${scroll * 0.08}px, 0)`,
      }
    : {
        glow: undefined,
        horizons: undefined,
        field: undefined,
        nodes: undefined,
      };

  return (
    <div
      className="site-backdrop pointer-events-none fixed inset-0 z-0"
      aria-hidden="true"
    >
      <div className="site-backdrop-vignette" />
      <div className="site-backdrop-layer" style={{ transform: parallax.glow }}>
        <div className="site-backdrop-glow" />
      </div>
      <div className="site-backdrop-layer" style={{ transform: parallax.field }}>
        <div className="site-backdrop-field" />
      </div>
      <div className="site-backdrop-layer" style={{ transform: parallax.horizons }}>
        <div className="site-backdrop-signal" />
      </div>
      <div className="site-backdrop-scan" />
      <div className="site-backdrop-scan site-backdrop-scan-alt" />

      <div className="site-backdrop-layer" style={{ transform: parallax.nodes }}>
      <svg
        className="site-backdrop-nodes"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle
          className="site-backdrop-node"
          cx="1180"
          cy="220"
          r="140"
          stroke="rgba(61,220,132,0.07)"
          strokeWidth="0.75"
        />
        <circle
          className="site-backdrop-node site-backdrop-node-delay"
          cx="1180"
          cy="220"
          r="88"
          stroke="rgba(61,220,132,0.1)"
          strokeWidth="0.75"
        />
        <ellipse
          className="site-backdrop-node"
          cx="1180"
          cy="220"
          rx="200"
          ry="68"
          stroke="rgba(61,220,132,0.05)"
          strokeWidth="0.75"
        />
        <path
          className="site-backdrop-node-path"
          d="M960 140 L1180 200 L1400 140 L1280 320 L1400 500 L1180 440 L960 500 L1080 320 Z"
          stroke="rgba(61,220,132,0.09)"
          strokeWidth="0.75"
        />
        <line
          className="site-backdrop-node-path"
          x1="180"
          y1="640"
          x2="1320"
          y2="640"
          stroke="rgba(61,220,132,0.06)"
          strokeWidth="0.75"
          strokeDasharray="4 12"
        />
        <line
          className="site-backdrop-node-path site-backdrop-node-delay"
          x1="180"
          y1="700"
          x2="1320"
          y2="700"
          stroke="rgba(61,220,132,0.04)"
          strokeWidth="0.75"
          strokeDasharray="2 14"
        />
      </svg>
      </div>

      <div className="site-backdrop-grid mx-auto h-full max-w-[90rem] px-[clamp(1.25rem,4vw,3rem)]">
        <div className="site-backdrop-layer" style={{ transform: parallax.horizons }}>
          <div className="site-backdrop-horizons" />
        </div>
        <div className="grid h-full grid-cols-12 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="site-backdrop-col border-r border-border first:border-l"
            />
          ))}
        </div>
      </div>

      <div className="site-backdrop-origin" />
    </div>
  );
}
