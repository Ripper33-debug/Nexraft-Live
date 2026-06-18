import { describe, it, expect } from "vitest";
import {
  isStripePlanKey,
  planKeyFromWebIndex,
  validatePlanSelection,
  partitionPlansByBilling,
} from "@/lib/stripe/plan-keys";

describe("isStripePlanKey", () => {
  it("accepts known keys", () => {
    expect(isStripePlanKey("care_275")).toBe(true);
    expect(isStripePlanKey("growth_1125")).toBe(true);
    expect(isStripePlanKey("build_4500")).toBe(true);
  });

  it("rejects unknown keys", () => {
    expect(isStripePlanKey("starter")).toBe(false);
    expect(isStripePlanKey("")).toBe(false);
    expect(isStripePlanKey("GROWTH")).toBe(false);
  });
});

describe("planKeyFromWebIndex", () => {
  it("maps proposal indexes to default tiers", () => {
    expect(planKeyFromWebIndex("01")).toBe("care_275");
    expect(planKeyFromWebIndex("02")).toBe("growth_1125");
    expect(planKeyFromWebIndex("03")).toBe("build_4500");
  });

  it("returns null for anything else", () => {
    expect(planKeyFromWebIndex("04")).toBeNull();
    expect(planKeyFromWebIndex("growth")).toBeNull();
    expect(planKeyFromWebIndex("")).toBeNull();
  });
});

describe("validatePlanSelection", () => {
  it("requires at least one plan", () => {
    expect(validatePlanSelection([])).toMatch(/select/i);
  });

  it("allows retainer plus build", () => {
    expect(validatePlanSelection(["care_275", "build_4500"])).toBeNull();
  });

  it("rejects two retainer plans", () => {
    expect(validatePlanSelection(["care_150", "growth_750"])).toMatch(
      /one monthly retainer/i,
    );
  });

  it("rejects two build plans", () => {
    expect(validatePlanSelection(["build_3000", "build_6000"])).toMatch(
      /one build package/i,
    );
  });
});

describe("partitionPlansByBilling", () => {
  it("splits subscription and one-time plans", () => {
    expect(
      partitionPlansByBilling(["care_275", "build_4500"]),
    ).toEqual({
      subscription: ["care_275"],
      payment: ["build_4500"],
    });
  });
});
