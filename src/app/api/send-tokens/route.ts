import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { getCollection } from "@/app/libs/mongodb";
import { rateLimit } from "@/app/libs/rateLimit";
import { isValidWalletAddress, isValidTxHash, isValidAmount } from "@/app/libs/validators";

const BSC_RPC = "https://bsc-dataseed1.binance.org/"; // BSC Mainnet

const XN_TOKEN_ABI = [
  "function decimals() view returns (uint8)",
  "function balanceOf(address account) view returns (uint256)",
  "function transfer(address to, uint256 value) returns (bool)",
];

const XN_TOKEN_ADDRESS = process.env.XN_TOKEN_CONTRACT_ADDRESS || "";


async function isAlreadyProcessed(txHash: string): Promise<boolean> {
  const col = await getCollection("xnTokenPurchases");
  const existing = await col.findOne({ txHash });
  return !!existing;
}

async function savePurchase(data: {
  txHash: string;
  buyerAddress: string;
  connectedWallet?: string;
  network: string;
  usdtAmount: number;
  xnAmount: string;
  sendTxHash: string;
  status: string;
}) {
  const col = await getCollection("xnTokenPurchases");
  await col.updateOne(
    { txHash: data.txHash },
    { $set: { ...data, updatedAt: new Date().toISOString() }, $setOnInsert: { createdAt: new Date().toISOString() } },
    { upsert: true }
  );
}

// ── Token transfer ───────────────────────────────────────────────────────────
async function sendXNTokens(
  buyerAddress: string,
  xnAmount: string
): Promise<{ success: boolean; txHash?: string; error?: string }> {
  const privateKey = process.env.OWNER_PRIVATE_KEY;

  if (!privateKey) return { success: false, error: "Owner wallet not configured — token sending is disabled in this environment" };
  if (!XN_TOKEN_ADDRESS) return { success: false, error: "XN token contract address not configured" };

  try {
    const provider = new ethers.JsonRpcProvider(BSC_RPC);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contract = new ethers.Contract(XN_TOKEN_ADDRESS, XN_TOKEN_ABI, wallet);

    const decimals: number = await contract.decimals();
    const amount = ethers.parseUnits(xnAmount, decimals);

    const ownerBalance = await contract.balanceOf(wallet.address);
    if (ownerBalance < amount) {
      return { success: false, error: `Insufficient XN balance. Owner has ${ethers.formatUnits(ownerBalance, decimals)} XN` };
    }

    const tx = await contract.transfer(buyerAddress, amount);
    await tx.wait();

    return { success: true, txHash: tx.hash };
  } catch (err: any) {
    return { success: false, error: err.message || "Token transfer failed" };
  }
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "send-tokens", 5);
  if (limited) return limited;

  // This route moves real XN out of the owner wallet on the caller's say-so —
  // it must only ever be reached server-to-server from check-payment/moralis-webhook,
  // which have already independently verified the on-chain transaction. A direct
  // browser call could pair a real-but-unrelated txHash with an inflated xnAmount
  // and drain the owner wallet. ADMIN_SECRET doubles as the internal-call credential
  // here so no extra production secret needs provisioning.
  const internalSecret = req.headers.get("x-internal-secret");
  if (!process.env.ADMIN_SECRET || internalSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: "Forbidden" }, { status: 403 });
  }

  try {
    const { buyerAddress, connectedWallet, network, usdtAmount, xnAmount, txHash } = await req.json();

    if (!buyerAddress || !usdtAmount || !xnAmount || !txHash) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidWalletAddress(buyerAddress, network)) {
      return NextResponse.json({ success: false, error: "Invalid wallet address format" }, { status: 400 });
    }
    if (!isValidTxHash(txHash, network)) {
      return NextResponse.json({ success: false, error: "Invalid transaction hash format" }, { status: 400 });
    }
    if (!isValidAmount(usdtAmount) || !isValidAmount(xnAmount)) {
      return NextResponse.json({ success: false, error: "Invalid amount" }, { status: 400 });
    }

    // Prevent double processing
    const alreadyDone = await isAlreadyProcessed(txHash);
    if (alreadyDone) {
      return NextResponse.json({ success: false, error: "Transaction already processed" }, { status: 409 });
    }

    // Save pending record immediately to prevent race conditions
    await savePurchase({ txHash, buyerAddress, connectedWallet, network, usdtAmount, xnAmount, sendTxHash: "pending", status: "pending" });

    const result = await sendXNTokens(buyerAddress, xnAmount);

    if (!result.success) {
      await savePurchase({ txHash, buyerAddress, connectedWallet, network, usdtAmount, xnAmount, sendTxHash: "failed", status: "failed" });
      console.error(`[send-tokens] Failed to send ${xnAmount} XN to ${buyerAddress}:`, result.error);
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

    await savePurchase({ txHash, buyerAddress, connectedWallet, network, usdtAmount, xnAmount, sendTxHash: result.txHash!, status: "completed" });
    console.log(`[send-tokens] Sent ${xnAmount} XN to ${buyerAddress} — tx: ${result.txHash}`);

    return NextResponse.json({
      success: true,
      data: { buyerAddress, xnAmount, sendTxHash: result.txHash, status: "completed" },
    });
  } catch (err: any) {
    console.error("send-tokens error:", err);
    return NextResponse.json({ success: false, error: err.message || "Failed to send tokens" }, { status: 500 });
  }
}
