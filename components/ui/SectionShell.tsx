import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
  /** Full-width inner container (no max-width/padding) */
  wide?: boolean;
};

export function SectionShell({
  id,
  ariaLabelledBy,
  children,
  className = "",
  wide = false,
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`scroll-mt-[68px] border-t border-line bg-ink py-[84px] md:py-[120px] ${className}`.trim()}
    >
      <div
        className={
          wide ? "w-full" : "mx-auto max-w-[1180px] px-7"
        }
      >
        {children}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  titleId?: string;
  subtitle?: string;
};

export function SectionHeader({ title, titleId, subtitle }: SectionHeaderProps) {
  return (
    <div className="max-w-2xl">
      <h2
        id={titleId}
        className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone"
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-mute">{subtitle}</p>
      ) : null}
    </div>
  );
}
