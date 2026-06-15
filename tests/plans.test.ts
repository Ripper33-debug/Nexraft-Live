import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resolveCheckoutPlans } from "@/lib/stripe/plans";

describe("resolveCheckoutPlans", () => {
  beforeEach(() => {
    vi.stubEnv("STRIPE_PRICE_STARTER", "price_starter");
    vi.stubEnv("STRIPE_PRICE_GROWTH", "price_growth");
    vi.stubEnv("STRIPE_PRICE_HOSTING_MANAGED", "price_hosting_managed");
    vi.stubEnv("STRIPE_PRICE_THREE_D_ASSET", "price_three_d_asset");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("resolves a single valid plan", () => {
    expect(resolveCheckoutPlans({ plan: "growth" })).toEqual({
      plans: ["growth"],
    });
  });

  it("normalizes case and resolves multiple categories", () => {
    expect(
      resolveCheckoutPlans({ plans: ["GROWTH", "hosting_managed"] }),
    ).toEqual({ plans: ["growth", "hosting_managed"] });
  });

  it("dedupes repeated plans", () => {
    expect(resolveCheckoutPlans({ plans: ["growth", "growth"] })).toEqual({
      plans: ["growth"],
    });
  });

  it("rejects an unknown plan", () => {
    const res = resolveCheckoutPlans({ plan: "bogus" });
    expect(res).toHaveProperty("error");
  });

  it("rejects two plans in the same category", () => {
    const res = resolveCheckoutPlans({ plans: ["starter", "growth"] });
    expect(res).toHaveProperty("error");
  });

  it("errors when the price id is not configured", () => {
    vi.stubEnv("STRIPE_PRICE_BUILD", "");
    const res = resolveCheckoutPlans({ plan: "build" });
    expect(res).toHaveProperty("error");
  });
});
