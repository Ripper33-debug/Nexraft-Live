"use client";

import { useActionState } from "react";
import { submitContact, type ContactResult } from "@/app/actions/contact";
import { contactEmailLabel } from "@/lib/site";

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const fieldClass =
  "w-full border border-line bg-ink2 px-4 py-3 text-sm text-bone placeholder:text-faint transition-colors duration-300 focus:border-mute";

const labelClass =
  "font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-faint";

async function contactAction(
  _prev: ContactResult | null,
  formData: FormData,
): Promise<ContactResult> {
  return submitContact(formData);
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(contactAction, null);

  if (state?.ok) {
    return (
      <div
        className="border border-signal-dim/40 bg-signal/[0.06] p-6 text-left md:p-8"
        role="status"
      >
        <p className="font-jetbrains text-[11px] uppercase leading-none tracking-[0.14em] text-signal-dim">
          Brief received
        </p>
        <p className="mt-3 text-sm leading-relaxed text-mute">
          We will reply within one business day. Prefer a call? Use the book
          link above.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5 text-left">
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-company" className={labelClass}>
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          />
        </div>
        <div>
          <label htmlFor="contact-plan" className={labelClass}>
            Plan interest
          </label>
          <select
            id="contact-plan"
            name="plan"
            defaultValue="Not sure yet"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          >
            <option>Build — custom website</option>
            <option>Care — hosting and upkeep</option>
            <option>Growth — SEO and AI automation</option>
            <option>3D production</option>
            <option>Custom AI tools</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-project" className={labelClass}>
          Project brief
        </label>
        <textarea
          id="contact-project"
          name="project"
          required
          rows={5}
          placeholder="What are you building? Timeline, stack, constraints."
          className={`mt-2 resize-y ${fieldClass} ${focusRing}`}
        />
      </div>

      {state && !state.ok ? (
        <p className="text-sm text-signal-dim" role="alert">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className={`inline-flex w-full items-center justify-center bg-signal px-5 py-3 text-sm font-medium text-ink transition-colors duration-300 hover:bg-signal-dim disabled:opacity-60 sm:w-auto ${focusRing}`}
      >
        {pending ? "Sending..." : "Send brief"}
      </button>

      <p className="text-xs leading-relaxed text-faint">
        Or email {contactEmailLabel()} directly.
      </p>
    </form>
  );
}
