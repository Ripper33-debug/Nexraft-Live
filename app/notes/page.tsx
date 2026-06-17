import type { Metadata } from "next";
import Link from "next/link";
import { allNotes, formatNoteDate } from "@/lib/notes";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

export const metadata: Metadata = {
  title: "Field notes",
  description:
    "Practical notes on migrations, managed edge hosting, performance, and 3D from the people who build and run the stack.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/notes" },
};

export default function NotesPage() {
  const notes = allNotes();

  return (
    <section className="border-t border-line bg-ink py-[84px] md:py-[120px]">
      <div className="mx-auto max-w-[1180px] px-7">
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          FIELD NOTES
        </p>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-bone">
          Field notes
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-mute">
          Practical notes on migrations, managed edge hosting, performance, and
          3D. Written by the people who build and run the stack.
        </p>

        <ul className="mt-12 border-t border-line">
          {notes.map((note) => (
            <li key={note.slug} className="border-b border-line">
              <Link
                href={`/notes/${note.slug}`}
                className={`group block py-7 ${focusRing}`}
              >
                <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint">
                  {formatNoteDate(note.date)} {"\u00b7"} {note.readingMinutes} min
                  read
                </p>
                <h2 className="mt-2 font-display text-xl font-semibold leading-snug tracking-[-0.02em] text-bone transition-colors duration-300 group-hover:text-signal">
                  {note.title}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mute md:text-base">
                  {note.description}
                </p>
                <span className="mt-3 inline-block font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
                  Read {"\u2192"}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 border-t border-line pt-8">
          <Link
            href="/"
            className={`text-sm text-soft transition-colors duration-300 hover:text-bone ${focusRing}`}
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
