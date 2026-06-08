import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getCollection } from "@/app/libs/mongodb";
import { rateLimit } from "@/app/libs/rateLimit";
import { isValidEmail } from "@/app/libs/validators";
import { forgetPassword } from "@/app/api/emailTemplate";

const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "forgotpassword", 5);
  if (limited) return limited;

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return NextResponse.json({ status: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ status: false, error: "Invalid email address" }, { status: 400 });
  }

  try {
    const col = await getCollection("users");
    const user = await col.findOne({ email: (email as string).toLowerCase() });

    // Google-only accounts have no password to reset, and the schema wipes
    // `password` back to undefined on every save while `isGoogleUser` is set —
    // a token would verify but the new password would silently never persist.
    if (user && !user.isGoogleUser) {
      const token = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

      await col.updateOne(
        { _id: user._id },
        { $set: { resetPasswordTokenHash: tokenHash, resetPasswordExpires: new Date(Date.now() + TOKEN_TTL_MS) } }
      );

      await forgetPassword(user.email, user.firstname, token);
    }

    // Same response whether or not the account exists — confirming
    // non-existence here would let an attacker enumerate registered emails.
    return NextResponse.json({ status: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { status: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
