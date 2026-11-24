import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { checkRateLimit, RateLimitError } from "./rate-limiter";

// Mock @supabase/supabase-js so getSupabaseClient() returns a client whose
// `rpc` method we control. No real Supabase call is made in these tests.
const mockRpc = vi.fn();
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ rpc: mockRpc })),
}));

const originalUrl = process.env.VITE_SUPABASE_URL;
const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("rate-limiter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.VITE_SUPABASE_URL = "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY = "test-service-role-key";
    // Default: RPC allows the request.
    mockRpc.mockResolvedValue({
      data: [{ allowed: true, remaining: 4, retry_after: 0 }],
      error: null,
    });
  });

  afterEach(() => {
    if (originalUrl === undefined) delete process.env.VITE_SUPABASE_URL;
    else process.env.VITE_SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it("allows requests under the limit", async () => {
    const result = await checkRateLimit("ip-1", { maxRequests: 5, windowMs: 60_000 });
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(4);
    expect(mockRpc).toHaveBeenCalledWith("increment_rate_limit", {
      p_key: "rate:ip-1:5:60000",
      p_max_requests: 5,
      p_window_seconds: 60,
    });
  });

  it("rejects requests over the limit", async () => {
    mockRpc.mockResolvedValue({
      data: [{ allowed: false, remaining: 0, retry_after: 45 }],
      error: null,
    });
    const result = await checkRateLimit("ip-2", { maxRequests: 2, windowMs: 60_000 });
    expect(result.allowed).toBe(false);
    expect(result.remaining).toBe(0);
    expect(result.retryAfter).toBe(45);
  });

  it("builds a distinct key per IP (no cross-IP leakage)", async () => {
    mockRpc
      .mockResolvedValueOnce({ data: [{ allowed: true, remaining: 0 }], error: null })
      .mockResolvedValueOnce({ data: [{ allowed: true, remaining: 0 }], error: null });

    await checkRateLimit("ip-3", { maxRequests: 1, windowMs: 60_000 });
    await checkRateLimit("ip-4", { maxRequests: 1, windowMs: 60_000 });

    expect(mockRpc.mock.calls[0][1].p_key).toBe("rate:ip-3:1:60000");
    expect(mockRpc.mock.calls[1][1].p_key).toBe("rate:ip-4:1:60000");
    expect(mockRpc.mock.calls[0][1].p_key).not.toBe(mockRpc.mock.calls[1][1].p_key);
  });

  it("throws RateLimitError when the RPC returns an error (fail-closed, no silent success)", async () => {
    mockRpc.mockResolvedValue({ data: null, error: new Error("RPC unavailable") });
    await expect(
      checkRateLimit("ip-5", { maxRequests: 5, windowMs: 60_000 })
    ).rejects.toThrow(RateLimitError);
  });

  it("throws RateLimitError when Supabase is not configured", async () => {
    delete process.env.VITE_SUPABASE_URL;
    await expect(
      checkRateLimit("ip-6", { maxRequests: 5, windowMs: 60_000 })
    ).rejects.toThrow(RateLimitError);
  });
});
