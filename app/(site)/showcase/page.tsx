import type { Metadata } from "next";
import Link from "next/link";
import { BookCallButton } from "@/components/BookCallButton";
import { ContactEmails } from "@/components/ContactEmails";

export const metadata: Metadata = {
  title: "Concept Builds — The Showcase",
  description:
    "Studio concept builds from Nexraft. Fictional brands, production code. Restaurant, SaaS, luxury real estate, and law — see the level of finish we ship.",
  openGraph: {
    title: "Concept builds — Nexraft showcase",
    description:
      "Fictional brands, production code. See the level of finish we ship.",
  },
};

type Demo = {
  vertical: string;
  brand: string;
  blurb: string;
  href: string;
  stack: string[];
  /** screenshot of the live demo */
  shot: string;
  /** fallback gradient behind the image while it loads */
  thumb: string;
  accent: string;
};

const DEMOS: Demo[] = [
  {
    vertical: "Restaurant — Hospitality",
    brand: "Ember & Oak",
    blurb:
      "A wood-fired dining room with a seven-course tasting menu, private cellar bookings, and a reservation flow. Warm grain textures, flame-glow hero, editorial serif.",
    href: "/demos/ember-oak.html",
    stack: ["Ember particles", "Editorial serif", "Reservations"],
    shot: "/img/shots/ember-oak.jpg",
    thumb:
      "linear-gradient(135deg, #131110 0%, #1d1713 45%, #2a1a10 70%, #3a2312 100%)",
    accent: "#c8963e",
  },
  {
    vertical: "SaaS — Product",
    brand: "Loopline",
    blurb:
      "A changelog-automation product with a live dashboard mockup, animated metrics, feature grid, and three-tier pricing. Dark violet, glassy, startup-fast.",
    href: "/demos/loopline.html",
    stack: ["3D tilt dashboard", "Bento grid", "Live typing"],
    shot: "/img/shots/loopline.jpg",
    thumb:
      "linear-gradient(135deg, #07070d 0%, #12102a 50%, #1d1440 80%, #241a52 100%)",
    accent: "#7c5cff",
  },
  {
    vertical: "Real Estate — Luxury",
    brand: "Meridian Estates",
    blurb:
      "A boutique brokerage with a sunset-skyline hero, four featured listings, and a private-client approach. Ivory and gold, Cormorant Garamond, quiet money.",
    href: "/demos/meridian.html",
    stack: ["Generative sunset", "Drawn elevations", "Listings"],
    shot: "/img/shots/meridian.jpg",
    thumb:
      "linear-gradient(135deg, #f4f1ea 0%, #e8ddc9 40%, #d9b98a 75%, #b98a52 100%)",
    accent: "#9a7b3f",
  },
  {
    vertical: "Law — Professional Services",
    brand: "Ashford & Vale LLP",
    blurb:
      "A litigation firm with partner profiles, practice areas, illustrative results, and a consultation intake. Navy, parchment, oxblood — built to feel forty years old.",
    href: "/demos/ashford-vale.html",
    stack: ["Drawn crest", "Letterpress", "Intake form"],
    shot: "/img/shots/ashford-vale.jpg",
    thumb:
      "linear-gradient(135deg, #0e1b2c 0%, #14243a 55%, #2a2030 85%, #8a2f2b 130%)",
    accent: "#b08d4f",
  },
];

export default function ShowcasePage() {
  return (
    <>
      <section className="border-b border-line bg-ink pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className="font-mono text-[11px] uppercase tracking-widest text-signal">
            The showcase
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-[clamp(2.2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-bone">
            Concept builds. Fictional brands, production code.
          </h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-mute">
            These are studio pieces — invented companies we designed and built
            end to end to show the level of finish we ship. Every one is a
            real, working page: open it, scroll it, poke the forms. This is
            what a $20k agency build looks like. It is also what our 48hr
            build looks like.
          </p>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-6 px-7 md:grid-cols-2">
          {DEMOS.map((demo) => (
            <a
              key={demo.brand}
              href={demo.href}
              target="_blank"
              rel="noopener"
              className="group block border border-line bg-ink2 transition-colors hover:border-soft"
            >
              <div
                className="relative h-52 overflow-hidden md:h-64"
                style={{ background: demo.thumb }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={demo.shot}
                  alt={`${demo.brand} — live demo screenshot`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span
                  className="absolute bottom-3 right-3 border px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-bone"
                  style={{
                    background: "rgba(10,14,12,.75)",
                    borderColor: demo.accent,
                  }}
                >
                  Live demo ↗
                </span>
              </div>
              <div className="p-6">
                <p className="font-mono text-[10px] uppercase tracking-widest text-faint">
                  {demo.vertical}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-bone">
                  {demo.brand}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-mute">
                  {demo.blurb}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {demo.stack.map((tag) => (
                    <span
                      key={tag}
                      className="border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-[1180px] px-7">
          <p className="max-w-2xl text-xs leading-relaxed text-faint">
            Ember &amp; Oak, Loopline, Meridian Estates, and Ashford &amp; Vale
            are fictional brands created by Nexraft for demonstration. Every
            demo says so on the page. For work we shipped for real clients, see{" "}
            <Link
              href="/work/weatherhaven"
              className="text-soft underline decoration-line underline-offset-4 hover:text-bone"
            >
              the case studies
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-ink py-16 md:py-24">
        <div className="mx-auto max-w-[1180px] px-7">
          <p className="font-display text-3xl font-semibold tracking-tight text-bone">
            Want one of these, but for your business?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mute">
            Pick the one closest to your world, and we&apos;ll build yours to
            the same standard. First version in 48 hours.
          </p>
          <div className="mt-6">
            <BookCallButton label="Book a call" variant="primary" />
          </div>
        </div>
        <div className="mx-auto mt-14 grid max-w-[1180px] gap-8 border-t border-line px-7 pt-8 sm:grid-cols-2">
          <div>
            <p className="text-sm text-faint">Direct line</p>
            <div className="mt-2">
              <ContactEmails stacked />
            </div>
          </div>
          <div>
            <Link
              href="/"
              className="text-sm text-soft transition-colors hover:text-bone"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
