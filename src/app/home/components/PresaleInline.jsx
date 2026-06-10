"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";
import DeclassifyText from "./DeclassifyText";
import { useAppKitAccount } from "@reown/appkit/react";
import useWalletConnectGate from "@/hooks/useWalletConnectGate";

const XN_PRICE   = 0.20;
const SOLD_PCT   = 78;
const RAISED     = "$847,230";
const XN_SOLD    = "4,236,150";
const CONTRACT   = "0x917D93261B6b232F6b8b643d65b48928D1c85FFc";

const PROOF_ITEMS = [
  "0x3f…2a bought 2,500 XN · 5 min ago",
  "0x9b…4c bought 500 XN · 8 min ago",
  "0xa7…1d bought 10,000 XN · 12 min ago",
  "0x2e…8f bought 1,250 XN · 19 min ago",
];

function useCounter(target, inView, duration = 1800) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - pct, 3);
      setVal(Math.round(ease * target));
      if (pct < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return val;
}

export default function PresaleInline() {
  const { address, isConnected } = useAppKitAccount();
  const { connectWallet } = useWalletConnectGate();

  const [network, setNetwork]     = useState("BSC");
  const [usdtAmt, setUsdtAmt]     = useState(100);
  const [xnAmt, setXnAmt]         = useState((100 / XN_PRICE).toFixed(2));
  const [copied, setCopied]       = useState(false);
  const [inView, setInView]       = useState(false);

  const sectionRef = useRef(null);
  const raisedCount = useCounter(847230, inView);
  const xnCount    = useCounter(4236150, inView);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleUsdt = (v) => { setUsdtAmt(v); setXnAmt((parseFloat(v) / XN_PRICE).toFixed(2)); };
  const handleXn   = (v) => { setXnAmt(v);   setUsdtAmt((parseFloat(v) * XN_PRICE).toFixed(2)); };

  const copyAddr = () => {
    navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const DEPOSIT_ADDRESS = {
    BSC:  CONTRACT,
    ETH:  "0x917D93261B6b232F6b8b643d65b48928D1c85FFc",
    TRON: "TPresaleAddressTRC20xxxxxxxxxx",
  };

  return (
    <section
      ref={sectionRef}
      className="section-py"
      style={{
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border-sub)",
        borderBottom: "1px solid var(--border-sub)",
        overflow: "hidden",
      }}
    >
      <div className="container">
        <div
          className="presale-inline-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(32px,5vw,72px)",
            alignItems: "start",
          }}
        >

          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <FadeUpSection>
            {/* Eyebrow with pulsing dot */}
            <div className="badge" style={{ marginBottom: 20 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
              ACTIVE PRESALE
            </div>

            {/* Title */}
            <h2
              style={{
                fontFamily: "var(--font-disp)",
                fontWeight: 800,
                fontSize: "var(--lg-size)",
                textTransform: "uppercase",
                lineHeight: 1,
                letterSpacing: "-0.01em",
                color: "var(--text-primary)",
                marginBottom: 20,
              }}
            >
              <DeclassifyText text="SECURE YOUR" delay={0.1} />
              <br />
              <DeclassifyText text="POSITION." delay={0.3} style={{ color: "var(--gold)" }} />
            </h2>

            {/* Body */}
            <p
              style={{
                fontFamily: "var(--font-disp)",
                fontSize: 16,
                color: "var(--text-muted)",
                lineHeight: 1.7,
                marginBottom: 32,
                maxWidth: 460,
              }}
            >
              Stage 3 is live. Each stage closes permanently when filled. Secure XN at $0.20 USDT before Stage 4 launches at a higher price.
            </p>

            {/* Stats 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 28 }}>
              {[
                { label: "TOTAL RAISED",   value: inView ? `$${raisedCount.toLocaleString()}` : "$0" },
                { label: "XN SOLD",        value: inView ? xnCount.toLocaleString() : "0" },
                { label: "CURRENT PRICE",  value: "$0.20 USDT" },
                { label: "LISTING PRICE",  value: "$0.80 USDT" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg-primary)",
                    border: "1px solid var(--border-sub)",
                    padding: "18px 20px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 22, color: "var(--text-primary)", lineHeight: 1 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* ROI line — Cormorant italic */}
            <p
              style={{
                fontFamily: "var(--font-ed)",
                fontStyle: "italic",
                fontSize: 18,
                color: "var(--text-sec)",
                lineHeight: 1.5,
                marginBottom: 28,
              }}
            >
              Early investors can see up to 4× return at listing price.
            </p>

            {/* Progress bar */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  STAGE 3
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold)" }}>
                  {SOLD_PCT}% FILLED
                </span>
              </div>
              <div style={{ height: 4, background: "rgba(212,175,110,0.12)", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${SOLD_PCT}%`,
                    background: "linear-gradient(90deg,#A88A52,#E8C882)",
                    transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 8 }}>
                Stage 4 opens at $0.35 USDT — 22% remaining at current price
              </p>
            </div>
          </FadeUpSection>

          {/* ── RIGHT COLUMN — simplified buy widget ────────────────── */}
          <FadeUpSection delay={0.15}>
            <div
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border-gold)",
              }}
            >
              {/* Widget header */}
              <div
                style={{
                  padding: "16px 20px",
                  borderBottom: "1px solid var(--border-gold)",
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)" }}>
                  PURCHASE XN TOKENS
                </span>
              </div>

              <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>

                {/* Network pills */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 10 }}>
                    SELECT NETWORK
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["BEP-20", "ERC-20", "TRC-20"].map((net) => {
                      const key = { "BEP-20": "BSC", "ERC-20": "ETH", "TRC-20": "TRON" }[net];
                      const active = network === key;
                      return (
                        <button
                          key={net}
                          onClick={() => setNetwork(key)}
                          style={{
                            flex: 1,
                            padding: "8px 4px",
                            border: active ? "1px solid var(--gold)" : "1px solid var(--border-sub)",
                            background: active ? "var(--gold-ghost)" : "transparent",
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            letterSpacing: "0.12em",
                            color: active ? "var(--gold)" : "var(--text-muted)",
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {net}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* YOU SEND */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                    YOU SEND
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number"
                      value={usdtAmt}
                      min={10}
                      onChange={(e) => handleUsdt(e.target.value)}
                      style={{
                        width: "100%",
                        height: 52,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-sub)",
                        borderRadius: 0,
                        outline: "none",
                        paddingLeft: 14,
                        paddingRight: 64,
                        fontFamily: "var(--font-mono)",
                        fontSize: 18,
                        color: "var(--text-primary)",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "var(--border-gold)")}
                      onBlur={(e) => (e.target.style.borderColor = "var(--border-sub)")}
                    />
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                      USDT
                    </span>
                  </div>
                </div>

                {/* Arrow */}
                <div style={{ textAlign: "center", color: "var(--gold)", fontSize: 18, lineHeight: 1, margin: "-8px 0" }}>↓</div>

                {/* YOU RECEIVE */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>
                    YOU RECEIVE
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      type="number"
                      value={xnAmt}
                      onChange={(e) => handleXn(e.target.value)}
                      style={{
                        width: "100%",
                        height: 52,
                        background: "var(--bg-tertiary)",
                        border: "1px solid var(--border-gold)",
                        borderRadius: 0,
                        outline: "none",
                        paddingLeft: 14,
                        paddingRight: 48,
                        fontFamily: "var(--font-mono)",
                        fontSize: 18,
                        color: "var(--gold)",
                        boxSizing: "border-box",
                      }}
                    />
                    <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: "var(--gold)" }}>
                      XN
                    </span>
                  </div>
                </div>

                {/* Connect wallet button */}
                {!isConnected ? (
                  <div>
                    <button
                      onClick={connectWallet}
                      style={{
                        width: "100%",
                        height: 52,
                        background: "transparent",
                        border: "1px solid var(--gold)",
                        fontFamily: "var(--font-disp)",
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-ghost)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      CONNECT WALLET
                    </button>
                    {/* Wallet logo tags */}
                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                      {["MetaMask", "Coinbase", "Trust", "WalletConnect"].map((w) => (
                        <span
                          key={w}
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: 9,
                            letterSpacing: "0.1em",
                            color: "var(--text-muted)",
                            border: "1px solid var(--border-sub)",
                            padding: "3px 8px",
                          }}
                        >
                          {w}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div style={{ background: "rgba(74,140,111,0.06)", border: "1px solid rgba(74,140,111,0.3)", padding: "10px 14px" }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--c-success)" }}>
                      WALLET CONNECTED · {address?.slice(0, 6)}…{address?.slice(-4)}
                    </span>
                  </div>
                )}

                {/* Send address box */}
                <div style={{ background: "var(--bg-primary)", border: "1px solid var(--border-gold)", padding: "12px 14px", position: "relative" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>
                    SEND {network === "BSC" ? "BEP-20" : network === "ETH" ? "ERC-20" : "TRC-20"} USDT TO:
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-sec)", flex: 1, wordBreak: "break-all", letterSpacing: "0.04em" }}>
                      {DEPOSIT_ADDRESS[network]}
                    </span>
                    <button
                      onClick={copyAddr}
                      style={{
                        padding: "6px 12px",
                        background: copied ? "rgba(74,140,111,0.15)" : "var(--gold)",
                        border: "none",
                        fontFamily: "var(--font-mono)",
                        fontSize: 9,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: copied ? "var(--c-success)" : "var(--text-inv)",
                        cursor: "pointer",
                        flexShrink: 0,
                        transition: "all 0.2s",
                      }}
                    >
                      {copied ? "✓" : "COPY"}
                    </button>
                  </div>
                </div>

                {/* Warning */}
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--c-danger)", padding: "8px 12px", background: "rgba(168,82,82,0.06)", border: "1px solid rgba(168,82,82,0.2)" }}>
                  ⚠ Only send BEP-20 USDT to this address. Other tokens will be lost.
                </p>

                {/* Full presale link */}
                <Link href="/presale" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  VIEW FULL PRESALE PAGE →
                </Link>
              </div>
            </div>
          </FadeUpSection>
        </div>

        {/* Social proof ticker */}
        <div style={{ marginTop: 40, overflow: "hidden", position: "relative", borderTop: "1px solid var(--border-sub)", paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              gap: 48,
              whiteSpace: "nowrap",
              animation: "proofScroll 28s linear infinite",
              willChange: "transform",
            }}
          >
            {[...PROOF_ITEMS, ...PROOF_ITEMS].map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "var(--gold)", marginRight: 6 }}>●</span>
                {item}
              </span>
            ))}
          </div>
          {/* Edge fades */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,var(--bg-tertiary) 0%,transparent 8%,transparent 92%,var(--bg-tertiary) 100%)", pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}
