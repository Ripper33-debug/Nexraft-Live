import Link from "next/link";
import { Logo } from "@/components/Logo";
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
        <Logo height={24} linkClassName={focusRing} />

        <p className="text-sm text-faint">
          Web, hosting, and 3D {"\u00b7"} Est. 2024
        </p>

        <a
          href={`mailto:barry@nexraft.com`}
          className={`text-sm text-mute transition-colors duration-300 hover:text-bone ${focusRing}`}
        >
          barry@nexraft.com {"\u2197"}
        </a>
      </div>

      <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-3 border-t border-line px-7 py-5">
        {seoLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-xs text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/pay"
          className={`text-xs text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
        >
          Billing
        </Link>
        <a
          href={BOOK_CALL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-auto text-xs text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
        >
          Book a call
        </a>
      </div>
    </footer>
  );
}
