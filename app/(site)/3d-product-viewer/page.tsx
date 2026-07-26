import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";
import { ShoeConfigurator } from "@/components/ShoeConfigurator";
import { SubpageShell } from "@/components/SubpageShell";

export const metadata: Metadata = {
  title: "3D Product Viewer for Your Website",
  description:
    "Add an interactive 3D product viewer to your website. Browser-native WebGL, no app download. Optimized GLTF pipeline from CAD or Blender.",
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
            directly on the page. Try the live shoe configurator below —{" "}
            <Link
              href="#configurator"
              className="text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              try the colorways
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
            <p className="font-display text-3xl font-semibold tracking-tight text-bone">
              Fixed rate — quoted on your discovery call
            </p>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
              Asset production and full interactive scenes run on a monthly
              retainer. One-off viewers are quoted fixed on a discovery call.
            </p>
            <div className="mt-6">
              <BookCallButton label="Book a call" variant="primary" />
            </div>
          </>
        }
        footerLink={null}
      />

      <section
        id="configurator"
        className="border-t border-line bg-ink py-[84px] md:py-[120px]"
      >
        <div className="mx-auto max-w-[1180px] px-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
            Live demo
          </p>
          <h2 className="mt-3 font-display text-[clamp(1.5rem,3vw,2.25rem)] font-semibold tracking-[-0.02em] text-bone">
            Pick your colorway.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-mute">
            A real product model, running right here in your browser. Switch
            colorways, drag to inspect, zoom into the stitching. This is the
            same pipeline we ship for real product catalogs — swap the shoe
            for your SKU.
          </p>
          <div className="mt-8">
            <ShoeConfigurator />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink pb-[84px] md:pb-[120px] pt-[84px]">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-7 sm:grid-cols-2">
          <div>
            <p className="text-sm text-faint">See it live</p>
            <Link
              href="#configurator"
              className="mt-2 inline-block text-sm text-bone underline decoration-line underline-offset-4 hover:text-mute"
            >
              The shoe configurator above
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
            className="text-sm text-soft transition-colors hover:text-bone"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
}
