import { getCollection } from "@/app/libs/mongodb";

// The contract address shown in the home FAQ (0x917D...) is stale — the
// real XN token contract lives in env vars and is what send-tokens/check-payment
// actually use. Always prefer that for anything the agent tells users.
const XN_CONTRACT =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS ||
  process.env.XN_TOKEN_CONTRACT_ADDRESS ||
  "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0";

export function buildSiteKnowledge(): string {
  return `
# SecurityNet.ai — Knowledge Base

SecurityNet.ai is an AI-powered blockchain security platform. XN is its native
BEP-20 utility token, currently in a public presale.

## XN Token Basics
- Symbol: XN · Standard: BEP-20 (Binance Smart Chain) · Decimals: 18
- Token contract address (for wallet import / verification): ${XN_CONTRACT}
- Total supply: 100,000,000 XN — fixed, no inflation

## Token Utility (5 uses)
1. Transaction Fees — pay platform/API/on-chain fees at a discount using XN
2. Staking Rewards — stake XN to earn yield from network activity
3. AI Service Payments — exclusive currency for premium AI security tools & intelligence feeds
4. Governance Voting — 1 XN = 1 vote on protocol upgrades, parameters, treasury
5. Ecosystem Access — holding XN above thresholds unlocks premium tiers & early access

## Token Allocation (of 100,000,000 total)
- Presale: 40% (40,000,000 XN) — unlocked at TGE (Token Generation Event)
- Ecosystem Reserve: 20% (20,000,000 XN) — 24-month linear vesting
- Treasury: 15% (15,000,000 XN) — 36-month linear vesting
- Team: 10% (10,000,000 XN) — 6-month cliff, then vests months 6–24
- Liquidity: 8% (8,000,000 XN) — locked 12 months
- Marketing: 7% (7,000,000 XN) — 18-month linear vesting

## Presale — Current Status
- 5 stages total. Stage 3 is LIVE NOW.
  - Stage 1: $0.10 USDT — closed
  - Stage 2: $0.15 USDT — closed
  - Stage 3: $0.20 USDT — ACTIVE (currently ~78% filled, ~18,240 XN remaining before Stage 4 opens)
  - Stage 4: $0.35 USDT — upcoming
  - Stage 5: $0.55 USDT — final presale price
- Target exchange listing price: $0.80 USDT (≈4x potential vs. Stage 3 price). This is a target, not a guarantee.
- Minimum purchase: $10 USDT (= 50 XN at the current $0.20 Stage 3 price). No maximum purchase limit.
- Target exchange listing: Q2 2026 (applications submitted to Tier-1/Tier-2 exchanges).

## How to Buy XN (4 steps)
1. Connect Your Wallet — MetaMask, Coinbase Wallet, Trust Wallet, or any WalletConnect-compatible wallet.
2. Select Network — choose BEP-20 (Binance Smart Chain), ERC-20 (Ethereum), or TRC-20 (Tron). Payments are made in USDT.
3. Send USDT — enter the USDT amount (min $10) and send to the deposit address shown live on the /presale page for the selected network. ALWAYS double-check the address shown on-site before sending — never use an address from anywhere else, including a previous answer in this chat.
4. Receive XN — tokens are credited automatically within ~2 minutes of payment confirmation. Import the XN contract address (${XN_CONTRACT}) into your wallet to see the balance.

## Security
- The XN smart contract has been independently audited by a blockchain security firm; a second audit is underway ahead of the Token Generation Event.
- Purchases are non-custodial — users always control their own wallet/keys.
- Payments are verified on-chain automatically (auto-checked every ~15 seconds after sending).

## Key Pages
- /presale — buy XN, live stage info, FAQ
- /tokenomics — full allocation breakdown & vesting schedule
- /how-to-buy — step-by-step video guide
- /about — company background
- /services — SecurityNet's security/AI services
- /news — blog & announcements
- /whitepaper — full technical & tokenomics whitepaper
- /contact-us — support contact
`.trim();
}

type NewsItem = {
  title: string;
  excerpt?: string;
  category?: string;
  slug: string;
  publishedAt?: string;
};

let newsCache: { text: string; expiresAt: number } | null = null;
const NEWS_CACHE_TTL_MS = 5 * 60_000;

// Recent published posts, formatted for the system prompt. Cached briefly
// so a burst of chat messages doesn't hammer the DB.
export async function getNewsBrief(): Promise<string> {
  const now = Date.now();
  if (newsCache && newsCache.expiresAt > now) return newsCache.text;

  try {
    const col = await getCollection("posts");
    const posts = (await col
      .find({ status: "published" }, { projection: { title: 1, excerpt: 1, category: 1, slug: 1, publishedAt: 1 } })
      .sort({ publishedAt: -1 })
      .limit(5)
      .toArray()) as unknown as NewsItem[];

    let text = "";
    if (posts.length > 0) {
      const lines = posts.map((p) => {
        const date = p.publishedAt ? new Date(p.publishedAt).toISOString().slice(0, 10) : "";
        return `- [${p.category || "General"}] "${p.title}" (${date}) — ${p.excerpt || ""} (read more: /news/${p.slug})`;
      });
      text = `## Recent News & Announcements\n${lines.join("\n")}`;
    }

    newsCache = { text, expiresAt: now + NEWS_CACHE_TTL_MS };
    return text;
  } catch {
    return "";
  }
}
