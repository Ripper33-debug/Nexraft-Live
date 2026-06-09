"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/Logo";
import { BOOT_KEY, completeBoot } from "@/lib/boot";

const LOADER_MS = 1600;
const WIPE_MS = 380;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

async function preloadAssets(): Promise<void> {
  const tasks: Promise<unknown>[] = [
    document.fonts?.ready ?? Promise.resolve(),
    new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    }),
  ];

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lg = window.matchMedia("(min-width: 1024px)").matches;

  if (lg && !reduced) {
    tasks.push(import("@/components/HeroFigR3F"));
  }

  await Promise.all(tasks);
}

export function BootSequence() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [phase, setPhase] = useState<"load" | "wipe">("load");
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  const finish = useCallback(() => {
    completeBoot(false);
    setVisible(false);
  }, []);

  const dismiss = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setProgress(100);
    setPhase("wipe");
    window.setTimeout(finish, WIPE_MS);
  }, [finish]);

  useEffect(() => {
    if (pathname !== "/") {
      finish();
      return;
    }

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      finish();
      return;
    }

    let seen = false;
    try {
      seen = sessionStorage.getItem(BOOT_KEY) === "1";
    } catch {
      seen = true;
    }

    if (seen || !document.documentElement.classList.contains("boot-pending")) {
      finish();
      return;
    }

    setVisible(true);

    let assetsReady = false;
    preloadAssets().then(() => {
      assetsReady = true;
    });

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const timeRatio = Math.min(1, elapsed / LOADER_MS);
      let next = easeOutCubic(timeRatio) * 100;

      if (!assetsReady && next > 88) {
        next = 88 + Math.sin(elapsed / 180) * 2;
      }

      if (assetsReady && timeRatio >= 1) {
        next = 100;
      } else {
        next = Math.min(next, assetsReady ? 100 : 92);
      }

      setProgress(Math.round(next));

      if (elapsed >= LOADER_MS && assetsReady) {
        setProgress(100);
        setPhase("wipe");
        window.setTimeout(finish, WIPE_MS);
        return;
      }

      if (elapsed >= LOADER_MS + 600) {
        setProgress(100);
        setPhase("wipe");
        window.setTimeout(finish, WIPE_MS);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " " || e.key === "Enter") dismiss();
    };

    window.addEventListener("keydown", onKey, { once: true });
    window.addEventListener("wheel", dismiss, { once: true, passive: true });
    window.addEventListener("touchstart", dismiss, { once: true, passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchstart", dismiss);
    };
  }, [dismiss, finish, pathname]);

  if (!visible) return null;

  return (
    <div
      className={`boot-overlay ${phase === "wipe" ? "is-wipe" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="boot-loader-title"
      aria-describedby="boot-loader-desc"
      onClick={dismiss}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") dismiss();
      }}
    >
      <button
        type="button"
        className="boot-skip sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:bg-surface-deep focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-accent"
        onClick={dismiss}
      >
        Skip loading
      </button>

      <div className="boot-scanline" aria-hidden="true" />
      <div className="boot-progress-track" aria-hidden="true">
        <div
          className="boot-progress-bar"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div
        className="boot-loader-panel"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Logo height={44} href={null} priority className="boot-loader-logo" />
        <p
          id="boot-loader-title"
          className="boot-loader-percent font-mono tabular-nums"
          aria-live="polite"
        >
          {String(progress).padStart(3, "0")}
        </p>
        <div
          className="boot-loader-track"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-labelledby="boot-loader-title boot-loader-desc"
        >
          <div
            className="boot-loader-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p id="boot-loader-desc" className="boot-label">
          Loading studio
        </p>
      </div>
    </div>
  );
}
