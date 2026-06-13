import type { ReactNode } from "react";
import Link from "next/link";

export type ContentSection = {
  heading: string;
  items: { title: string; detail: string }[];
};

type SubpageShellProps = {
  title: string;
  intro: ReactNode;
  sections?: ContentSection[];
  cta?: ReactNode;
  footerLink?: { href: string; label: string } | null;
};

export function SubpageShell({
  title,
  intro,
  sections = [],
  cta,
  footerLink = { href: "/", label: "Back to home" },
}: SubpageShellProps) {
  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
          {title}
        </h1>

        <div className="prose-measure mt-6 text-base leading-relaxed text-mute">
          {intro}
        </div>

        {sections.map((section) => (
          <div key={section.heading} className="mt-12 border-t border-line pt-10">
            <h2 className="font-display text-xl font-semibold text-bone">
              {section.heading}
            </h2>
            <ul className="mt-6 space-y-6">
              {section.items.map((item) => (
                <li
                  key={item.title}
                  className="border-b border-line pb-6 last:border-b-0 last:pb-0"
                >
                  <h3 className="font-display text-base font-semibold text-bone">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-mute">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {cta ? <div className="mt-12 border border-line bg-ink2 p-6 md:p-8">{cta}</div> : null}

        {footerLink ? (
          <div className="mt-10 border-t border-line pt-8">
            <Link
              href={footerLink.href}
              className="text-sm text-mute transition-colors hover:text-bone"
            >
              {footerLink.label}
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
