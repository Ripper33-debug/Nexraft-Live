import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const TO_EMAIL = "barry@nexraft.com";
const MAX = { name: 120, email: 200, website: 300, company: 160, plan: 120, brief: 4000 };

function clean(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "Email delivery is not configured." },
      { status: 503 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const website = clean(body.website, MAX.website);
  const company = clean(body.company, MAX.company);
  const plan = clean(body.plan, MAX.plan);
  const brief = clean(body.brief, MAX.brief);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please provide a name and a valid email." },
      { status: 400 },
    );
  }

  const from = process.env.RESEND_FROM_EMAIL?.trim() ?? "Nexraft <onboarding@resend.dev>";
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: TO_EMAIL,
    replyTo: email,
    subject: `Nexraft inquiry — ${name}${company ? ` (${company})` : ""}`,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Website: ${website || "—"}`,
      `Company: ${company || "—"}`,
      `Plan interest: ${plan || "—"}`,
      "",
      "Brief:",
      brief || "—",
    ].join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message ?? "Unable to send." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
