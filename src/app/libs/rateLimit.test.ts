import { describe, it, expect, afterEach, vi } from "vitest";
import { NextRequest } from "next/server";
import { rateLimit } from "./rateLimit";

// The limiter keys its in-memory buckets on `${routeKey}:${ip}`, and that Map
// is module-level state shared across every test in this file — so each test
// uses its own routeKey/IP pair to stay isolated without reaching into internals.
function requestFrom(ip: string) {
  return new NextRequest("http://localhost/api/test", {
    headers: { "x-forwarded-for": ip },
  });
}

afterEach(() => {
  vi.useRealTimers();
});

describe("rateLimit", () => {
  it("allows requests under the limit and returns null", () => {
    const req = requestFrom("10.0.0.1");
    expect(rateLimit(req, "route-under-limit", 3)).toBeNull();
    expect(rateLimit(req, "route-under-limit", 3)).toBeNull();
    expect(rateLimit(req, "route-under-limit", 3)).toBeNull();
  });

  it("blocks the request that exceeds the limit with a 429 and Retry-After header", async () => {
    const req = requestFrom("10.0.0.2");
    rateLimit(req, "route-over-limit", 2);
    rateLimit(req, "route-over-limit", 2);

    const blocked = rateLimit(req, "route-over-limit", 2);
    expect(blocked).not.toBeNull();
    expect(blocked!.status).toBe(429);
    expect(blocked!.headers.get("Retry-After")).toBeTruthy();

    const body = await blocked!.json();
    expect(body.success).toBe(false);
  });

  it("tracks each client IP independently", () => {
    const reqA = requestFrom("10.0.0.10");
    const reqB = requestFrom("10.0.0.11");

    rateLimit(reqA, "route-per-ip", 1);
    const blockedA = rateLimit(reqA, "route-per-ip", 1);
    const allowedB = rateLimit(reqB, "route-per-ip", 1);

    expect(blockedA).not.toBeNull();
    expect(blockedA!.status).toBe(429);
    expect(allowedB).toBeNull();
  });

  it("tracks each routeKey independently for the same IP", () => {
    const req = requestFrom("10.0.0.20");

    rateLimit(req, "route-a", 1);
    const blockedOnA = rateLimit(req, "route-a", 1);
    const allowedOnB = rateLimit(req, "route-b", 1);

    expect(blockedOnA).not.toBeNull();
    expect(allowedOnB).toBeNull();
  });

  it("resets the count once the window elapses", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00Z"));

    const req = requestFrom("10.0.0.30");
    rateLimit(req, "route-window-reset", 1, 60_000);
    const blocked = rateLimit(req, "route-window-reset", 1, 60_000);
    expect(blocked).not.toBeNull();

    vi.setSystemTime(new Date("2026-01-01T00:01:01Z")); // 61s later — window has elapsed
    const allowedAfterReset = rateLimit(req, "route-window-reset", 1, 60_000);
    expect(allowedAfterReset).toBeNull();
  });

  it("falls back to x-real-ip, then 'unknown', when x-forwarded-for is absent", () => {
    const reqRealIp = new NextRequest("http://localhost/api/test", {
      headers: { "x-real-ip": "192.168.1.5" },
    });
    const reqNoIp = new NextRequest("http://localhost/api/test");

    expect(rateLimit(reqRealIp, "route-real-ip", 1)).toBeNull();
    expect(rateLimit(reqRealIp, "route-real-ip", 1)).not.toBeNull();

    expect(rateLimit(reqNoIp, "route-unknown-ip", 1)).toBeNull();
    expect(rateLimit(reqNoIp, "route-unknown-ip", 1)).not.toBeNull();
  });
});
