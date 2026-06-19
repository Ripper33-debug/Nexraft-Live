"use client";

import { useState, type FormEvent } from "react";

type ManageBillingProps = {
  defaultEmail?: string;
  portalStatus?: string | null;
};

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

const PORTAL_STATUS_MESSAGES: Record<string, string> = {
  invalid: "That billing link expired or was already used. Request a new one below.",
  error: "Unable to open billing portal. Request a new link or email barry@nexraft.com.",
  unavailable:
    "Billing portal verification is temporarily unavailable. Email barry@nexraft.com for help.",
  rate_limit: "Too many attempts. Wait a few minutes and try again.",
};

export function ManageBilling({
  defaultEmail = "",
  portalStatus = null,
}: ManageBillingProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const statusMessage = portalStatus
    ? PORTAL_STATUS_MESSAGES[portalStatus] ?? null
    : null;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSent(false);
    setMessage("");

    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setError(data.error ?? "Unable to send billing link.");
        setLoading(false);
        return;
      }

      setSent(true);
      setMessage(
        data.message ??
          "Check your inbox for a secure billing link. It expires in 15 minutes.",
      );
      setLoading(false);
    } catch {
      setError("Unable to send billing link. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {statusMessage ? (
        <p className="text-sm text-mute" role="status">
          {statusMessage}
        </p>
      ) : null}

      <div className="flex flex-col gap-2">
        <label htmlFor="billing-email" className="text-sm text-faint">
          Email
        </label>
        <input
          id="billing-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-b border-line bg-transparent py-3 text-sm text-bone placeholder:text-faint focus:border-mute focus:outline-none"
          placeholder="you@company.com"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className={`inline-flex items-center justify-center border border-line px-5 py-3 text-sm text-bone transition-colors duration-300 hover:border-mute disabled:cursor-not-allowed disabled:opacity-50 ${focusRing}`}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Sending link..." : "Email billing link"}
      </button>

      {sent && message ? (
        <p className="text-sm text-mute" role="status">
          {message}
        </p>
      ) : null}

      {error && (
        <p className="text-sm text-mute" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
