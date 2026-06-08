import { describe, it, expect, vi, beforeEach } from "vitest";
import { getServerSession } from "next-auth";

// requireAdmin's only external dependency is getServerSession — mock next-auth
// (and the real authOptions module, which itself pulls in mongodb/bcrypt) so
// this stays a pure test of requireAdmin's own branching logic.
vi.mock("next-auth", () => ({ getServerSession: vi.fn() }));
vi.mock("@/app/libs/auth", () => ({ authOptions: {} }));

import { requireAdmin } from "./requireAdmin";

const mockGetServerSession = vi.mocked(getServerSession);

beforeEach(() => {
  mockGetServerSession.mockReset();
});

describe("requireAdmin", () => {
  it("returns 401 when there is no session", async () => {
    mockGetServerSession.mockResolvedValue(null as never);

    const result = await requireAdmin();

    expect(result).not.toBeNull();
    expect(result!.status).toBe(401);
    const body = await result!.json();
    expect(body.success).toBe(false);
    expect(body.error).toMatch(/authentication required/i);
  });

  it("returns 401 when the session has no user", async () => {
    mockGetServerSession.mockResolvedValue({} as never);

    const result = await requireAdmin();

    expect(result!.status).toBe(401);
  });

  it("returns 403 when the session user is not an admin", async () => {
    mockGetServerSession.mockResolvedValue({ user: { email: "user@example.com", role: "user" } } as never);

    const result = await requireAdmin();

    expect(result).not.toBeNull();
    expect(result!.status).toBe(403);
    const body = await result!.json();
    expect(body.error).toMatch(/admin access required/i);
  });

  it("returns 403 when the session user has no role at all", async () => {
    mockGetServerSession.mockResolvedValue({ user: { email: "user@example.com" } } as never);

    const result = await requireAdmin();

    expect(result!.status).toBe(403);
  });

  it("returns null (authorized) when the session user has the admin role", async () => {
    mockGetServerSession.mockResolvedValue({ user: { email: "admin@example.com", role: "admin" } } as never);

    const result = await requireAdmin();

    expect(result).toBeNull();
  });
});
