import type { ReactNode } from "react";

type SpecLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SpecLabel({ children, className = "" }: SpecLabelProps) {
  return (
    <p
      className={`font-jetbrains text-[11px] uppercase tracking-[0.2em] text-signal-dim ${className}`.trim()}
    >
      {children}
    </p>
  );
}
