import { NextRequest, NextResponse } from "next/server";
import { getCollection } from "@/app/libs/mongodb";
import { confirmedPayments } from "../moralis-webhook/route";
import { rateLimit } from "@/app/libs/rateLimit";
import { isValidWalletAddress, isValidAmount } from "@/app/libs/validators";

const XN_PRICE = 0.20;

// Single source of truth for deposit addresses — same NEXT_PUBLIC_ vars the
// buy page displays (data/settings.js), so the address shown to buyers always
// matches the one we watch for incoming payments.
const DEPOSIT_WALLETS: Record<string, string> = {
  BSC: (process.env.NEXT_PUBLIC_DEPOSIT_WALLET_BSC || "").toLowerCase(),
  ETH: (process.env.NEXT_PUBLIC_DEPOSIT_WALLET_ETH || "").toLowerCase(),
  TRON: process.env.NEXT_PUBLIC_DEPOSIT_WALLET_TRON || "",
};


async function checkEVMPayment(
  network: string,
  senderAddress: string,
  expectedAmount: number
): Promise<{ found: boolean; usdtAmount?: number; xnTokens?: string; txHash?: string; error?: string }> {
  const key = `${senderAddress.toLowerCase()}_${network}`;

  // 1. Check globalThis (works locally)
  const cached = confirmedPayments.get(key);
  if (cached && Math.abs(cached.usdtAmount - expectedAmount) <= 0.5) {
    confirmedPayments.delete(key);
    return { found: true, usdtAmount: cached.usdtAmount, xnTokens: cached.xnTokens, txHash: cached.txHash };
  }

  // 2. Check MongoDB (works on serverless/Amplify)
  try {
    const col = await getCollection("pendingPayments");
    const doc = await col.findOne({ key });
    if (doc && Math.abs(doc.usdtAmount - expectedAmount) <= 0.5) {
      await col.deleteOne({ key }); // consume it
      return { found: true, usdtAmount: doc.usdtAmount, xnTokens: doc.xnTokens, txHash: doc.txHash };
    }
  } catch (err: any) {
    console.error("[check-payment] MongoDB lookup failed:", err.message);
  }

  return { found: false };
}

async function checkTronPayment(
  senderAddress: string,
  expectedAmount: number
): Promise<{ found: boolean; usdtAmount?: number; xnTokens?: string; txHash?: string; error?: string }> {
  const depositWallet = DEPOSIT_WALLETS.TRON;
  const TRON_USDT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

  try {
    // Query by sender address — exact match, no false detections
    const url = `https://api.trongrid.io/v1/accounts/${senderAddress}/transactions/trc20?limit=20&contract_address=${TRON_USDT}`;
    const res = await fetch(url, {
      headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY || "" },
    });

    if (!res.ok) return { found: false, error: "TronGrid API error" };

    const data = await res.json();
    const txs = data?.data || [];

    const match = txs.find((tx: any) => {
      const isToDeposit = tx.to?.toLowerCase() === depositWallet.toLowerCase();
      const amount = Number(tx.value || 0) / 1e6;
      const amountMatch = Math.abs(amount - expectedAmount) <= 0.5;
      const isRecent = Date.now() - tx.block_timestamp < 30 * 60 * 1000;
      return isToDeposit && amountMatch && isRecent;
    });

    if (!match) return { found: false };

    const usdtAmount = Number(match.value) / 1e6;
    const xnTokens = (usdtAmount / XN_PRICE).toFixed(4);
    return { found: true, usdtAmount, xnTokens, txHash: match.transaction_id };
  } catch (err: any) {
    return { found: false, error: err.message };
  }
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "check-payment", 10);
  if (limited) return limited;

  try {
    const { network, senderAddress, usdtAmount, connectedWallet } = await req.json();

    if (!network || !usdtAmount || !senderAddress) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["BSC", "ETH", "TRON"].includes(network)) {
      return NextResponse.json({ success: false, error: "Invalid network" }, { status: 400 });
    }

    if (!isValidWalletAddress(senderAddress, network)) {
      return NextResponse.json({ success: false, error: "Invalid wallet address format" }, { status: 400 });
    }

    const amount = parseFloat(usdtAmount);
    if (!isValidAmount(amount) || amount < 10) {
      return NextResponse.json({ success: false, error: "Minimum 10 USDT" }, { status: 400 });
    }

    let result: { found: boolean; usdtAmount?: number; xnTokens?: string; txHash?: string; error?: string };

    if (network === "TRON") {
      result = await checkTronPayment(senderAddress, amount);
    } else {
      result = await checkEVMPayment(network, senderAddress, amount);
    }

    if (!result.found) {
      return NextResponse.json({
        success: false,
        pending: true,
        error: result.error || "Payment not found yet. Please wait and try again.",
      });
    }

    // Always send XN to the connected EVM wallet, not the payment sender address
    const xnRecipient = connectedWallet || senderAddress;
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");

    let tokenSent = false;
    let tokenTxHash: string | undefined;
    let tokenError: string | undefined;

    try {
      const tokenRes = await fetch(`${appUrl}/api/send-tokens`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-internal-secret": process.env.ADMIN_SECRET || "",
        },
        body: JSON.stringify({
          buyerAddress: xnRecipient,
          connectedWallet,
          network,
          usdtAmount: result.usdtAmount,
          xnAmount: result.xnTokens,
          txHash: result.txHash || `${senderAddress}_${Date.now()}`,
        }),
      });
      const tokenData = await tokenRes.json();
      tokenSent = tokenData.success === true;
      tokenTxHash = tokenData.txHash;
      if (!tokenSent) {
        tokenError = tokenData.error;
        console.error("[check-payment] send-tokens failed:", tokenData.error);
      }
    } catch (err: any) {
      tokenError = err.message;
      console.error("[check-payment] send-tokens fetch failed:", err.message);
    }

    return NextResponse.json({
      success: true,
      data: {
        network,
        senderAddress,
        txHash: result.txHash,
        usdtAmount: result.usdtAmount,
        xnTokens: result.xnTokens,
        status: "verified",
        tokenSent,
        ...(tokenTxHash && { tokenTxHash }),
        ...(tokenError && { tokenError }),
      },
    });
  } catch (err: any) {
    console.error("check-payment error:", err);
    return NextResponse.json({ success: false, error: err.message || "Check failed" }, { status: 500 });
  }
}
