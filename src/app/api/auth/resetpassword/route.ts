import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { getCollection } from "@/app/libs/mongodb";
import { rateLimit } from "@/app/libs/rateLimit";

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "resetpassword", 10);
  if (limited) return limited;

  let key: unknown;
  let password: unknown;
  try {
    ({ key, password } = await req.json());
  } catch {
    return NextResponse.json({ status: false, error: "Invalid request body" }, { status: 400 });
  }

  if (typeof key !== "string" || !key) {
    return NextResponse.json({ status: false, error: "Missing or invalid reset link" }, { status: 400 });
  }
  if (typeof password !== "string" || password.length < 6) {
    return NextResponse.json(
      { status: false, error: "Password must be at least 6 characters" },
      { status: 400 }
    );
  }

  try {
    const col = await getCollection("users");

    const tokenHash = crypto.createHash("sha256").update(key).digest("hex");
    const user = await col.findOne({
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpires: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json(
        { status: false, error: "This reset link is invalid or has expired" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await col.updateOne(
      { _id: user._id },
      { $set: { password: hashed }, $unset: { resetPasswordTokenHash: "", resetPasswordExpires: "" } }
    );

    return NextResponse.json({ status: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { status: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
