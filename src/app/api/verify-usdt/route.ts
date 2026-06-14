import { NextRequest, NextResponse } from "next/server";
import Moralis from "moralis";
import { rateLimit } from "@/app/libs/rateLimit";
import { isValidWalletAddress, isValidTxHash, isValidAmount } from "@/app/libs/validators";

// USDT contract addresses per chain
const USDT_CONTRACTS: Record<string, string> = {
  BSC: "0x55d398326f99059ff775485246999027b3197955",
  ETH: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
};

// Deposit wallet addresses — same NEXT_PUBLIC_ vars the buy page displays
// (data/settings.js), so displayed and watched addresses can never diverge.
const DEPOSIT_WALLETS: Record<string, string> = {
  BSC: process.env.NEXT_PUBLIC_DEPOSIT_WALLET_BSC || "",
  ETH: process.env.NEXT_PUBLIC_DEPOSIT_WALLET_ETH || "",
  TRON: process.env.NEXT_PUBLIC_DEPOSIT_WALLET_TRON || "",
};

// Moralis chain IDs
const MORALIS_CHAINS: Record<string, string> = {
  BSC: "0x38",
  ETH: "0x1",
};

// USDT decimals per chain
const USDT_DECIMALS: Record<string, number> = {
  BSC: 18,
  ETH: 6,
};

// XN token price in USDT
const XN_PRICE_USDT = 0.20;

let moralisInitialized = false;

async function initMoralis() {
  if (!moralisInitialized) {
    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });
    moralisInitialized = true;
  }
}

async function verifyTronTransaction(
  txHash: string,
  expectedAmount: number,
  senderAddress: string
): Promise<{ valid: boolean; error?: string; usdtAmount?: number }> {
  // Tron uses TronGrid API (free, no key needed for basic use)
  const tronGridUrl = `https://api.trongrid.io/v1/transactions/${txHash}`;
  const res = await fetch(tronGridUrl, {
    headers: { "TRON-PRO-API-KEY": process.env.TRONGRID_API_KEY || "" },
  });

  if (!res.ok) {
    return { valid: false, error: "Could not fetch TRON transaction" };
  }

  const data = await res.json();
  const tx = data?.data?.[0];

  if (!tx) return { valid: false, error: "Transaction not found on TRON" };

  // Must be confirmed
  if (tx.ret?.[0]?.contractRet !== "SUCCESS") {
    return { valid: false, error: "Transaction not confirmed" };
  }

  const contract = tx.raw_data?.contract?.[0];
  if (contract?.type !== "TriggerSmartContract") {
    return { valid: false, error: "Not a TRC-20 transfer" };
  }

  const contractData = contract?.parameter?.value;
  const toAddress: string = contractData?.contract_address || "";

  // TRON USDT contract
  if (toAddress.toLowerCase() !== "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t".toLowerCase()) {
    return { valid: false, error: "Not a USDT transaction" };
  }

  // Decode TRC-20 transfer data: method(4) + to(32) + amount(32)
  const data_hex: string = contractData?.data || "";
  if (!data_hex.startsWith("a9059cbb")) {
    return { valid: false, error: "Not a transfer call" };
  }

  const toHex = data_hex.slice(32, 72); // 32 chars for method + padding
  const amountHex = data_hex.slice(72, 136);
  const rawAmount = BigInt("0x" + amountHex);
  const usdtAmount = Number(rawAmount) / 1e6; // TRC-20 USDT has 6 decimals

  const depositWallet = DEPOSIT_WALLETS.TRON.toLowerCase();
  const recipient = toHex.replace(/^0+/, "").toLowerCase();

  if (!depositWallet || !recipient.includes(depositWallet.replace(/^T/, "").toLowerCase())) {
    return { valid: false, error: "USDT not sent to correct deposit address" };
  }

  if (Math.abs(usdtAmount - expectedAmount) > 0.01) {
    return {
      valid: false,
      error: `Amount mismatch: expected ${expectedAmount} USDT, got ${usdtAmount} USDT`,
    };
  }

  return { valid: true, usdtAmount };
}

