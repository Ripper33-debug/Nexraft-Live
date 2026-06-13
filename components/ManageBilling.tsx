"use client";

import { useState, type FormEvent } from "react";

type ManageBillingProps = {
  defaultEmail?: string;
};

const focusRing =
  "outline-none focus-visible:[outline:2px_solid_var(--color-signal)] focus-visible:[outline-offset:2px]";

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
        {loading ? "Opening portal..." : "Manage billing"}
      </button>

      {error && (
        <p className="text-sm text-mute" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
