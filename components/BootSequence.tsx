"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BOOT_KEY, completeBoot } from "@/lib/boot";

const BOOT_MS = 1300;
const MODULES = "Web \u00b7 Hosting \u00b7 3D";

export function BootSequence() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"init" | "wipe">("init");

  const finish = useCallback((choreo = false) => {
    completeBoot(choreo);
    setVisible(false);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      finish(false);
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      finish(false);
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      seen = true;
    }

    if (seen || !document.documentElement.classList.contains("boot-pending")) {
      finish(false);
      return;
    }

    setVisible(true);

    const wipeTimer = window.setTimeout(() => setPhase("wipe"), 820);
    const doneTimer = window.setTimeout(() => finish(true), BOOT_MS);

    const skip = () => {
      window.clearTimeout(wipeTimer);
      window.clearTimeout(doneTimer);
      finish(true);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") skip();
    };

    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });
    window.addEventListener("touchstart", skip, { once: true, passive: true });

    return () => {
      window.clearTimeout(wipeTimer);
      window.clearTimeout(doneTimer);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [finish, pathname]);

  if (!visible) return null;

  return (
    <div
      className={`boot-overlay ${phase === "wipe" ? "is-wipe" : ""}`}
      onClick={() => finish(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") finish(true);
      }}
      role="presentation"
      aria-hidden="true"
    >
      <div className="boot-scanline" />
      <div className="boot-progress-track">
        <div className="boot-progress-bar" />
      </div>

      <div className="boot-panel">
        <p className="boot-label">Initializing</p>
        <p className="boot-modules">{MODULES}</p>

        <svg
          viewBox="0 0 120 120"
          className="boot-fig"
          fill="none"
          aria-hidden="true"
        >
          <g stroke="#3ddc84" strokeWidth="0.75" strokeLinecap="square">
            <polygon
              points="60,18 95,42 82,82 38,82 25,42"
              className="boot-fig-stroke"
            />
            <polygon
              points="60,102 95,78 82,38 38,38 25,78"
              className="boot-fig-stroke boot-fig-stroke-2"
            />
            <line
              x1="60"
              y1="18"
              x2="60"
              y2="102"
              className="boot-fig-stroke boot-fig-stroke-3"
            />
            <line
              x1="25"
              y1="42"
              x2="95"
              y2="78"
              className="boot-fig-stroke boot-fig-stroke-4"
            />
            <line
              x1="95"
              y1="42"
              x2="25"
              y2="78"
              className="boot-fig-stroke boot-fig-stroke-5"
            />
          </g>
          <circle
            cx="60"
            cy="60"
            r="2.5"
            fill="#3ddc84"
            className="boot-fig-core"
          />
        </svg>

        <p className="boot-fig-tag">FIG.01</p>
      </div>
    </div>
  );
}
