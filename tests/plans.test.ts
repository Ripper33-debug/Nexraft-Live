import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { resolveCheckoutPlans } from "@/lib/stripe/plans";

describe("resolveCheckoutPlans", () => {
  beforeEach(() => {
    vi.stubEnv("STRIPE_PRICE_CARE_275", "price_care_275");
    vi.stubEnv("STRIPE_PRICE_GROWTH_1125", "price_growth_1125");
    vi.stubEnv("STRIPE_PRICE_BUILD_4500", "price_build_4500");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("resolves a single retainer plan", () => {
    expect(resolveCheckoutPlans({ plan: "care_275" })).toEqual({
      plans: ["care_275"],
    });
  });

  it("resolves retainer plus build", () => {
    expect(
      resolveCheckoutPlans({ plans: ["growth_1125", "build_4500"] }),
    ).toEqual({ plans: ["growth_1125", "build_4500"] });
  });

  it("dedupes repeated plans", () => {
    expect(resolveCheckoutPlans({ plans: ["care_275", "care_275"] })).toEqual({
      plans: ["care_275"],
    });
  });

  it("rejects an unknown plan", () => {
    const res = resolveCheckoutPlans({ plan: "bogus" });
    expect(res).toHaveProperty("error");
  });

  it("rejects care and growth together", () => {
    vi.stubEnv("STRIPE_PRICE_CARE_150", "price_care_150");
    const res = resolveCheckoutPlans({ plans: ["care_150", "growth_1125"] });
    expect(res).toHaveProperty("error");
  });

  it("errors when the price id is not configured", () => {
    vi.stubEnv("STRIPE_PRICE_CARE_400", "");
    const res = resolveCheckoutPlans({ plan: "care_400" });
    expect(res).toHaveProperty("error");
  });
});
