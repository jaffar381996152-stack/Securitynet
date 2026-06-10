import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "securitynet";

if (!uri) {
  console.error("MONGODB_URI is not set");
  process.exit(1);
}

const POSTS = [
  {
    slug: "securitynet-stage-3-presale-now-live",
    title: "SecurityNet Stage 3 Presale Now Live — XN at $0.20 USDT",
    category: "Announcement",
    excerpt:
      "Stage 3 of the XN token presale is officially open. With Stages 1 and 2 fully subscribed and closed, early believers now have a final window to acquire XN at below-listing pricing before exchange listings begin in Q2 2026.",
    publishedAt: "2024-12-15T00:00:00.000Z",
    readTime: 4,
    thumbLabel: ["STAGE 3", "LIVE NOW"],
    content: [
      {
        type: "text",
        value:
          "Stage 3 of the XN token presale is officially open. With Stages 1 and 2 fully subscribed and closed, early believers now have a final window to acquire XN at below-listing pricing before exchange listings begin in Q2 2026.",
      },
      {
        type: "text",
        value:
          "Stage 3 is priced at $0.20 USDT per XN, a meaningful step up from the Stage 1 and 2 rounds, reflecting the project's continued momentum — completed audits, growing partnerships, and an expanding security platform already protecting real on-chain activity.",
      },
      {
        type: "text",
        value:
          "Participants can purchase XN directly through the presale dashboard using USDT, ETH, or BNB. All tokens are subject to the published vesting schedule, with full details available in our tokenomics documentation.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "how-to-buy-xn-tokens-in-4-simple-steps",
    title: "How to Buy XN Tokens in 4 Simple Steps",
    category: "Guide",
    excerpt:
      "A complete walkthrough for first-time crypto buyers — from wallet setup to receiving XN in under 10 minutes.",
    publishedAt: "2024-11-28T00:00:00.000Z",
    readTime: 6,
    thumbLabel: ["BUY", "GUIDE"],
    content: [
      {
        type: "text",
        value:
          "A complete walkthrough for first-time crypto buyers — from wallet setup to receiving XN in under 10 minutes.",
      },
      {
        type: "text",
        value:
          "Step 1: Set up a non-custodial wallet such as MetaMask or Trust Wallet, and ensure it's funded with USDT, ETH, or BNB. Step 2: Connect your wallet to the official SecurityNet presale dashboard. Step 3: Enter the amount of XN you'd like to purchase and confirm the transaction in your wallet.",
      },
      {
        type: "text",
        value:
          "Step 4: Once the transaction confirms on-chain, your XN allocation is recorded immediately and will become claimable according to the vesting schedule after the token generation event (TGE). Always double-check contract addresses against the official SecurityNet channels before sending funds.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "q3-2024-threat-report-ai-powered-attacks-rising-340",
    title: "Q3 2024 Threat Report: AI-Powered Attacks Rising 340%",
    category: "Security",
    excerpt:
      "Our security research team analyzed 2.4 million on-chain transactions. The findings are alarming — and they underscore why SecurityNet exists.",
    publishedAt: "2024-11-14T00:00:00.000Z",
    readTime: 11,
    thumbLabel: ["THREAT", "REPORT"],
    content: [
      {
        type: "text",
        value:
          "Our security research team analyzed 2.4 million on-chain transactions. The findings are alarming — and they underscore why SecurityNet exists.",
      },
      {
        type: "text",
        value:
          "AI-powered attack tooling has made sophisticated exploit techniques — flash loan manipulation, reentrancy chaining, and oracle manipulation — accessible to a far wider pool of bad actors. Automated bots now scan new contract deployments within seconds of going live, probing for the same classes of vulnerabilities that once required deep manual expertise.",
      },
      {
        type: "text",
        value:
          "The report breaks down attack vectors by frequency, total value extracted, and time-to-exploit, and outlines the defensive patterns that proved most effective for protocols that successfully repelled attempted exploits during the quarter.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "securitynet-partners-with-bnb-chain",
    title: "SecurityNet Partners with BNB Chain to Secure DeFi Ecosystem",
    category: "Partnership",
    excerpt:
      "SecurityNet's threat detection engine will be integrated natively into BNB Chain's validator infrastructure, providing real-time security for $8B+ in TVL.",
    publishedAt: "2024-10-29T00:00:00.000Z",
    readTime: 5,
    thumbLabel: ["PARTNER", "SHIP"],
    content: [
      {
        type: "text",
        value:
          "SecurityNet's threat detection engine will be integrated natively into BNB Chain's validator infrastructure, providing real-time security for $8B+ in TVL.",
      },
      {
        type: "text",
        value:
          "This partnership marks a significant milestone for SecurityNet — moving from an external monitoring layer to a native component of one of the largest DeFi ecosystems by total value locked. Validators running the integration will receive real-time threat alerts directly at the consensus layer.",
      },
      {
        type: "text",
        value:
          "Rollout begins with a phased deployment across opt-in validator nodes, with full ecosystem coverage targeted for early 2025. SecurityNet will continue publishing transparency reports on detection accuracy and response times throughout the rollout.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "smart-contract-audit-complete-zero-critical-findings",
    title: "Smart Contract Audit Complete — Zero Critical Findings",
    category: "Update",
    excerpt:
      "CertiK has completed its independent audit of the XN token contract and presale infrastructure. Full report published on-chain.",
    publishedAt: "2024-10-10T00:00:00.000Z",
    readTime: 3,
    thumbLabel: ["AUDIT", "PASS"],
    content: [
      {
        type: "text",
        value:
          "CertiK has completed its independent audit of the XN token contract and presale infrastructure. Full report published on-chain.",
      },
      {
        type: "text",
        value:
          "The audit covered the XN ERC-20 token contract, the presale and vesting contracts, and the staking module, examining each for reentrancy risks, access control issues, integer overflow conditions, and logic errors. Zero critical or high-severity findings were identified.",
      },
      {
        type: "text",
        value:
          "A small number of informational and gas-optimization recommendations were addressed prior to mainnet deployment. The full audit report is permanently available via the link published in our official documentation and on-chain references.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "how-on-chain-ai-detects-flash-loan-attacks",
    title: "How On-Chain AI Detects Flash Loan Attacks in Real Time",
    category: "AI",
    excerpt:
      "A deep dive into the technical architecture behind SecurityNet's flash loan detection engine — and why traditional security tools always arrive too late.",
    publishedAt: "2024-09-22T00:00:00.000Z",
    readTime: 9,
    thumbLabel: ["AI", "DETECT"],
    content: [
      {
        type: "text",
        value:
          "A deep dive into the technical architecture behind SecurityNet's flash loan detection engine — and why traditional security tools always arrive too late.",
      },
      {
        type: "text",
        value:
          "Flash loan attacks execute and complete within a single transaction block, meaning by the time a traditional alerting system notices anomalous activity, the funds are already gone. SecurityNet's detection engine instead operates at the mempool level, modeling the likely state changes of pending transactions before they're confirmed.",
      },
      {
        type: "text",
        value:
          "Our models are trained on historical exploit patterns across hundreds of protocols, allowing the system to flag transaction sequences that resemble known attack shapes — even when the specific contracts involved have never been seen before — and trigger automated countermeasures in milliseconds.",
      },
    ],
    status: "published",
    coverImage: "",
  },
  {
    slug: "understanding-xn-token-vesting-and-unlock-schedule",
    title: "Understanding XN Token Vesting and Unlock Schedule",
    category: "Guide",
    excerpt:
      "Everything presale investors need to know about when tokens unlock, how vesting protects price stability, and what the TGE will look like.",
    publishedAt: "2024-09-08T00:00:00.000Z",
    readTime: 7,
    thumbLabel: ["VEST", "GUIDE"],
    content: [
      {
        type: "text",
        value:
          "Everything presale investors need to know about when tokens unlock, how vesting protects price stability, and what the TGE will look like.",
      },
      {
        type: "text",
        value:
          "XN tokens purchased during the presale are subject to a vesting schedule designed to align long-term holder incentives with the project's growth and to protect against immediate sell pressure at the token generation event (TGE).",
      },
      {
        type: "text",
        value:
          "A portion of each allocation unlocks at TGE, with the remainder vesting linearly over the following months. Vesting percentages and durations vary slightly by presale stage, with earlier-stage participants receiving the most favorable terms. Full per-stage schedules are available in the tokenomics documentation.",
      },
    ],
    status: "published",
    coverImage: "",
  },
];

const client = new MongoClient(uri);

try {
  await client.connect();
  const col = client.db(dbName).collection("posts");

  for (const post of POSTS) {
    const now = post.publishedAt;
    await col.updateOne(
      { slug: post.slug },
      { $set: { ...post, createdAt: now, updatedAt: now } },
      { upsert: true }
    );
    console.log(`Upserted: ${post.slug}`);
  }

  console.log(`Done. Seeded ${POSTS.length} posts.`);
} finally {
  await client.close();
}
