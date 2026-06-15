import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/clients";
import { SpecLabel } from "@/components/ui/SpecLabel";

const TRACK = [...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS];

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
          {TRACK.map((client, index) => (
            <li
              key={`${client.id}-${index}`}
              aria-hidden={index >= CLIENT_LOGOS.length}
              className="shrink-0 pr-14 md:pr-20"
            >
              <Image
                src={client.src}
                alt={index < CLIENT_LOGOS.length ? client.name : ""}
                width={client.width}
                height={client.height}
                className="h-7 w-auto opacity-55 transition-opacity duration-300 hover:opacity-100 md:h-8"
                sizes="200px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
