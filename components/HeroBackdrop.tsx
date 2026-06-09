"use client";

import { useEffect, useState } from "react";

export function HeroBackdrop() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [motion, setMotion] = useState(true);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lg = window.matchMedia("(min-width: 1024px)").matches;

    setMotion(!reduced);

    if (!fine || reduced || !lg) return;

    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setOffset({ x: nx * 14, y: ny * 10 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="hero-backdrop pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-backdrop-horizon" />
      <div className="hero-backdrop-fade" />
      <div className="hero-backdrop-orb" />

      <svg
        viewBox="0 0 800 600"
        className={`hero-backdrop-mesh ${motion ? "is-animated" : ""}`}
        fill="none"
        style={{
          transform: `translate3d(${offset.x}px, calc(-48% + ${offset.y}px), 0)`,
        }}
      >
        <g className="hero-backdrop-mesh-spin">
          <circle
            cx="560"
            cy="280"
            r="180"
            stroke="rgba(61,220,132,0.08)"
            strokeWidth="0.75"
            className="hero-backdrop-ring"
          />
          <circle
            cx="560"
            cy="280"
            r="120"
            stroke="rgba(61,220,132,0.06)"
            strokeWidth="0.75"
            className="hero-backdrop-ring hero-backdrop-ring-delay"
          />
          <circle
            cx="560"
            cy="280"
            r="60"
            stroke="rgba(61,220,132,0.1)"
            strokeWidth="0.75"
            className="hero-backdrop-ring"
          />
          <ellipse
            cx="560"
            cy="280"
            rx="180"
            ry="62"
            stroke="rgba(61,220,132,0.05)"
            strokeWidth="0.75"
          />
          <ellipse
            cx="560"
            cy="280"
            rx="120"
            ry="42"
            stroke="rgba(61,220,132,0.05)"
            strokeWidth="0.75"
          />
        </g>

        <path
          d="M380 120 L560 160 L740 120 L620 280 L740 440 L560 400 L380 440 L500 280 Z"
          stroke="rgba(61,220,132,0.12)"
          strokeWidth="0.75"
          className="hero-backdrop-wire"
        />
        <path
          d="M500 280 L560 160 M620 280 L740 120 M500 280 L380 440 M620 280 L740 440"
          stroke="rgba(61,220,132,0.07)"
          strokeWidth="0.75"
          className="hero-backdrop-wire hero-backdrop-wire-slow"
        />
        <line
          x1="200"
          y1="480"
          x2="760"
          y2="480"
          stroke="rgba(61,220,132,0.08)"
          strokeWidth="0.75"
          strokeDasharray="4 8"
          className="hero-backdrop-wire"
        />
        <line
          x1="200"
          y1="520"
          x2="760"
          y2="520"
          stroke="rgba(61,220,132,0.05)"
          strokeWidth="0.75"
          strokeDasharray="2 10"
          className="hero-backdrop-wire hero-backdrop-wire-slow"
        />

        <text
          x="208"
          y="472"
          fill="rgba(199,210,203,0.2)"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          GRID_REF_A1
        </text>
        <text
          x="620"
          y="268"
          fill="rgba(199,210,203,0.18)"
          fontSize="9"
          fontFamily="var(--font-geist-mono)"
        >
          ORIGIN_0,0
        </text>
      </svg>

      <div className="hero-backdrop-stream" />
      <div className="hero-backdrop-stream hero-backdrop-stream-alt" />
    </div>
  );
}
