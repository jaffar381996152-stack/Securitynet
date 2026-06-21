"use client";
import settings from "../../../data/settings";

const XN_CONTRACT =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS || settings.CONTRACT_ADDRESS;

// XN is a BEP-20 token, so the connected wallet's holdings always live on BSC —
// regardless of which network the buyer paid USDT on. This page shows their XN
// balance straight on BscScan, so it's both always-valid and on-point proof of
// receipt (unlike the payment tx hash, which is on Ethereum/Tron for those
// networks and would 404 on BscScan).
const holdingsUrl = (address) =>
  `https://bscscan.com/token/${XN_CONTRACT}?a=${address}`;

function fmtXn(n) {
  if (n === null || n === undefined || isNaN(n)) return null;
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 4 });
}

/**
 * On-site proof-of-receipt block for the post-payment success screen.
 *
 * Holds no logic of its own — it's fed the live balance + `received` flag from
 * useXnTokenBalance, so both purchase widgets show identical behaviour. The
 * buyer sees their XN balance read straight from the chain ("you now hold X
 * XN") the moment the tokens land, with a BscScan link to their holdings — no
 * wallet import required to know it arrived.
 *
 * `tokenSent` reflects whether the automated XN transfer actually went through.
 * When it's false we don't promise receipt (the balance would never rise), we
 * tell the buyer it's being processed instead of spinning "confirming" forever.
 */
export default function XnReceipt({ balance, received, address, tokenSent = true, compact = false }) {
  const value = fmtXn(balance);
  const failed = tokenSent === false;
  const accent = received ? "var(--c-success)" : "var(--gold)";

  return (
    <div
      style={{
        marginTop: compact ? 16 : 20,
        border: `1px solid ${received ? "rgba(74,140,111,0.45)" : "var(--border-gold)"}`,
        background: received ? "rgba(74,140,111,0.07)" : "var(--gold-ghost)",
        padding: compact ? "12px 14px" : "16px 18px",
        textAlign: "center",
        transition: "all 0.3s ease",
      }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
        YOUR XN BALANCE
      </div>

      <div style={{ fontFamily: "var(--font-mono)", fontSize: compact ? 18 : 22, fontWeight: 700, color: accent, letterSpacing: "0.02em" }}>
        {value === null ? "READING…" : `${value} XN`}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginTop: 8 }}>
        {received ? (
          <>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
              <path d="M5 13l4 4L19 7" stroke="var(--c-success)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-success)" }}>
              RECEIVED · NOW IN YOUR WALLET
            </span>
          </>
        ) : (
          <>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", display: "inline-block", animation: "ubPulse 1.4s ease-in-out infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)" }}>
              {failed ? "DELIVERY PROCESSING — XN WILL ARRIVE SHORTLY" : "CONFIRMING RECEIPT ON-CHAIN…"}
            </span>
          </>
        )}
      </div>

      {address && (
        <a
          href={holdingsUrl(address)}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)", textDecoration: "none", borderBottom: "1px solid var(--border-gold)", paddingBottom: 2 }}
        >
          VERIFY ON BSCSCAN →
        </a>
      )}
    </div>
  );
}
