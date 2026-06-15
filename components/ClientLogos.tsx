import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";
import { SpecLabel } from "@/components/ui/SpecLabel";

const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function ClientLogos() {
  return (
    <section
      aria-label="Companies we have built for"
      className="border-t border-line bg-ink py-12 md:py-14"
    >
      <div className="mx-auto max-w-[1180px] px-7">
        <SpecLabel>Companies we build for</SpecLabel>
      </div>

      <div className="logo-marquee-mask mt-8 overflow-hidden">
        <ul className="logo-marquee flex w-max items-center">
          {TRACK.map((client, index) => {
            const isPrimary = index < CLIENT_LOGOS.length;
            const logo = (
              <Image
                src={client.src}
                alt=""
                width={client.width}
                height={client.height}
                className="h-7 w-auto opacity-55 transition-opacity duration-300 group-hover:opacity-100 md:h-8"
                sizes="200px"
              />
            );

            return (
              <li
                key={`${client.id}-${index}`}
                aria-hidden={!isPrimary}
                className="shrink-0 pr-14 md:pr-20"
              >
                {isPrimary ? (
                  <a
                    href={client.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${client.name} (opens in new tab)`}
                    className={`group inline-flex ${focusRing}`}
                  >
                    {logo}
                  </a>
                ) : (
                  logo
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
