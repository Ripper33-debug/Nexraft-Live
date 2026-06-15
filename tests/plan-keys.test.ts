import { describe, it, expect } from "vitest";
import {
  isStripePlanKey,
  planKeyFromWebIndex,
  validatePlanSelection,
} from "@/lib/stripe/plan-keys";

describe("isStripePlanKey", () => {
  it("accepts known keys", () => {
    expect(isStripePlanKey("growth")).toBe(true);
    expect(isStripePlanKey("hosting_managed")).toBe(true);
    expect(isStripePlanKey("three_d_studio")).toBe(true);
  });

  it("rejects unknown keys", () => {
    expect(isStripePlanKey("nope")).toBe(false);
    expect(isStripePlanKey("")).toBe(false);
    expect(isStripePlanKey("GROWTH")).toBe(false);
  });
});

describe("planKeyFromWebIndex", () => {
  it("maps the three web indexes", () => {
    expect(planKeyFromWebIndex("01")).toBe("starter");
    expect(planKeyFromWebIndex("02")).toBe("growth");
    expect(planKeyFromWebIndex("03")).toBe("build");
  });

  it("returns null for anything else", () => {
    expect(planKeyFromWebIndex("04")).toBeNull();
    expect(planKeyFromWebIndex("growth")).toBeNull();
    expect(planKeyFromWebIndex("")).toBeNull();
  });
});

describe("validatePlanSelection", () => {
  it("requires at least one plan", () => {
    expect(validatePlanSelection([])).toMatch(/at least one/i);
  });

  it("allows one plan per category", () => {
    expect(validatePlanSelection(["growth"])).toBeNull();
    expect(
      validatePlanSelection(["growth", "hosting_managed", "three_d_asset"]),
    ).toBeNull();
  });

  it("rejects two plans in the same category", () => {
    expect(validatePlanSelection(["starter", "growth"])).toMatch(
      /one plan per category/i,
    );
    expect(
      validatePlanSelection(["hosting_managed", "hosting_enterprise"]),
    ).toMatch(/one plan per category/i);
  });
});
