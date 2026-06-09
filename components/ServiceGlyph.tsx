type ServiceGlyphProps = {
  variant: "web" | "hosting" | "threeD";
};

export function ServiceGlyph({ variant }: ServiceGlyphProps) {
  return (
    <div className="service-glyph" aria-hidden="true">
      {variant === "web" && (
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          <rect
            x="8"
            y="10"
            width="32"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path
            d="M8 18h32M16 26h16M16 32h10"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      )}
      {variant === "hosting" && (
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          <rect x="10" y="28" width="6" height="10" fill="currentColor" opacity="0.35" />
          <rect x="21" y="22" width="6" height="16" fill="currentColor" opacity="0.55" />
          <rect x="32" y="16" width="6" height="22" fill="currentColor" opacity="0.85" />
          <path d="M8 38h32" stroke="currentColor" strokeWidth="1" />
        </svg>
      )}
      {variant === "threeD" && (
        <svg viewBox="0 0 48 48" className="h-12 w-12">
          <path
            d="M24 8 40 18v20L24 48 8 38V18z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
          <path d="M24 8v40M8 18l32 10M8 38l32-10" stroke="currentColor" strokeWidth="1" opacity="0.45" />
        </svg>
      )}
    </div>
  );
}
