"use client";

import { useMemo, useState } from "react";
import {
  PLAN_CATEGORIES,
  plansForCategory,
  totalMonthlyPrice,
  type PlanCategory,
} from "@/lib/plans/catalog";
import type { StripePlanKey } from "@/lib/stripe/plan-keys";
import { validatePlanSelection } from "@/lib/stripe/plan-keys";

type Selection = Record<PlanCategory, StripePlanKey | null>;

const EMPTY_SELECTION: Selection = {
  web: null,
  hosting: null,
  three_d: null,
};

export function PlanCheckoutConfigurator() {
  const [selection, setSelection] = useState<Selection>(EMPTY_SELECTION);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedPlans = useMemo(
    () => Object.values(selection).filter(Boolean) as StripePlanKey[],
    [selection],
  );

  const monthlyTotal = totalMonthlyPrice(selectedPlans);
  const webWithoutHosting =
    selection.web !== null && selection.hosting === null;

  const setCategory = (category: PlanCategory, key: StripePlanKey | null) => {
    setSelection((prev) => ({ ...prev, [category]: key }));
    setError("");
  };

  const addManagedHosting = () => {
    setSelection((prev) => ({ ...prev, hosting: "hosting_managed" }));
    setError("");
  };

  const onSubscribe = async () => {
    const validationError = validatePlanSelection(selectedPlans);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plans: selectedPlans }),
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

  return (
    <div className="space-y-8">
      {PLAN_CATEGORIES.map((category) => {
        const options = plansForCategory(category.id);

        return (
          <fieldset
            key={category.id}
            className="border border-border p-5 sm:p-6"
          >
            <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              {category.label}
            </legend>
            {category.hint && (
              <p className="mt-2 font-mono text-xs leading-relaxed text-muted">
                {category.hint}
              </p>
            )}

            <div className="mt-4 space-y-2">
              <label className="flex cursor-pointer items-start gap-3 border border-border px-4 py-3 transition-colors has-[:checked]:border-accent/40 has-[:checked]:bg-accent/[0.06]">
                <input
                  type="radio"
                  name={`plan-${category.id}`}
                  className="mt-1 accent-[var(--color-accent)]"
                  checked={selection[category.id] === null}
                  onChange={() => setCategory(category.id, null)}
                  disabled={loading}
                />
                <span className="min-w-0">
                  <span className="font-display text-sm font-medium text-foreground">
                    None
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] text-muted">
                    Skip this category
                  </span>
                </span>
              </label>

              {options.map((plan) => (
                <label
                  key={plan.key}
                  className="flex cursor-pointer items-start gap-3 border border-border px-4 py-3 transition-colors has-[:checked]:border-accent/40 has-[:checked]:bg-accent/[0.06]"
                >
                  <input
                    type="radio"
                    name={`plan-${category.id}`}
                    className="mt-1 accent-[var(--color-accent)]"
                    checked={selection[category.id] === plan.key}
                    onChange={() => setCategory(category.id, plan.key)}
                    disabled={loading}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-sm font-medium text-foreground">
                        {plan.name}
                      </span>
                      {plan.popular && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent">
                          Popular
                        </span>
                      )}
                      <span className="font-display text-sm font-medium tabular-nums text-foreground">
                        ${plan.price.toLocaleString()}/mo
                      </span>
                    </span>
                    <span className="mt-1 block font-mono text-[10px] leading-relaxed text-muted">
                      {plan.summary}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        );
      })}

      {webWithoutHosting && (
        <div className="border border-border bg-accent/[0.04] px-4 py-3">
          <p className="font-mono text-xs leading-relaxed text-muted">
            Building a live site? Most clients add{" "}
            <strong className="font-medium text-foreground">Managed hosting</strong>{" "}
            ($350/mo) so we deploy and monitor production for you.
          </p>
          <button
            type="button"
            onClick={addManagedHosting}
            className="link-underline mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
            disabled={loading}
            data-cursor-hover
          >
            + Add Managed hosting
          </button>
        </div>
      )}

      <div className="border-t border-border pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">
              Monthly total
            </p>
            <p className="mt-1 font-display text-2xl font-semibold tabular-nums text-foreground">
              {selectedPlans.length > 0
                ? `$${monthlyTotal.toLocaleString()}/mo`
                : "$0/mo"}
            </p>
            <p className="mt-1 font-mono text-[10px] text-muted">
              One subscription, combined on a single Stripe invoice.
            </p>
          </div>

          <button
            type="button"
            onClick={onSubscribe}
            disabled={loading || selectedPlans.length === 0}
            className="hero-cta-primary btn-submit shrink-0"
            data-cursor-hover
            aria-busy={loading}
          >
            {loading ? "Redirecting\u2026" : "Subscribe"}
          </button>
        </div>

        {error && (
          <p className="mt-4 font-mono text-xs text-muted" role="alert">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
