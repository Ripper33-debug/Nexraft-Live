"use client";

function getEmbedUrl(): string | null {
  const base = process.env.NEXT_PUBLIC_BOOKING_URL?.trim();
  if (!base) return null;
  const url = new URL(base);
  url.searchParams.set("embed", "true");
  url.searchParams.set("theme", "dark");
  return url.toString();
}

export function CalEmbed() {
  const src = getEmbedUrl();

  if (!src) {
    return (
      <p className="font-mono text-xs text-muted" role="status">
        Booking calendar loads when NEXT_PUBLIC_BOOKING_URL is configured.
      </p>
    );
  }

  return (
    <div className="cal-embed mt-6 overflow-hidden border border-border bg-surface">
      <iframe
        title="Book a discovery call with Nexraft"
        src={src}
        className="h-[min(520px,70vh)] w-full border-0"
        loading="lazy"
      />
    </div>
  );
}
