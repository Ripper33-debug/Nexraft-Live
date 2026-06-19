import { Ratelimit } from "@upstash/ratelimit";
import { getRedis } from "@/lib/redis";

type Bucket = {
  count: number;
  resetAt: number;
};

const memoryBuckets = new Map<string, Bucket>();

const limiterCache = new Map<string, Ratelimit>();

function windowLabel(windowMs: number): `${number} s` | `${number} m` {
  if (windowMs % 60_000 === 0) {
    return `${windowMs / 60_000} m`;
  }
  return `${Math.max(1, Math.ceil(windowMs / 1000))} s`;
}

function getDistributedLimiter(limit: number, windowMs: number): Ratelimit | null {
  const redis = getRedis();
  if (!redis) return null;

  const cacheKey = `${limit}:${windowMs}`;
  let limiter = limiterCache.get(cacheKey);

  if (!limiter) {
    limiter = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(limit, windowLabel(windowMs)),
      prefix: "nexraft:rl",
    });
    limiterCache.set(cacheKey, limiter);
  }

  return limiter;
}

function checkRateLimitMemory(
  key: string,
  limit: number,
  windowMs: number,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now();
  const bucket = memoryBuckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    memoryBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true };
  }

  if (bucket.count >= limit) {
    return {
      ok: false,
      retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { ok: true };
}

export async function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<{ ok: true } | { ok: false; retryAfterSec: number }> {
  const distributed = getDistributedLimiter(limit, windowMs);

  if (!distributed) {
    return checkRateLimitMemory(key, limit, windowMs);
  }

  const result = await distributed.limit(key);

  if (result.success) {
    return { ok: true };
  }

  const retryAfterSec = Math.max(
    1,
    Math.ceil((result.reset - Date.now()) / 1000),
  );

  return { ok: false, retryAfterSec };
}

export function clientIpFromHeaders(forwardedFor: string | null): string {
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}