async function verifyEVMTransaction(
  network: string,
  txHash: string,
  expectedAmount: number,
  senderAddress: string
): Promise<{ valid: boolean; error?: string; usdtAmount?: number }> {
  await initMoralis();

  const chain = MORALIS_CHAINS[network];
  const usdtContract = USDT_CONTRACTS[network];
  const decimals = USDT_DECIMALS[network];
  const depositWallet = DEPOSIT_WALLETS[network]?.toLowerCase();

  if (!depositWallet) {
    return { valid: false, error: `No deposit wallet configured for ${network}` };
  }

  // Fetch ERC-20 token transfers for this tx hash
  const response = await Moralis.EvmApi.transaction.getTransactionVerbose({
    chain,
    transactionHash: txHash,
  });

  const tx = response.toJSON();

  // Must be confirmed (has block number)
  if (!tx.block_number) {
    return { valid: false, error: "Transaction not yet confirmed" };
  }

  // Find USDT transfer log to our deposit address
  const logs = tx.logs || [];
  const transferTopic = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  const usdtTransfer = logs.find((log: any) => {
    return (
      log.address?.toLowerCase() === usdtContract.toLowerCase() &&
      log.topic0?.toLowerCase() === transferTopic &&
      log.topic2 &&
      ("0x" + log.topic2.slice(-40)).toLowerCase() === depositWallet
    );
  });

  if (!usdtTransfer) {
    return {
      valid: false,
      error: `No USDT transfer to deposit address found in this transaction`,
    };
  }

  // Decode amount from log data
  const rawAmount = BigInt(usdtTransfer.data || "0x0");
  const usdtAmount = Number(rawAmount) / Math.pow(10, decimals);

  if (Math.abs(usdtAmount - expectedAmount) > 0.01) {
    return {
      valid: false,
      error: `Amount mismatch: expected ${expectedAmount} USDT, got ${usdtAmount} USDT`,
    };
  }

  return { valid: true, usdtAmount };
}

export async function POST(req: NextRequest) {
  const limited = rateLimit(req, "verify-usdt", 10);
  if (limited) return limited;

  try {
    const { network, txHash, senderAddress, usdtAmount } = await req.json();

    if (!network || !txHash || !usdtAmount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: network, txHash, usdtAmount" },
        { status: 400 }
      );
    }

    if (!["BSC", "ETH", "TRON"].includes(network)) {
      return NextResponse.json(
        { success: false, error: "Invalid network. Must be BSC, ETH, or TRON" },
        { status: 400 }
      );
    }

    if (!isValidTxHash(txHash, network)) {
      return NextResponse.json(
        { success: false, error: "Invalid transaction hash format" },
        { status: 400 }
      );
    }

    if (senderAddress && !isValidWalletAddress(senderAddress, network)) {
      return NextResponse.json(
        { success: false, error: "Invalid wallet address format" },
        { status: 400 }
      );
    }

    const amount = parseFloat(usdtAmount);
    if (!isValidAmount(amount) || amount < 10) {
      return NextResponse.json(
        { success: false, error: "Minimum contribution is 10 USDT" },
        { status: 400 }
      );
    }

    // Verify transaction on-chain
    let result: { valid: boolean; error?: string; usdtAmount?: number };

    if (network === "TRON") {
      result = await verifyTronTransaction(txHash, amount, senderAddress);
    } else {
      result = await verifyEVMTransaction(network, txHash, amount, senderAddress);
    }

    if (!result.valid) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    const xnTokens = (result.usdtAmount! / XN_PRICE_USDT).toFixed(4);

    return NextResponse.json({
      success: true,
      message: "Transaction verified successfully",
      data: {
        network,
        txHash,
        senderAddress,
        usdtAmount: result.usdtAmount,
        xnTokens,
        status: "verified",
      },
    });
  } catch (err: any) {
    console.error("verify-usdt error:", err);
    return NextResponse.json(
      { success: false, error: err.message || "Verification failed" },
      { status: 500 }
    );
  }
}
