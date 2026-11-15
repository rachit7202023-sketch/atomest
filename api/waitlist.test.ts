import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import waitlistHandler from "./waitlist";

// Mock @supabase/supabase-js. Both getSupabaseClient() (rate limiter) and the
// direct createClient() in this handler use the mocked client, so we control
// `rpc` (rate limiting) and `from().insert()` (lead persistence).
const mockInsert = vi.fn();
const mockRpc = vi.fn();
const mockFrom = vi.fn(() => ({ insert: mockInsert }));
vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(() => ({ from: mockFrom, rpc: mockRpc })),
}));

function makeRes() {
  const headers: Record<string, string> = {};
  let statusCode = 200;
  let body: any = null;
  const res: any = {
    setHeader: (key: string, val: string) => {
      headers[String(key).toLowerCase()] = val;
    },
    status: (code: number) => {
      statusCode = code;
      return res;
    },
    json: (data: any) => {
      body = data;
      return res;
    },
    end: () => res,
    getHeaders: () => headers,
    getStatusCode: () => statusCode,
    getBody: () => body,
  };
  return res;
}

function makeReq(body: any, ip = "127.0.0.1") {
  return {
    method: "POST",
    headers: { origin: "http://localhost:3000", "x-forwarded-for": ip },
    body,
  } as any;
}

const originalUrl = process.env.VITE_SUPABASE_URL;
const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("api/waitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL ?? "https://test.supabase.co";
    process.env.SUPABASE_SERVICE_ROLE_KEY =
      process.env.SUPABASE_SERVICE_ROLE_KEY ?? "test-service-role-key";
    // Default: rate limit allows the request so downstream logic is exercised.
    mockRpc.mockResolvedValue({
      data: [{ allowed: true, remaining: 9, retry_after: 0 }],
      error: null,
    });
    mockInsert.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    if (originalUrl === undefined) delete process.env.VITE_SUPABASE_URL;
    else process.env.VITE_SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY;
    else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  });

  it("returns 400 for missing email", async () => {
    const req = makeReq({ product: "speed-to-lead-blueprint" });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(400);
    expect(res.getBody().error).toBeDefined();
  });

  it("returns 400 for invalid email", async () => {
    const req = makeReq({ email: "not-an-email", product: "speed-to-lead-blueprint" });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(400);
    expect(res.getBody().error).toBeDefined();
  });

  it("returns 200 and saves on valid submission", async () => {
    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
      full_name: "Alex Mercer",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(200);
    expect(res.getBody().success).toBe(true);
    expect(mockInsert).toHaveBeenCalledTimes(1);
  });

  it("returns 429 when the rate limit is exceeded", async () => {
    mockRpc.mockResolvedValue({
      data: [{ allowed: false, remaining: 0, retry_after: 30 }],
      error: null,
    });
    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(429);
    expect(res.getBody().error).toContain("Too many requests");
    expect(res.getHeaders()["retry-after"]).toBe("30");
  });

  it("returns 503 when the rate-limit RPC fails (fail-closed, no silent success)", async () => {
    mockRpc.mockResolvedValue({ data: null, error: new Error("RPC unavailable") });
    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(503);
    expect(res.getBody().success).toBeUndefined();
    expect(res.getBody().error).toContain("Rate limit");
  });

  it("returns 200 for duplicate signup (idempotent)", async () => {
    mockInsert.mockResolvedValue({ error: { code: "23505", message: "unique violation" } });
    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(200);
    expect(res.getBody().success).toBe(true);
    expect(res.getBody().message).toBe("Already registered");
  });

  it("returns 503 when database save fails", async () => {
    mockInsert.mockResolvedValue({ error: { code: "PGRST123", message: "db down" } });
    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(503);
    expect(res.getBody().success).toBeUndefined();
  });

  it("returns 503 when Supabase is not configured", async () => {
    const savedUrl = process.env.VITE_SUPABASE_URL;
    const savedKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    delete process.env.VITE_SUPABASE_URL;
    delete process.env.SUPABASE_SERVICE_ROLE_KEY;

    const req = makeReq({
      email: "alex@company.com",
      product: "speed-to-lead-blueprint",
    });
    const res = makeRes();
    await waitlistHandler(req, res);
    expect(res.getStatusCode()).toBe(503);

    process.env.VITE_SUPABASE_URL = savedUrl ?? "";
    process.env.SUPABASE_SERVICE_ROLE_KEY = savedKey ?? "";
  });
});
