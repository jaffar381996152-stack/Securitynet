import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const VARS = [
  "MONGODB_URI",
  "MONGODB_DB",
  "NEXTAUTH_SECRET",
  "NEXTAUTH_URL",
  "GOOGLE_CLIENT_ID",
  "GOOGLE_CLIENT_SECRET",
  "ADMIN_SECRET",
  "MORALIS_API_KEY",
  "MORALIS_STREAM_SECRET",
  "TRONGRID_API_KEY",
  "DEPOSIT_WALLET_BSC",
  "DEPOSIT_WALLET_ETH",
  "DEPOSIT_WALLET_TRON",
  "OWNER_PRIVATE_KEY",
  "XN_TOKEN_CONTRACT_ADDRESS",
  "NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS",
  "NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID",
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_PRESALE_END_DATE",
  "NEXT_PUBLIC_SETTING",
  "NEXT_S3_ACCESS_KEY",
  "NEXT_S3_SECRET_KEY",
  "NEXT_S3_REGION",
];

export async function GET() {
  const result: Record<string, boolean> = {};
  for (const v of VARS) {
    result[v] = !!process.env[v] && process.env[v]!.length > 0;
  }
  return NextResponse.json({ NODE_ENV: process.env.NODE_ENV, vars: result });
}
