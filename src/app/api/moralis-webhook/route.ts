import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { getCollection } from "@/app/libs/mongodb";

const USDT_CONTRACTS: Record<string, string> = {
  "0x38": "0x55d398326f99059ff775485246999027b3197955", // BSC Mainnet USDT
  "0x1":  "0xdAC17F958D2ee523a2206206994597C13D831ec7", // ETH Mainnet USDT
};

const CHAIN_NAMES: Record<string, string> = {
  "0x38": "BSC",
  "0x1":  "ETH",
};

const USDT_DECIMALS: Record<string, number> = {
  "0x38": 18,
  "0x1":  6,
};

const DEPOSIT_WALLETS: Record<string, string> = {
  BSC: (process.env.DEPOSIT_WALLET_BSC || "").toLowerCase(),
  ETH: (process.env.DEPOSIT_WALLET_ETH || "").toLowerCase(),
};

const XN_PRICE = 0.20;

// Keep globalThis for local dev fallback
declare global {
  // eslint-disable-next-line no-var
  var __confirmedPayments: Map<string, any>;
}
if (!globalThis.__confirmedPayments) {
  globalThis.__confirmedPayments = new Map();
}
export const confirmedPayments = globalThis.__confirmedPayments;


function verifyMoralisSignature(body: string, signature: string): boolean {
  const secret = process.env.MORALIS_STREAM_SECRET || "";
  // No secret configured means we cannot verify the sender — reject rather
  // than trust an unauthenticated payload that can trigger token transfers.
  if (!secret) return false;
  if (!signature) return false;
  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");
  return hash === signature;
}

const TRANSFER_TOPIC = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

export async function POST(req: NextRequest) {
  let rawBody = "";
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ received: true });
  }

  if (!rawBody || rawBody.trim() === "") {
    return NextResponse.json({ received: true });
  }

  const signature = req.headers.get("x-signature") || "";
  if (!verifyMoralisSignature(rawBody, signature)) {
    // Respond 200 (without processing) instead of 401 — Moralis sends an
    // unsigned connectivity test when a stream is first created, before its
    // signing secret can be configured here. A 401 fails that test and
    // blocks stream creation. Unverified payloads are still dropped, just
    // with the same response shape as a normal accepted request.
    return NextResponse.json({ received: true });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ received: true });
  }

  if (!payload.logs || payload.logs.length === 0) {
    return NextResponse.json({ received: true });
  }

  const chainId: string = payload.chainId?.toLowerCase() || "";
  const network = CHAIN_NAMES[chainId];
  const usdtContract = USDT_CONTRACTS[chainId];
  const decimals = USDT_DECIMALS[chainId];
  const depositWallet = DEPOSIT_WALLETS[network];

  if (!network || !usdtContract || !depositWallet) {
    return NextResponse.json({ received: true });
  }

  for (const log of payload.logs) {
    if (
      log.address?.toLowerCase() !== usdtContract.toLowerCase() ||
      log.topic0?.toLowerCase() !== TRANSFER_TOPIC
    ) continue;

    const to = ("0x" + (log.topic2 || "").slice(-40)).toLowerCase();
    const from = ("0x" + (log.topic1 || "").slice(-40)).toLowerCase();

    if (to !== depositWallet) continue;

    const rawAmount = BigInt(log.data || "0x0");
    const usdtAmount = Number(rawAmount) / Math.pow(10, decimals);
    const xnTokens = (usdtAmount / XN_PRICE).toFixed(4);
    const txHash = log.transactionHash || "";

    const payment = { senderAddress: from, network, txHash, usdtAmount, xnTokens, timestamp: Date.now() };

    // Store in globalThis (local dev)
    confirmedPayments.set(`${from}_${network}`, payment);

    // Store in MongoDB (production/serverless)
    try {
      const col = await getCollection("pendingPayments");
      await col.updateOne(
        { key: `${from}_${network}` },
        { $set: { ...payment, key: `${from}_${network}` } },
        { upsert: true }
      );
    } catch (err: any) {
      console.error("[webhook] MongoDB save failed:", err.message);
    }

    console.log(`[Moralis Webhook] ${network} USDT deposit: ${usdtAmount} USDT from ${from} → sending ${xnTokens} XN — tx: ${txHash}`);

    // Auto-trigger token sending immediately
    // For BSC/ETH, the sender address IS the connected EVM wallet
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
    fetch(`${appUrl}/api/send-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-internal-secret": process.env.ADMIN_SECRET || "",
      },
      body: JSON.stringify({ buyerAddress: from, connectedWallet: from, network, usdtAmount, xnAmount: xnTokens, txHash }),
    }).catch((err) => console.error("[webhook] send-tokens trigger failed:", err));
  }

  return NextResponse.json({ received: true });
}

export async function GET() {
  return NextResponse.json({ received: true });
}
