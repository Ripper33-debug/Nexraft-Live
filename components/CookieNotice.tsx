"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nexraft-analytics-ack";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore storage failures
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Analytics notice"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-line bg-ink2/95 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-[1180px] flex-col gap-3 px-7 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-mute">
          We use privacy-friendly analytics and Instantly Website Visitors to
          identify U.S. business visitors so we can follow up on relevant inbound
          interest.{" "}
          <a
            href="/legal/privacy"
            className={`text-bone underline decoration-line underline-offset-2 hover:text-signal ${focusRing}`}
          >
            Privacy policy
          </a>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className={`shrink-0 self-start border border-line px-4 py-2 font-jetbrains text-[11px] uppercase tracking-[0.14em] text-bone transition-colors duration-300 hover:border-mute sm:self-auto ${focusRing}`}
        >
          Got it
        </button>
      </div>
    </div>
  );
}
