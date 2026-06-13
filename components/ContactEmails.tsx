import Link from "next/link";
import { CONTACT_EMAILS } from "@/lib/site";

type ContactEmailsProps = {
  className?: string;
  stacked?: boolean;
};

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export function ContactEmails({
  className = "",
  stacked = false,
}: ContactEmailsProps) {
  if (stacked) {
    return (
      <div className={`space-y-3 ${className}`}>
        {CONTACT_EMAILS.map((email) => (
          <Link
            key={email}
            href={`mailto:${email}`}
            className={`link-underline block font-grotesk text-lg font-medium text-bone ${focusRing}`}
          >
            {email}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <p
      className={`font-jetbrains text-xs uppercase tracking-widest text-mute ${className}`}
    >
      {CONTACT_EMAILS.map((email, i) => (
        <span key={email}>
          {i > 0 && <span className="text-faint"> / </span>}
          <Link
            href={`mailto:${email}`}
            className={`link-underline text-mute transition-colors hover:text-bone ${focusRing}`}
          >
            {email}
          </Link>
        </span>
      ))}
    </p>
  );
}
