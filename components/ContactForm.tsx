"use client";

import { useState, useTransition, type FormEvent } from "react";
import { submitContact } from "@/app/actions/contact";

const dash = "\u2014";

const plans = [
  { group: "Web", options: ["Starter", "Growth", "Build"] },
  { group: "Hosting", options: ["Managed", "Performance", "Enterprise"] },
  { group: "3D", options: ["Asset", "Scene", "Studio"] },
] as const;

type FormStatus = "idle" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const result = await submitContact(data);

      if (result.ok) {
        setStatus("success");
        setMessage("Inquiry sent. We will respond within two business days.");
        form.reset();
        return;
      }

      setStatus("error");
      setMessage(result.error);
    });
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
            disabled={isPending}
          />
        </div>
        <div className="field-group">
          <label htmlFor="contact-email" className="field-label">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="field-input"
            placeholder="you@company.com"
            disabled={isPending}
          />
        </div>
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
          disabled={isPending}
        />
      </div>

      <div className="field-group">
        <label htmlFor="contact-plan" className="field-label">
          Plan interest
        </label>
        <select
          id="contact-plan"
          name="plan"
          className="field-input"
          defaultValue=""
          disabled={isPending}
        >
          <option value="">Optional — select a plan</option>
          {plans.map((group) => (
            <optgroup key={group.group} label={group.group}>
              {group.options.map((option) => (
                <option
                  key={`${group.group}-${option}`}
                  value={`${group.group} ${dash} ${option}`}
                >
                  {option}
                </option>
              ))}
            </optgroup>
          ))}
          <option value="Not sure yet">Not sure yet</option>
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
          disabled={isPending}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          className="btn-submit"
          data-cursor-hover
          disabled={isPending}
          aria-busy={isPending}
        >
          {isPending ? "Sending\u2026" : "Send inquiry"}
        </button>
        {status !== "idle" && (
          <p
            className={`font-mono text-xs ${
              status === "success" ? "text-accent" : "text-foreground/70"
            }`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
