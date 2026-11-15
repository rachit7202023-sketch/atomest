-- Migration: 0005_rate_limits_schema.sql
-- Description: Shared rate-limit store for serverless API endpoints.
-- Supports Atomest 2.0 Phase 2.2 rate limiting (contact, waitlist APIs).
-- Idempotent setup: IF NOT EXISTS for the table; DROP POLICY IF EXISTS +
-- CREATE POLICY and CREATE OR REPLACE for functions so the migration can be
-- re-run safely.
--
-- NOTE: This migration is NOT applied to the remote project here. It must be
-- applied via the Supabase dashboard/CLI only after explicit authorization.
-- Until applied, api/lib/rate-limiter.ts fails closed (503) on every protected
-- request rather than succeeding without rate-limit enforcement.

-- Table storing fixed-window rate-limit counters per key (e.g. per IP + endpoint).
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id TEXT PRIMARY KEY,                 -- e.g. "rate:1.2.3.4:5:60000"
  count INTEGER NOT NULL DEFAULT 0,
  window_start TIMESTAMPTZ NOT NULL,   -- start of the current fixed window
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS. Only the service role may read/write rate-limit rows; the anon
-- key and public clients have no access (no policy grants them any).
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;
CREATE POLICY "Service role can manage rate limits"
  ON public.rate_limits
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Index for scavenging stale windows (used by cleanup_rate_limits / pg_cron).
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start
  ON public.rate_limits(window_start);

-- Atomic increment RPC. A single INSERT ... ON CONFLICT ... DO UPDATE acquires
-- a row lock on the conflicting key, serializing concurrent increments for the
-- same identifier — no read-then-write race window.
--
-- SECURITY INVOKER: runs with the caller's privileges. Only service_role is
-- granted EXECUTE (see REVOKE/GRANT below), so anon/authenticated clients
-- cannot call it at all.
-- SET search_path = public, pg_temp: prevents search_path hijacking of
-- unqualified functions such as NOW().
CREATE OR REPLACE FUNCTION public.increment_rate_limit(
  p_key TEXT,
  p_max_requests INTEGER,
  p_window_seconds INTEGER
) RETURNS TABLE (
  allowed BOOLEAN,
  remaining INTEGER,
  retry_after INTEGER
) LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_now TIMESTAMPTZ := NOW();
  v_count INTEGER;
  v_window_start TIMESTAMPTZ;
  v_reset TIMESTAMPTZ;
BEGIN
  INSERT INTO public.rate_limits (id, count, window_start, updated_at)
  VALUES (p_key, 1, v_now, v_now)
  ON CONFLICT (id) DO UPDATE
  SET count = CASE
        WHEN rate_limits.window_start < v_now - (p_window_seconds * INTERVAL '1 second')
        THEN 1
        ELSE rate_limits.count + 1
      END,
      window_start = CASE
        WHEN rate_limits.window_start < v_now - (p_window_seconds * INTERVAL '1 second')
        THEN v_now
        ELSE rate_limits.window_start
      END,
      updated_at = v_now
  RETURNING count, window_start INTO v_count, v_window_start;

  v_reset := v_window_start + (p_window_seconds * INTERVAL '1 second');

  IF v_count > p_max_requests THEN
    allowed := FALSE;
    remaining := 0;
    retry_after := GREATEST(EXTRACT(EPOCH FROM (v_reset - v_now))::INTEGER, 0);
  ELSE
    allowed := TRUE;
    remaining := p_max_requests - v_count;
    retry_after := 0;
  END IF;

  RETURN;
END;
$$;

-- Optional cleanup: remove rows whose window has expired beyond a retention
-- age. Without cleanup the table grows unboundedly (one row per key per
-- window). Intended for periodic pg_cron invocation (e.g. hourly) or manual
-- administration. SECURITY INVOKER; EXECUTE restricted to service_role.
CREATE OR REPLACE FUNCTION public.cleanup_rate_limits(p_older_than INTERVAL)
RETURNS INTEGER LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public, pg_temp
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  DELETE FROM public.rate_limits
  WHERE window_start < NOW() - p_older_than;
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

-- Restrict execution: only service_role may call the RPCs. Revoke the default
-- PUBLIC execute grant so anon/authenticated clients cannot manipulate or probe
-- rate-limit counters (which could be used to exhaust limits for other users).
REVOKE EXECUTE ON FUNCTION public.increment_rate_limit(TEXT, INTEGER, INTEGER) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_rate_limit(TEXT, INTEGER, INTEGER) TO service_role;

REVOKE EXECUTE ON FUNCTION public.cleanup_rate_limits(INTERVAL) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.cleanup_rate_limits(INTERVAL) TO service_role;

COMMENT ON TABLE public.rate_limits IS 'Shared fixed-window rate-limit counters for serverless API endpoints (contact, waitlist). Service-role only.';
COMMENT ON FUNCTION public.increment_rate_limit(TEXT, INTEGER, INTEGER) IS 'Atomically increments a fixed-window rate-limit counter and returns allowance. Race-free via single-statement upsert with row-level locking. SECURITY INVOKER; EXECUTE restricted to service_role.';
COMMENT ON FUNCTION public.cleanup_rate_limits(INTERVAL) IS 'Deletes rate-limit rows older than p_older_than. Intended for periodic pg_cron invocation. SECURITY INVOKER; EXECUTE restricted to service_role.';
