// Shared input-format validators for API routes that accept user-supplied
// blockchain/financial data. These check *shape*, not business validity
// (e.g. a wallet address can be well-formed and still belong to no one).

const EVM_ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;
const TRON_ADDRESS_RE = /^T[a-zA-Z0-9]{33}$/;
const EVM_TX_HASH_RE = /^0x[a-fA-F0-9]{64}$/;
const TRON_TX_HASH_RE = /^[a-fA-F0-9]{64}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidWalletAddress(address: unknown, network?: string): boolean {
  if (typeof address !== "string" || !address) return false;
  if (network === "TRON") return TRON_ADDRESS_RE.test(address);
  return EVM_ADDRESS_RE.test(address);
}

export function isValidTxHash(hash: unknown, network?: string): boolean {
  if (typeof hash !== "string" || !hash) return false;
  if (network === "TRON") return TRON_TX_HASH_RE.test(hash);
  return EVM_TX_HASH_RE.test(hash);
}

export function isValidEmail(email: unknown): boolean {
  return typeof email === "string" && EMAIL_RE.test(email);
}

// Guards against non-numeric, negative, zero, or absurdly large amounts
// (USDT presale purchases are bounded well under this ceiling).
export function isValidAmount(amount: unknown, max = 1_000_000): boolean {
  const n = typeof amount === "string" ? Number(amount) : amount;
  return typeof n === "number" && Number.isFinite(n) && n > 0 && n <= max;
}

// Caps on admin-authored blog-post fields — these routes are admin-only,
// but a compromised admin session (or buggy client) shouldn't be able to
// write pathologically large documents into Mongo. Limits are set well
// above any realistic blog post (200 chars ≈ a long headline; 300 blocks
// of 100k chars each ≈ tens of printed pages of content).
export function isValidPostTitle(title: unknown): boolean {
  return typeof title === "string" && title.trim().length > 0 && title.length <= 200;
}

export function isValidPostContent(content: unknown): boolean {
  if (!Array.isArray(content) || content.length === 0 || content.length > 300) return false;
  return content.every(
    (block) =>
      typeof (block as { value?: unknown })?.value !== "string" ||
      (block as { value: string }).value.length <= 100_000
  );
}
