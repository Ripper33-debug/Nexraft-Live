"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BOOK_CALL_URL } from "@/lib/site";

const STATS = [
  { value: "99.9%", label: "UPTIME ON OUR STACKS" },
  { value: "Days", label: "NOT QUARTER-LONG HOLDS" },
  { value: "12+ PROJECTS", label: "SINCE 2024" },
  { value: "Weatherhaven \u00b7 Outfyre", label: "SELECTED DELIVERY" },
] as const;

// Static perspective grid used while the R3F chunk loads, under reduced
// motion, and on small / coarse-pointer devices. No animation loop.
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
          <radialGradient id="hm-fallback-glow" cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#E8EDE9" stopOpacity="0.08" />
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
              strokeOpacity="0.3"
            />
          ))}
          {FALLBACK_HORIZONTALS.map((y, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={y}
              x2="1200"
              y2={y}
              strokeOpacity={(0.18 + (i / 15) * 0.34).toFixed(3)}
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

function statCellBorders(i: number): string {
  const classes: string[] = [];
  if (i % 2 === 1) classes.push("border-l border-line");
  if (i > 0) classes.push("md:border-l md:border-line");
  if (i >= 2) classes.push("border-t border-line md:border-t-0");
  return classes.join(" ");
}

export function Hero() {
  const [mode, setMode] = useState<"static" | "mesh">("static");

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const smallOrCoarse = window.matchMedia(
      "(max-width: 767px), (pointer: coarse)",
    ).matches;
    if (!reduced && !smallOrCoarse) setMode("mesh");
  }, []);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative -mt-[68px] flex min-h-[100svh] flex-col overflow-hidden border-b border-line bg-ink pt-[68px]"
    >
      <div className="absolute inset-0 z-0">
        {mode === "mesh" ? <HeroMesh /> : <HeroMeshFallback />}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 78% 62% at 50% 42%, transparent 0%, transparent 52%, #0A0E0C 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/3"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(10,14,12,0.55) 55%, #0A0E0C 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-7 top-[88px] z-10 hidden font-jetbrains text-[11px] tracking-[0.18em] text-faint md:block"
      >
        GRID_REF A1 / ORIGIN 0,0 / RENDER{" "}
        <span className="text-signal-dim">live</span>
      </div>

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-[1180px] flex-1 flex-col px-7 py-8">
        <div className="flex flex-1 flex-col justify-center">
          <p className="hm-fade flex items-center gap-2.5 font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
            <span
              className="h-1.5 w-1.5 bg-signal motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <span>
              Engineering studio <span className="text-mute">{"\u00b7"}</span>{" "}
              Est. 2024
            </span>
          </p>

          <h1
            id="hero-heading"
            className="mt-6 font-grotesk font-bold tracking-[-0.03em] text-bone"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)", lineHeight: 1.02 }}
          >
            <span className="hm-rise-mask">
              <span className="hm-rise hm-rise-1 block">Built like</span>
            </span>
            <span className="hm-rise-mask">
              <span className="hm-rise hm-rise-2 block text-signal">
                infrastructure.
              </span>
            </span>
          </h1>

          <p
            className="hm-fade mt-7 max-w-[60ch] text-mute"
            style={{
              animationDelay: "0.12s",
              fontSize: "clamp(1rem, 1.4vw, 1.1875rem)",
              lineHeight: 1.6,
            }}
          >
            We <strong className="font-semibold text-bone">build</strong> your
            website, <strong className="font-semibold text-bone">run</strong>{" "}
            the servers under it, and{" "}
            <strong className="font-semibold text-bone">make</strong> the 3D.
            One studio, one invoice, work you can click before you pay.
          </p>

          <div
            className="hm-fade pointer-events-auto mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.2s" }}
          >
            <MagneticButton href={BOOK_CALL_URL}>
              Book a call -&gt;
            </MagneticButton>
            <a
              href="#do"
              className="pointer-events-auto inline-flex items-center justify-center border border-line px-5 py-3 font-jetbrains text-[12px] uppercase tracking-[0.2em] text-bone transition-colors duration-300 hover:border-mute focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              See what we do
            </a>
          </div>
        </div>

        <dl
          className="hm-fade mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4"
          style={{ animationDelay: "0.28s" }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`px-1 py-4 md:px-5 ${statCellBorders(i)}`}
            >
              <dt className="font-jetbrains text-[13px] text-bone md:text-[15px]">
                {stat.value}
              </dt>
              <dd className="mt-1 font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
