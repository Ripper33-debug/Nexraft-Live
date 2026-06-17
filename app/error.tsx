"use client";

import { useEffect } from "react";
import { GhostButton } from "@/components/ui/PrimaryButton";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto flex min-h-[62vh] max-w-[1180px] flex-col justify-center px-7 py-[84px] md:py-[120px]">
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          Error 500
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-bone">
          Something broke on our end.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
          An unexpected error stopped this page from loading. Try again, or head
          back to the homepage. If it keeps happening, let us know.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className={`inline-flex items-center justify-center bg-signal px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim ${focusRing}`}
          >
            Try again
          </button>
          <GhostButton href="/">Back to home</GhostButton>
        </div>
      </div>
    </section>
  );
}
