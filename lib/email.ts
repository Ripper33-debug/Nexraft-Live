import "server-only";

import { Resend } from "resend";

export function emailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY?.trim();
}

export async function sendPortalMagicLink(
  to: string,
  verifyUrl: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() ??
    "Nexraft <onboarding@resend.dev>";

  if (!apiKey) {
    return {
      ok: false,
      error: "Email delivery is not configured.",
    };
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to,
    subject: "Manage your Nexraft billing",
    text: [
      "Use this link to open the Stripe billing portal for your Nexraft account.",
      "",
      verifyUrl,
      "",
      "This link expires in 15 minutes and works once.",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
  });

  if (error) {
    return {
      ok: false,
      error: error.message ?? "Unable to send email.",
    };
  }

  return { ok: true };
}
