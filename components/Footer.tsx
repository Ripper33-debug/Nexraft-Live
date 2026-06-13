import Link from "next/link";
import { BOOK_CALL_URL } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const seoLinks = [
  { label: "Case study", href: "/work/weatherhaven" },
  { label: "Squarespace migration", href: "/squarespace-migration" },
  { label: "Slow WordPress", href: "/wordpress-too-slow" },
  { label: "3D viewer", href: "/3d-product-viewer" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink" role="contentinfo">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-7 py-8 md:flex-row md:items-center md:justify-between">
        <Link href="/" className={`inline-flex items-center gap-2.5 ${focusRing}`}>
          <span
            aria-hidden="true"
            className="block h-[9px] w-[9px] bg-signal"
            style={{ boxShadow: "0 0 10px 0 rgba(158, 255, 91, 0.45)" }}
          />
          <span className="font-grotesk text-[15px] font-bold tracking-[0.04em] text-bone">
            NEXRAFT
          </span>
        </Link>

        <p className="font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
          Web / Hosting / 3D {"\u00b7"} Est. 2024
        </p>

        <a
          href={`mailto:barry@nexraft.com`}
          className={`font-jetbrains text-[11px] uppercase tracking-[0.2em] text-mute transition-colors duration-300 hover:text-bone ${focusRing}`}
        >
          barry@nexraft.com {"\u2197"}
        </a>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-line px-7 py-5">
        {seoLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/pay"
          className={`font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
        >
          Billing
        </Link>
        <a
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-auto font-jetbrains text-[10px] uppercase tracking-[0.18em] text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
        >
          Book a call
        </a>
      </div>
    </footer>
  );
}
