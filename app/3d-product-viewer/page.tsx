import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { SubpageShell } from "@/components/SubpageShell";
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

export default function ThreeDProductViewerPage() {
  return (
    <>
      <SubpageShell
        title="A 3D product viewer for your website."
        intro={
          <p>
            Browser-native WebGL. No app download, no plugin, no third-party
            iframe. Your customers spin, zoom, and configure the product
            directly on the page. There is a live demo on{" "}
            <Link
              href="/#demo"
              className="text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              our homepage
            </Link>
            .
          </p>
        }
        sections={[
          {
            heading: "The pipeline",
            items: [
              {
                title: "Source",
                detail:
                  "We start from your CAD files, Blender scenes, or photos. No 3D assets yet? We model them.",
              },
              {
                title: "Optimize",
                detail:
                  "Meshes decimated and compressed with Draco. Textures baked and sized for the web. Models load in under a second.",
              },
              {
                title: "Embed",
                detail:
                  "A WebGL viewer embedded directly in your product pages. Spin, zoom, explode views, configurators. Works on phones.",
              },
              {
                title: "Operate",
                detail:
                  "Viewer performance and loading monitored under retainer. New SKUs added as your catalog grows.",
              },
            ],
          },
          {
            heading: "Where it earns",
            items: [
              {
                title: "Product pages",
                detail:
                  "Let buyers inspect the product before they commit. Fewer returns, longer sessions.",
              },
              {
                title: "Configurators",
                detail:
                  "Colors, materials, options, all rendered live in the browser.",
              },
              {
                title: "Technical sales",
                detail:
                  "Exploded views and cutaways that flat photography cannot show.",
              },
            ],
          },
        ]}
        cta={
          <>
            <p className="font-display text-2xl font-semibold text-bone">
              From {formatUsd(PRICES.threeD.asset)}/mo
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              Asset production from {formatUsd(PRICES.threeD.asset)}/mo, full
              interactive scenes from {formatUsd(PRICES.threeD.scene)}/mo.
              One-off viewers are quoted fixed on a discovery call.
            </p>
            <div className="mt-6">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </>
        }
        footerLink={null}
      />

      <section className="border-t border-line bg-ink pb-[84px] md:pb-[120px]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-7 sm:grid-cols-2">
          <div>
            <p className="text-sm text-faint">See it live</p>
            <Link
              href="/#demo"
              className="mt-2 inline-block text-sm text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              Homepage 3D demo
            </Link>
          </div>
          <div>
            <p className="text-sm text-faint">Direct line</p>
            <div className="mt-2">
              <ContactEmails stacked />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-[1180px] border-t border-line px-7 pt-8">
          <Link
            href="/"
            className="text-sm text-mute transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
