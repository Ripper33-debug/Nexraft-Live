"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/lib/use-in-view";

const DEPLOY_LINES = [
  { text: "> git push origin main", delay: 0 },
  { text: "  edge cache warm .......... OK", delay: 400 },
  { text: "  ssl verify ............... OK", delay: 800 },
  { text: "  dns propagate ............ OK", delay: 1200 },
  { text: "  uptime check ............. 200", delay: 1600 },
  { text: "  monitoring armed ......... OK", delay: 2000 },
  { text: "  deploy complete", delay: 2400 },
] as const;

export function DeployTerminal() {
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: "0px 0px -15% 0px" });
  const [visibleCount, setVisibleCount] = useState(0);
  const played = useRef(false);

  useEffect(() => {
    if (!inView || played.current) return;
    played.current = true;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setVisibleCount(DEPLOY_LINES.length);
      return;
    }

    const timers = DEPLOY_LINES.map((line, index) =>
      window.setTimeout(() => setVisibleCount(index + 1), line.delay),
    );

    return () => timers.forEach(clearTimeout);
  }, [inView]);

  useEffect(() => {
    if (!inView) {
      played.current = false;
      setVisibleCount(0);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="deploy-terminal mt-12 border border-line bg-ink2"
      aria-label="Example production deploy log"
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3 md:px-5">
        <p className="font-jetbrains text-[10px] uppercase leading-none tracking-[0.14em] text-faint">
          DEPLOY_LOG // production
        </p>
        <span className="flex items-center gap-2 font-jetbrains text-[10px] uppercase tracking-[0.14em] text-signal-dim">
          <span className="h-1.5 w-1.5 bg-signal" aria-hidden="true" />
          Live
        </span>
      </div>
      <pre className="overflow-x-auto p-4 font-jetbrains text-[11px] leading-relaxed text-mute md:p-5 md:text-xs">
        {DEPLOY_LINES.slice(0, visibleCount).map((line, index) => (
          <span
            key={line.text}
            className={`deploy-line block ${index === visibleCount - 1 ? "deploy-line-active" : ""}`}
          >
            {line.text}
          </span>
        ))}
        {visibleCount < DEPLOY_LINES.length ? (
          <span className="deploy-cursor" aria-hidden="true">
            _
          </span>
        ) : null}
      </pre>
    </div>
  );
}
