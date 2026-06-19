import "server-only";

import { Redis } from "@upstash/redis";

let client: Redis | null = null;

export function redisConfigured(): boolean {
  return !!(getRedisUrl() && getRedisToken());
}

function getRedisUrl(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
}

function getRedisToken(): string | undefined {
  return process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
}

export function getRedis(): Redis | null {
  const url = getRedisUrl();
  const token = getRedisToken();

  if (!url || !token) return null;

  if (!client) {
    client = new Redis({ url, token });
  }

  return client;
}

const PORTAL_TOKEN_TTL_SEC = 15 * 60;

export type PortalTokenPayload = {
  stripeCustomerId: string;
  email: string;
};

export async function createPortalToken(
  payload: PortalTokenPayload,
): Promise<string | null> {
  const redis = getRedis();
  if (!redis) return null;

  const token = crypto.randomUUID();
  await redis.set(`portal:token:${token}`, payload, { ex: PORTAL_TOKEN_TTL_SEC });
  return token;
}

export async function consumePortalToken(
  token: string,
): Promise<PortalTokenPayload | null> {
  const redis = getRedis();
  if (!redis) return null;

  const key = `portal:token:${token}`;
  const payload = await redis.get<PortalTokenPayload>(key);
  if (!payload) return null;

  await redis.del(key);
  return payload;
}
