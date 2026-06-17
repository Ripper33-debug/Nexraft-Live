import type { Metadata } from "next";
import { PrimaryButton, GhostButton } from "@/components/ui/PrimaryButton";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto flex min-h-[62vh] max-w-[1180px] flex-col justify-center px-7 py-[84px] md:py-[120px]">
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          Error 404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-bone">
          Page not found.
        </h1>
        <p className="mt-5 max-w-md text-base leading-relaxed text-mute">
          That route does not exist or has moved. Check the address, or head back
          to the homepage.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryButton href="/" external={false}>
            Back to home
          </PrimaryButton>
          <GhostButton href="/#pricing">View pricing</GhostButton>
        </div>
      </div>
    </section>
  );
}
