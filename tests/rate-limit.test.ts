import { describe, it, expect } from "vitest";
import { checkRateLimit, clientIpFromHeaders } from "@/lib/rate-limit";

describe("checkRateLimit memory fallback", () => {
  it("allows requests under the limit", async () => {
    const key = `test:${Date.now()}:allow`;
    const first = await checkRateLimit(key, 3, 60_000);
    const second = await checkRateLimit(key, 3, 60_000);
    expect(first.ok).toBe(true);
    expect(second.ok).toBe(true);
  });

  it("blocks requests over the limit", async () => {
    const key = `test:${Date.now()}:block`;
    await checkRateLimit(key, 2, 60_000);
    await checkRateLimit(key, 2, 60_000);
    const third = await checkRateLimit(key, 2, 60_000);
    expect(third.ok).toBe(false);
    if (!third.ok) {
      expect(third.retryAfterSec).toBeGreaterThan(0);
    }
  });
});

describe("clientIpFromHeaders", () => {
  it("uses the first forwarded IP", () => {
    expect(clientIpFromHeaders("1.2.3.4, 5.6.7.8")).toBe("1.2.3.4");
  });

  it("falls back to unknown", () => {
    expect(clientIpFromHeaders(null)).toBe("unknown");
  });
});
