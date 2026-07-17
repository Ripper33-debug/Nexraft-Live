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
  const honeypot = clean(formData.get("_hp_field"), 200);
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
  const siteUrl = clean(formData.get("site_url"), 500);
  const toolNeeded = clean(formData.get("tool_needed"), 5000);
  const assets = clean(formData.get("assets"), 2000);
  const integrations = clean(formData.get("integrations"), 500);
  const budget = clean(formData.get("budget"), 80) || "Not specified";
  const timeline = clean(formData.get("timeline"), 80) || "Not specified";

  if (!name) {
    return { ok: false, error: "Name is required." };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!toolNeeded) {
    return { ok: false, error: "Tell us what tool you need." };
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
      site_url: siteUrl || "n/a",
      tool_needed: toolNeeded,
      assets: assets || "n/a",
      integrations: integrations || "n/a",
      budget,
      timeline,
      _replyto: email,
      _subject: `Tool inquiry - Nexraft (${budget})`,
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
