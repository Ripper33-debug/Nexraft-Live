import type { ReactNode } from "react";

type SectionShellProps = {
  id: string;
  ariaLabelledBy?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  ariaLabelledBy,
  children,
  className = "",
}: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`scroll-mt-[68px] border-t border-line bg-ink py-[84px] md:py-[120px] ${className}`.trim()}
    >
      <div className="mx-auto max-w-[1180px] px-7">{children}</div>
    </section>
  );
}

type SectionHeaderProps = {
  title: string;
  tag: string;
  titleId?: string;
};

export function SectionHeader({ title, tag, titleId }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <h2
        id={titleId}
        className="font-grotesk text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone"
      >
        {title}
      </h2>
      <p className="shrink-0 font-jetbrains text-[11px] uppercase tracking-[0.2em] text-faint">
        {tag}
      </p>
    </div>
  );
}
