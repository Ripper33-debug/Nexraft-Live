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
      <div
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="contact-hp">Leave blank</label>
        <input
          id="contact-hp"
          name="_hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
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
          <label htmlFor="contact-site" className={labelClass}>
            Website
          </label>
          <input
            id="contact-site"
            name="site_url"
            type="url"
            placeholder="https://"
            autoComplete="url"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-tool" className={labelClass}>
          What tool do you need?
        </label>
        <textarea
          id="contact-tool"
          name="tool_needed"
          required
          rows={3}
          placeholder="3D viewer, quote flow, customer portal, integration, or something else."
          className={`mt-2 resize-y ${fieldClass} ${focusRing}`}
        />
      </div>

      <div>
        <label htmlFor="contact-assets" className={labelClass}>
          CAD, product files, or workflow docs?
        </label>
        <textarea
          id="contact-assets"
          name="assets"
          rows={2}
          placeholder="What files or documentation do you already have?"
          className={`mt-2 resize-y ${fieldClass} ${focusRing}`}
        />
      </div>

      <div>
        <label htmlFor="contact-integrations" className={labelClass}>
          What system should this connect to?
        </label>
        <input
          id="contact-integrations"
          name="integrations"
          type="text"
          placeholder="QuickBooks, CRM, Stripe, internal database, etc."
          className={`mt-2 ${fieldClass} ${focusRing}`}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Budget range
          </label>
          <select
            id="contact-budget"
            name="budget"
            defaultValue="Not sure yet"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          >
            <option>Under $5,000</option>
            <option>$5,000 - $10,000</option>
            <option>$10,000 - $25,000</option>
            <option>$25,000+</option>
            <option>Not sure yet</option>
          </select>
        </div>
        <div>
          <label htmlFor="contact-timeline" className={labelClass}>
            Timeline
          </label>
          <select
            id="contact-timeline"
            name="timeline"
            defaultValue="Flexible"
            className={`mt-2 ${fieldClass} ${focusRing}`}
          >
            <option>ASAP</option>
            <option>1-2 months</option>
            <option>3-6 months</option>
            <option>Flexible</option>
          </select>
        </div>
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
