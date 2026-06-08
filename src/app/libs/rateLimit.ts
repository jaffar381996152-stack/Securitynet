import { NextRequest, NextResponse } from "next/server";

type Bucket = { count: number; resetAt: number };

// Per-process in-memory buckets, keyed by `${routeKey}:${ip}`.
// Resets on server restart — fine for a single-instance deployment guarding
// against abusive bursts; not a substitute for a shared store at scale.
const buckets = new Map<string, Bucket>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

// Fixed-window rate limiter. Returns a 429 NextResponse if the caller has
// exceeded `limit` requests in the current window, or null if the request may proceed.
export function rateLimit(
  req: NextRequest,
  routeKey: string,
  limit: number,
  windowMs: number = 60_000
): NextResponse | null {
  const ip = getClientIp(req);
  const key = `${routeKey}:${ip}`;
  const now = Date.now();

  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  if (bucket.count >= limit) {
    const retryAfterSec = Math.ceil((bucket.resetAt - now) / 1000);
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfterSec) } }
    );
  }

  bucket.count += 1;
  return null;
}
