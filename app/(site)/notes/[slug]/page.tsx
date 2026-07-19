import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { BOOK_CALL_URL } from "@/lib/site";
import {
  allNotes,
  formatNoteDate,
  getNote,
  type NoteBlock,
} from "@/lib/notes";

const SITE = "https://www.nexraft.com";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return allNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  return {
    title: note.title,
    description: note.description,
    alternates: { canonical: `/notes/${note.slug}` },
    openGraph: {
      title: note.title,
      description: note.description,
      type: "article",
      url: `${SITE}/notes/${note.slug}`,
    },
  };
}

function Block({ block }: { block: NoteBlock }) {
  if (block.type === "h2") {
    return (
      <h2 className="mt-10 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone">
        {block.text}
      </h2>
    );
  }

  if (block.type === "ul") {
    return (
      <ul className="mt-4 space-y-2.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-relaxed text-mute md:text-base"
          >
            <span className="text-faint" aria-hidden="true">
              {"\u2013"}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <p className="mt-5 text-base leading-relaxed text-mute">{block.text}</p>
  );
}

export default async function NotePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    dateModified: note.date,
    author: { "@type": "Organization", name: "Nexraft", url: SITE },
    publisher: {
      "@type": "Organization",
      name: "Nexraft",
      logo: {
        "@type": "ImageObject",
        url: `${SITE}/nexraft-logo-header.png`,
      },
    },
    mainEntityOfPage: `${SITE}/notes/${note.slug}`,
  };

  return (
    <article className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-[760px] px-7">
        <Link
          href="/notes"
          className={`font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim transition-colors duration-300 hover:text-signal ${focusRing}`}
        >
          {"\u2190"} Field notes
        </Link>

        <h1 className="mt-6 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-bone">
          {note.title}
        </h1>
        <p className="mt-4 font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
          {formatNoteDate(note.date)} {"\u00b7"} {note.readingMinutes} min read
        </p>

        <div className="mt-8">
          {note.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <h2 className="font-display text-xl font-semibold text-bone">
            Thinking about a move like this?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            We start with a short audit and an honest answer on whether it pays
            off. No pressure, no lock-in.
          </p>
          <div className="mt-6">
            <PrimaryButton href={BOOK_CALL_URL}>Book a call</PrimaryButton>
          </div>
        </div>
      </div>
    </article>
  );
}
