import Link from "next/link";
import { MagneticLink } from "@/components/MagneticLink";
import { CONTACT_EMAILS } from "@/lib/site";

type ContactEmailsProps = {
  className?: string;
  stacked?: boolean;
};

export function ContactEmails({
  className = "",
  stacked = false,
}: ContactEmailsProps) {
  if (stacked) {
    return (
      <div className={`space-y-3 ${className}`}>
        {CONTACT_EMAILS.map((email) => (
          <MagneticLink
            key={email}
            href={`mailto:${email}`}
            className="link-underline block font-display text-[clamp(1.15rem,2.5vw,1.5rem)] font-medium leading-tight text-foreground"
          >
            {email}
          </MagneticLink>
        ))}
      </div>
    );
  }

  return (
    <p className={`font-mono text-xs uppercase tracking-widest text-muted ${className}`}>
      {CONTACT_EMAILS.map((email, i) => (
        <span key={email}>
          {i > 0 && <span className="text-muted/50"> / </span>}
          <Link
            href={`mailto:${email}`}
            className="link-underline text-muted hover:text-foreground"
          >
            {email}
          </Link>
        </span>
      ))}
    </p>
  );
}
