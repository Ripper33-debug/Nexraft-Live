import { describe, it, expect } from "vitest";
import { formatUsd, formatUsdRange } from "@/lib/pricing";

describe("formatUsd", () => {
  it("adds a dollar sign and thousands separators", () => {
    expect(formatUsd(1200)).toBe("$1,200");
    expect(formatUsd(2800)).toBe("$2,800");
    expect(formatUsd(4500)).toBe("$4,500");
  });

  it("handles small and zero values", () => {
    expect(formatUsd(350)).toBe("$350");
    expect(formatUsd(0)).toBe("$0");
  });
});

describe("formatUsdRange", () => {
  it("formats min-max ranges", () => {
    expect(formatUsdRange(150, 400)).toBe("$150–$400");
    expect(formatUsdRange(3000, 6000)).toBe("$3,000–$6,000");
  });
});
