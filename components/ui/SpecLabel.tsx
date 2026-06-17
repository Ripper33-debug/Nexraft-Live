import type { ReactNode } from "react";

type SpecLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SpecLabel({ children, className = "" }: SpecLabelProps) {
  return (
    <p
      className={`font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim ${className}`.trim()}
    >
      {children}
    </p>
  );
}
