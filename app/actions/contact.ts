"use server";

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
  const name = clean(formData.get("name"), 120);
  const email = clean(formData.get("email"), 254);
  const company = clean(formData.get("company"), 120);
  const plan = clean(formData.get("plan"), 80);
  const project = clean(formData.get("project"), 5000);

  if (!name) {
    return { ok: false, error: "Name is required." };
  }

  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email address is required." };
  }

  if (!plan) {
    return { ok: false, error: "Please select a plan." };
  }

  if (!project) {
    return { ok: false, error: "Tell us what you are building." };
  }

  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    return {
      ok: false,
      error: "Contact form is not configured. Email hello@nexraft.com directly.",
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
      company: company || "\u2014",
      plan,
      project,
      _replyto: email,
      _subject: `Project inquiry \u2014 Nexraft (${plan})`,
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      error: "Something went wrong. Try again or email hello@nexraft.com.",
    };
  }

  return { ok: true };
}
