"use server";

import { headers } from "next/headers";
import { contactEmailLabel } from "@/lib/site";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: FormDataEntryValue | null, max = 5000): string {
  return String(value ?? "")
    .trim()
    .slice(0, max);
}

export async function submitContact(formData: FormData): Promise<ContactResult> {
  const honeypot = clean(formData.get("website"), 200);
  if (honeypot) {
    return { ok: true };
  }

  const headerList = await headers();
  const ip = clientIpFromHeaders(headerList.get("x-forwarded-for"));
  const limit = await checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000);

  if (!limit.ok) {
    return {
      ok: false,
      error: `Too many inquiries. Try again in ${limit.retryAfterSec}s or email ${contactEmailLabel()}.`,
    };
  }

  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 254);
  const company = clean(formData.get("company"), 120);
  const plan = clean(formData.get("plan"), 80) || "Not specified";
  const project = clean(formData.get("project"), 5000);

  if (!name) {
    return { ok: false, error: "Name is required." };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!project) {
    return { ok: false, error: "Tell us what you are building." };
  }

  const formId = process.env.FORMSPREE_FORM_ID?.trim();

  if (!formId) {
    return {
      ok: false,
      error: `Contact form is not configured yet. Email ${contactEmailLabel()} directly.`,
    };
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      company: company || "n/a",
      plan,
      project,
      _replyto: email,
      _subject: `Project inquiry - Nexraft (${plan})`,
    }),
  });

  if (!response.ok) {
    let detail = "";
    try {
      const data = (await response.json()) as { error?: string };
      detail = data.error ? ` (${data.error})` : "";
    } catch {
      /* ignore */
    }

    return {
      ok: false,
      error: `Something went wrong${detail}. Try again or email ${contactEmailLabel()}.`,
    };
  }

  return { ok: true };
}
