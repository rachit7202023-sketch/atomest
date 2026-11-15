/**
 * Rate limiter for Vercel serverless functions.
 *
 * Strategy (shared store, race-free, fail-closed):
 *
 * 1. Authoritative path — Supabase-backed atomic store.
 *    Calls a Postgres RPC `increment_rate_limit` that performs a single
 *    `INSERT ... ON CONFLICT ... DO UPDATE` statement. Postgres acquires a
 *    row lock on the conflicting key, so concurrent increments for the same
 *    identifier are serialized — no race conditions, no read-then-write window.
 *    This store is shared across all serverless instances (unlike a plain
 *    Map), so rate limiting is enforced globally.
 *    Cost: one extra Supabase call per protected request, using the existing
 *    service-role-key client — no new paid service, no spend without auth.
 *
 * 2. Fail-closed on failure.
 *    If Supabase is unavailable, misconfigured, or the RPC errors, the limiter
 *    does NOT fall back to a per-instance in-memory store. It throws a
 *    RateLimitError so the caller returns a recoverable HTTP response (503)
 *    rather than falsely reporting success or silently bypassing limits.
 *
 * Migration: supabase/migrations/0005_rate_limits_schema.sql creates the
 * `rate_limits` table and `increment_rate_limit` RPC. It has not been applied
 * to the remote project — that requires explicit authorization. Until applied,
 * every protected request fails closed (503) rather than succeeding without
 * rate-limit enforcement.
 */

import { createClient } from "@supabase/supabase-js";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfter?: number; // seconds until the window resets, only when not allowed
}

export interface RateLimitOptions {
  maxRequests: number;
  windowMs: number;
}

/** Thrown when rate-limit enforcement cannot be verified (fail-closed). */
export class RateLimitError extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number = 503) {
    super(message);
    this.name = "RateLimitError";
    this.statusCode = statusCode;
  }
}

function buildKey(ip: string, options: RateLimitOptions): string {
  return `rate:${ip}:${options.maxRequests}:${options.windowMs}`;
}

function getSupabaseClient() {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

/**
 * Shared store: atomic, shared across instances, race-free.
 * Throws RateLimitError when Supabase is unavailable/misconfigured or the RPC
 * errors — callers must return a recoverable HTTP response, never silently
 * report success.
 */
async function checkRateLimitSupabase(
  ip: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    throw new RateLimitError("Rate limiting unavailable: Supabase not configured", 503);
  }

  const windowSeconds = Math.ceil(options.windowMs / 1000);
  const { data, error } = await supabase.rpc("increment_rate_limit", {
    p_key: buildKey(ip, options),
    p_max_requests: options.maxRequests,
    p_window_seconds: windowSeconds,
  });

  if (error) {
    throw new RateLimitError(
      `Rate limit check failed: ${error.message ?? "unknown error"}`,
      503
    );
  }
  if (!data) {
    throw new RateLimitError("Rate limit check returned no data", 503);
  }

  const row = Array.isArray(data) ? data[0] : data;
  const allowed = Boolean(row.allowed);
  const remaining = Number(row.remaining ?? 0);
  const retryAfter = Number(row.retry_after ?? 0);

  return {
    allowed,
    remaining,
    ...(retryAfter > 0 && !allowed ? { retryAfter } : {}),
  };
}

/**
 * Check and increment the rate limit for `ip`.
 *
 * Uses the shared Supabase store as the authoritative source. Never falls back
 * to a per-instance in-memory store (that would be unshared and bypassable).
 * Throws RateLimitError on any enforcement failure so callers return a
 * recoverable HTTP response instead of falsely reporting success.
 */
export async function checkRateLimit(
  ip: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  return checkRateLimitSupabase(ip, options);
}

export function getClientIp(
  req: { headers: Record<string, string | string[] | undefined> }
): string {
  const forwarded = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  const ip = realIp || raw || "unknown";
  return Array.isArray(ip) ? ip[0] : ip;
}
