import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { PRICES, formatUsd } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "3D Product Viewer for Your Website",
  description:
    "Add an interactive 3D product viewer to your website. Browser-native WebGL, no app download. Optimized GLTF pipeline from CAD or Blender. From $800/mo.",
  openGraph: {
    title: "A 3D product viewer for your website",
    description:
      "Browser-native WebGL product visualization. Spin, zoom, configure. No app download.",
  },
};

const pipeline = [
  {
    index: "01",
    title: "Source",
    detail:
      "We start from your CAD files, Blender scenes, or photos. No 3D assets yet? We model them.",
  },
  {
    index: "02",
    title: "Optimize",
    detail:
      "Meshes decimated and compressed with Draco. Textures baked and sized for the web. Models load in under a second.",
  },
  {
    index: "03",
    title: "Embed",
    detail:
      "A WebGL viewer embedded directly in your product pages. Spin, zoom, explode views, configurators. Works on phones.",
  },
  {
    index: "04",
    title: "Operate",
    detail:
      "Viewer performance and loading monitored under retainer. New SKUs added as your catalog grows.",
  },
] as const;

const useCases = [
  {
    index: "01",
    title: "Product pages",
    detail: "Let buyers inspect the product before they commit. Fewer returns, longer sessions.",
  },
  {
    index: "02",
    title: "Configurators",
    detail: "Colors, materials, options, all rendered live in the browser.",
  },
  {
    index: "03",
    title: "Technical sales",
    detail: "Exploded views and cutaways that flat photography cannot show.",
  },
] as const;

export default function ThreeDProductViewerPage() {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <div className="">
          <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
            3D / Product viewer
          </p>
        </div>

        <div className="">
          <h1 className="font-grotesk text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
            A 3D product viewer for your website.
          </h1>

          <p className="prose-measure mt-6 text-sm text-mute">
            Browser-native WebGL. No app download, no plugin, no third-party
            iframe. Your customers spin, zoom, and configure the product
            directly on the page. There is a live one running on{" "}
            <Link
              href="/#home"
              className="link-underline text-bone"
              data-cursor-hover
            >
              our homepage
            </Link>{" "}
            right now.
          </p>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              The pipeline
            </p>
            <div className="mt-4 border-t border-line">
              {pipeline.map((row) => (
                <div
                  key={row.index}
                  className="grid grid-cols-12 gap-4 border-b border-line py-5 md:gap-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-jetbrains text-xs tabular-nums text-mute">
                      {row.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h2 className="font-display text-base font-semibold text-bone">
                      {row.title}
                    </h2>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-8 md:col-start-auto">
                    <p className="font-jetbrains text-xs leading-relaxed text-mute">
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.15em] text-mute">
              Blender {"\u00b7"} GLTF {"\u00b7"} Draco {"\u00b7"} Three.js{" "}
              {"\u00b7"} React Three Fiber
            </p>
          </div>

          <div className="mt-10 border-t border-line pt-8">
            <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
              Where it earns
            </p>
            <div className="mt-4 border-t border-line">
              {useCases.map((row) => (
                <div
                  key={row.index}
                  className="grid grid-cols-12 gap-4 border-b border-line py-5 md:gap-6"
                >
                  <div className="col-span-2 md:col-span-1">
                    <span className="font-jetbrains text-xs tabular-nums text-mute">
                      {row.index}
                    </span>
                  </div>
                  <div className="col-span-10 md:col-span-3">
                    <h2 className="font-display text-base font-semibold text-bone">
                      {row.title}
                    </h2>
                  </div>
                  <div className="col-span-10 col-start-3 md:col-span-8 md:col-start-auto">
                    <p className="font-jetbrains text-xs leading-relaxed text-mute">
                      {row.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-line bg-accent/[0.04] p-4 md:p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mute">
              3D retainers
            </p>
            <p className="mt-3 font-display text-2xl font-bold tracking-tight text-bone md:text-3xl">
              From {formatUsd(PRICES.threeD.asset)}/mo
            </p>
            <p className="mt-2 max-w-lg font-jetbrains text-xs leading-relaxed text-mute">
              Asset production from {formatUsd(PRICES.threeD.asset)}/mo, full
              interactive scenes from {formatUsd(PRICES.threeD.scene)}/mo.
              One-off viewers are quoted fixed on a discovery call.
            </p>
            <div className="mt-5">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </div>

          <div className="mt-8 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
            <div>
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                See it live
              </p>
              <Link
                href="/#home"
                className="link-underline mt-3 inline-block font-jetbrains text-xs uppercase tracking-[0.2em] text-bone"
                data-cursor-hover
              >
                FIG.01 on our homepage
              </Link>
            </div>
            <div>
              <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
                Direct line
              </p>
              <div className="mt-3">
                <ContactEmails stacked />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
