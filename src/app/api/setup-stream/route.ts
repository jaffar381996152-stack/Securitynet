import { NextRequest, NextResponse } from "next/server";
import Moralis from "moralis";

// Hit POST /api/setup-stream with { secret: YOUR_ADMIN_SECRET } once to register streams.

const USDT_CONTRACTS: Record<string, string> = {
  BSC: "0x55d398326f99059ff775485246999027b3197955", // BSC Mainnet USDT
  ETH: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // ETH Mainnet USDT
};

const MORALIS_CHAINS: Record<string, string> = {
  BSC: "0x38",
  ETH: "0x1",
};

export async function POST(req: NextRequest) {
  const { secret } = await req.json();
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/moralis-webhook`;
  const bscDeposit = process.env.NEXT_PUBLIC_DEPOSIT_WALLET_BSC || "";
  const ethDeposit = process.env.NEXT_PUBLIC_DEPOSIT_WALLET_ETH || "";

  if (!bscDeposit || !ethDeposit) {
    return NextResponse.json({ success: false, error: "Deposit wallets not configured in env" }, { status: 400 });
  }

  // Always start fresh — don't reuse a potentially broken prior instance
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const results = [];

  for (const [network, chain] of Object.entries(MORALIS_CHAINS)) {
    const depositAddress = network === "BSC" ? bscDeposit : ethDeposit;
    const usdtContract = USDT_CONTRACTS[network];

    const stream = await (Moralis.Streams.add as any)({
      chains: [chain],
      description: `USDT deposits to SecurityNet ${network} wallet`,
      tag: `securitynet_usdt_${network.toLowerCase()}`,
      webhookUrl,
      includeNativeTxs: false,
      includeContractLogs: true,
      topic0: ["Transfer(address,address,uint256)"],
      abi: [{
        anonymous: false,
        inputs: [
          { indexed: true, name: "from", type: "address" },
          { indexed: true, name: "to", type: "address" },
          { indexed: false, name: "value", type: "uint256" },
        ],
        name: "Transfer",
        type: "event",
      }],
      advancedOptions: [{
        topic0: "Transfer(address,address,uint256)",
        filter: { eq: ["to", depositAddress.toLowerCase()] },
      }],
    });

    const streamId = stream.toJSON().id;

    await Moralis.Streams.addAddress({
      id: streamId,
      address: [usdtContract],
    });

    results.push({ network, streamId, usdtContract, depositAddress });
    console.log(`[setup-stream] Created ${network} stream: ${streamId}`);
  }

  return NextResponse.json({ success: true, data: { streams: results } });
}
