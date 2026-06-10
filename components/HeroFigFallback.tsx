"use client";

import { useEffect, useRef, useState } from "react";

type HeroFigFallbackProps = {
  loading?: boolean;
};

export function HeroFigFallback({ loading = false }: HeroFigFallbackProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!fine || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setOffset({ x: nx * 10, y: ny * 8 });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className={`fig-fallback relative h-[min(28vw,24rem)] w-full ${
        loading ? "animate-pulse opacity-40" : ""
      }`}
      aria-hidden="true"
    >
      <svg
        ref={ref}
        viewBox="0 0 400 400"
        className="fig-diagram h-full w-full"
        fill="none"
      >
        <g
          stroke="#3ddc84"
          strokeWidth="0.75"
          strokeOpacity="0.65"
          style={{
            transform: `translate(${offset.x + 200}px, ${offset.y + 200}px)`,
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <g className="fig-fallback-mesh" transform="translate(-200, -200)">
            {/* Trefoil knot - 2D projection of the WebGL torus knot */}
            <polygon
              points="200,162 248,171 285,195 303,227 299,257 275,276 238,276 199,256 167,219 151,173 153,129 172,97 200,86 228,97 247,129 249,173 233,219 201,256 162,276 125,276 101,257 97,227 115,195 152,171"
              strokeOpacity="0.7"
            />
            <polygon
              points="200,162 248,171 285,195 303,227 299,257 275,276 238,276 199,256 167,219 151,173 153,129 172,97 200,86 228,97 247,129 249,173 233,219 201,256 162,276 125,276 101,257 97,227 115,195 152,171"
              strokeOpacity="0.25"
              transform="translate(200, 200) scale(0.8) translate(-200, -200)"
            />
            {/* Counter-rotating core */}
            <polygon
              points="200,168 228,184 228,216 200,232 172,216 172,184"
              strokeOpacity="0.55"
            />
            <line x1="200" y1="168" x2="200" y2="232" strokeOpacity="0.3" />
            <line x1="172" y1="184" x2="228" y2="216" strokeOpacity="0.3" />
            <line x1="228" y1="184" x2="172" y2="216" strokeOpacity="0.3" />
          </g>

          {/* Gyroscope rings */}
          <g transform="translate(-200, -200)">
            <ellipse
              cx="200"
              cy="200"
              rx="148"
              ry="46"
              strokeOpacity="0.3"
              strokeDasharray="8 6"
              transform="rotate(-18 200 200)"
            />
            <ellipse
              cx="200"
              cy="200"
              rx="128"
              ry="38"
              strokeOpacity="0.2"
              strokeDasharray="6 8"
              transform="rotate(32 200 200)"
            />
          </g>
        </g>

        <circle
          cx="200"
          cy="200"
          r="2.5"
          fill="#3ddc84"
          fillOpacity="0.7"
          stroke="none"
        />
      </svg>
    </div>
  );
}
