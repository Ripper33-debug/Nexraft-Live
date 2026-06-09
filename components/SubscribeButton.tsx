"use client";

import { useState } from "react";
import type { StripePlanKey } from "@/lib/stripe/plan-keys";

type SubscribeButtonProps = {
  plan: StripePlanKey;
  label?: string;
  className?: string;
  variant?: "primary" | "default";
};

export function SubscribeButton({
  plan,
  label = "Get started",
  className = "",
  variant = "default",
}: SubscribeButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onClick = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Unable to start checkout.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Unable to start checkout. Please try again.");
      setLoading(false);
    }
  };

  const classes =
    variant === "primary"
      ? `hero-cta-primary btn-submit ${className}`
      : `btn-submit ${className}`;

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className={classes}
        data-cursor-hover
        aria-busy={loading}
      >
        {loading ? "Redirecting\u2026" : label}
      </button>
      {error && (
        <p className="font-mono text-[10px] text-muted" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
