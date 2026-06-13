"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

const VANISH_X = 600;
const VANISH_Y = 320;
const FLOOR_Y = 800;

const FALLBACK_VERTICALS: number[] = [];
for (let x = -600; x <= 1800; x += 90) {
  FALLBACK_VERTICALS.push(x);
}

const FALLBACK_HORIZONTALS: number[] = [];
for (let i = 0; i <= 15; i++) {
  FALLBACK_HORIZONTALS.push(VANISH_Y + (FLOOR_Y - VANISH_Y) * (i / 15) ** 2.2);
}

function HeroMeshFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id="hm-fallback-glow" cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#E8EDE9" stopOpacity="0.14" />
            <stop offset="55%" stopColor="#E8EDE9" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#E8EDE9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#hm-fallback-glow)" />
        <g stroke="#E8EDE9" strokeWidth="1">
          {FALLBACK_VERTICALS.map((x) => (
            <line
              key={`v${x}`}
              x1={x}
              y1={FLOOR_Y}
              x2={VANISH_X}
              y2={VANISH_Y}
              strokeOpacity="0.55"
            />
          ))}
          {FALLBACK_HORIZONTALS.map((y, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={y}
              x2="1200"
              y2={y}
              strokeOpacity={(0.35 + (i / 15) * 0.45).toFixed(3)}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}

const HeroMesh = dynamic(() => import("@/components/HeroMesh"), {
  ssr: false,
  loading: () => <HeroMeshFallback />,
});

export function Hero() {
  const [mode, setMode] = useState<"static" | "mesh">("static");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    if (!reduced && !narrow) setMode("mesh");
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden border-b border-line bg-ink pt-[68px]"
    >
      <div className="absolute inset-0 z-0">
        <HeroMeshFallback />
        {mode === "mesh" ? (
          <div className="absolute inset-0">
            <HeroMesh />
          </div>
        ) : null}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 130% 95% at 50% 42%, transparent 45%, rgba(10,14,12,0.35) 78%, rgba(10,14,12,0.72) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,14,12,0.65) 100%)",
        }}
      />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-7 py-16 md:py-20">
        <p className="hm-fade text-sm text-mute">Est. 2024</p>

        <h1
          id="hero-heading"
          className="hm-fade mt-4 max-w-[14ch] font-display font-semibold tracking-[-0.03em] text-bone"
          style={{
            animationDelay: "0.06s",
            fontSize: "clamp(2.75rem, 7.5vw, 5.25rem)",
            lineHeight: 1.05,
          }}
        >
          Built like infrastructure.
        </h1>

        <p
          className="hm-fade mt-6 max-w-[52ch] text-base leading-relaxed text-mute md:text-lg"
          style={{ animationDelay: "0.12s" }}
        >
          We build your website, run the servers under it, and make the 3D.
          One studio, one invoice.
        </p>

        <div
          className="hm-fade pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          style={{ animationDelay: "0.18s" }}
        >
          <MagneticButton href={BOOK_CALL_URL}>Book a call</MagneticButton>
          <a
            href="#work"
            className="pointer-events-auto text-sm text-mute underline decoration-line underline-offset-4 transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            See our work
          </a>
        </div>

        <p
          className="hm-fade mt-12 max-w-xl text-sm text-faint"
          style={{ animationDelay: "0.24s" }}
        >
          99.9% uptime on stacks we operate. Weatherhaven, Outfyre, and 12+
          projects since 2024.
        </p>
      </div>
    </section>
  );
}
