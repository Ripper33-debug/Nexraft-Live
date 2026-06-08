"use client";

import { useState, type FormEvent } from "react";

const EMAIL = "hello@nexraft.com";
const dash = "\u2014";

const plans = [
  `Web ${dash} Starter`,
  `Web ${dash} Growth`,
  `Web ${dash} Build`,
  `Hosting ${dash} Managed`,
  `Hosting ${dash} Performance`,
  `Hosting ${dash} Enterprise`,
  `3D ${dash} Asset`,
  `3D ${dash} Scene`,
  `3D ${dash} Studio`,
  "Not sure yet",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company") || dash}`,
      `Plan interest: ${data.get("plan")}`,
      "",
      "What they're building:",
      String(data.get("project") || ""),
      "",
    ].join("\n");

    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Project inquiry ${dash} Nexraft`)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setStatus("sent");
  };

  return (
    <form onSubmit={onSubmit} className="contact-form space-y-6" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="field-group">
          <label htmlFor="contact-name" className="field-label">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="field-input"
            placeholder="Your name"
          />
        </div>
        <div className="field-group">
          <label htmlFor="contact-company" className="field-label">
            Company
          </label>
          <input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="organization"
            className="field-input"
            placeholder="Optional"
          />
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="contact-plan" className="field-label">
          Plan interest
        </label>
        <select id="contact-plan" name="plan" className="field-input" required>
          {plans.map((plan) => (
            <option key={plan} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      <div className="field-group">
        <label htmlFor="contact-project" className="field-label">
          What you&apos;re building
        </label>
        <textarea
          id="contact-project"
          name="project"
          required
          rows={4}
          className="field-input field-textarea"
          placeholder="Brief summary, timeline, and goals"
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn-submit" data-cursor-hover>
          Send inquiry
        </button>
        {status === "sent" && (
          <p className="font-mono text-xs text-accent">
            Opening your mail client
          </p>
        )}
      </div>
    </form>
  );
}
