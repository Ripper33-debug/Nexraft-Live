"use client";

import { useState, type FormEvent } from "react";

type ManageBillingProps = {
  defaultEmail?: string;
};

export function ManageBilling({ defaultEmail = "" }: ManageBillingProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to open billing portal.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Unable to open billing portal. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="field-group">
        <label htmlFor="billing-email" className="field-label">
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
          className="field-input"
          placeholder="you@company.com"
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        className="hero-cta-primary btn-submit"
        disabled={loading}
        data-cursor-hover
        aria-busy={loading}
      >
        {loading ? "Opening portal\u2026" : "Manage billing"}
      </button>

      {error && (
        <p className="font-mono text-xs text-muted" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
