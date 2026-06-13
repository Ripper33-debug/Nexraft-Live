import Image from "next/image";
import Link from "next/link";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 208;

type LogoProps = {
  height?: number;
  href?: string | null;
  priority?: boolean;
  linkClassName?: string;
};

export function Logo({
  height = 26,
  href = "/",
  priority = false,
  linkClassName = "",
}: LogoProps) {
  const displayWidth = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);
  const intrinsicHeight = height * 2;
  const intrinsicWidth = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * intrinsicHeight);

  const image = (
    <Image
      src="/nexraft-logo-header.png"
      alt="Nexraft"
      width={intrinsicWidth}
      height={intrinsicHeight}
      sizes={`${displayWidth}px`}
      priority={priority}
      className="block max-w-full"
      style={{ height, width: "auto", maxHeight: height }}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`inline-flex shrink-0 items-center bg-transparent ${linkClassName}`.trim()}
        aria-label="Nexraft home"
      >
        {image}
      </Link>
    );
  }

  return (
    <span
      className={`inline-flex shrink-0 items-center bg-transparent ${linkClassName}`.trim()}
    >
      {image}
    </span>
  );
}
