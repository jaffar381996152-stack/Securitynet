import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function info(name: string) {
  const v = process.env[name] || "";
  return {
    present: !!v,
    length: v.length,
    sha256: v ? crypto.createHash("sha256").update(v).digest("hex") : null,
    firstChar: v ? v[0] : null,
    lastChar: v ? v[v.length - 1] : null,
  };
}

export async function GET() {
  return NextResponse.json({
    NODE_ENV: process.env.NODE_ENV,
    MONGODB_URI: info("MONGODB_URI"),
    MONGODB_DB: info("MONGODB_DB"),
  });
}
