import Image from "next/image";
import Link from "next/link";

const LOGO_WIDTH = 1024;
const LOGO_HEIGHT = 208;

type LogoProps = {
  height?: number;
  href?: string | null;
  priority?: boolean;
  className?: string;
};

export function Logo({
  height = 28,
  href = "/",
  priority = false,
  className = "",
}: LogoProps) {
  const width = Math.round((LOGO_WIDTH / LOGO_HEIGHT) * height);

  const image = (
    <Image
      src="/nexraft-logo.png"
      alt="Nexraft"
      width={width}
      height={height}
      className={className}
      style={{ width, height }}
      priority={priority}
    />
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center"
        aria-label="Nexraft home"
        data-cursor-hover
      >
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0 items-center">{image}</span>;
}
