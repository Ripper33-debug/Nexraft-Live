import Link from "next/link";
import { CLIENT_LOGOS } from "@/lib/clients";
import { SpecLabel } from "@/components/ui/SpecLabel";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function ClientLogos() {
  return (
    <section
      aria-label="Client work"
      className="border-t border-line bg-ink py-10 md:py-12"
    >
      <div className="mx-auto max-w-[1180px] px-7">
        <SpecLabel>Trusted delivery</SpecLabel>
        <ul className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
          {CLIENT_LOGOS.map((client) => (
            <li key={client.id}>
              {client.href ? (
                <Link
                  href={client.href}
                  className={`font-display text-lg font-semibold tracking-[-0.02em] text-faint transition-colors duration-300 hover:text-mute ${focusRing}`}
                >
                  {client.name}
                </Link>
              ) : (
                <span className="font-display text-lg font-semibold tracking-[-0.02em] text-faint">
                  {client.name}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
