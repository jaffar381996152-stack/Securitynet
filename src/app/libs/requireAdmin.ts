import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/libs/auth";

// Verifies the caller has an active session with an "admin" role.
// Returns a 401/403 NextResponse to short-circuit the handler, or null if authorized.
// Use at the top of every admin-only API route handler:
//   const authError = await requireAdmin();
//   if (authError) return authError;
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Authentication required" }, { status: 401 });
  }

  const role = (session.user as any).role;
  if (role !== "admin") {
    return NextResponse.json({ success: false, error: "Admin access required" }, { status: 403 });
  }

  return null;
}
