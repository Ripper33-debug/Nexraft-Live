type FounderAvatarProps = {
  initials: string;
};

export function FounderAvatar({ initials }: FounderAvatarProps) {
  return (
    <div
      className="founder-avatar relative flex h-full w-full items-center justify-center"
      aria-hidden="true"
    >
      <svg viewBox="0 0 96 96" className="absolute inset-0 h-full w-full text-accent/25">
        <rect x="8" y="8" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.75" />
        <line x1="8" y1="32" x2="88" y2="32" stroke="currentColor" strokeWidth="0.5" opacity="0.6" />
        <line x1="48" y1="8" x2="48" y2="88" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      </svg>
      <svg viewBox="0 0 96 96" className="h-[70%] w-[70%] text-accent/70">
        <circle cx="48" cy="34" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
        <path
          d="M24 78c4-16 16-24 24-24s20 8 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <span className="absolute bottom-2 right-2 font-mono text-[8px] font-medium uppercase tracking-[0.12em] text-accent/90">
        {initials}
      </span>
    </div>
  );
}
