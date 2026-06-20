"use client";
import SaleTimer from "./SaleTimer";
import PurchaseCard from "./PurchaseCard";
import DeclassifyText from "@/app/home/components/DeclassifyText";
import { useState } from "react";

const STAGE     = 3;
const PRICE     = "$0.20";
const LISTING   = "$0.80";
const SOLD_PCT  = 78;

const STAGES = [
  { num: 1, price: "$0.10", status: "closed"   },
  { num: 2, price: "$0.15", status: "closed"   },
  { num: 3, price: "$0.20", status: "active"   },
  { num: 4, price: "$0.35", status: "upcoming" },
  { num: 5, price: "$0.55", status: "upcoming" },
];

const TRUST_ITEMS = [
  {
    title: "Audited Contract",
    sub: "Independently verified",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Non-Custodial",
    sub: "You hold your keys",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "Instant Settlement",
    sub: "Tokens arrive <2 min",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  {
    title: "Multi-Chain",
    sub: "BEP-20 · ERC-20 · TRC-20",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

// Real XN BEP-20 token (verified on-chain). Env-overridable.
const XN_CONTRACT =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS ||
  "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0";

const FAQ_ITEMS = [
  {
    q: "When do I receive my XN tokens?",
    a: `XN tokens are credited to your wallet within 2 minutes of payment confirmation. The process is fully automated. Import the contract address ${XN_CONTRACT} to see your balance immediately after receipt.`,
  },
  {
    q: "Is my payment secure?",
    a: "Yes. The XN smart contract has been independently audited by a leading blockchain security firm. All transactions are verified on-chain. Always double-check the deposit address shown on the purchase widget before sending your USDT.",
  },
  {
    q: "What happens if I send the wrong amount?",
    a: "The contract will process whatever USDT amount you send and issue the corresponding XN tokens. The minimum is $10 USDT. Amounts below the minimum may not be processed — contact support if this occurs.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border-sub)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", background: "none", border: "none", cursor: "pointer", gap: 16 }}
      >
        <span style={{ fontFamily: "var(--font-disp)", fontWeight: 600, fontSize: 15, color: "var(--text-primary)", textAlign: "left" }}>{q}</span>
        <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 18, flexShrink: 0, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", lineHeight: 1 }}>+</span>
      </button>
      <div style={{ overflow: "hidden", maxHeight: open ? 200 : 0, transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)" }}>
        <p style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-muted)", lineHeight: 1.65, paddingBottom: 16 }}>{a}</p>
      </div>
    </div>
  );
}

export default function PresaleContent() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          SECTION 1 — HERO (animated background shows through)
          ════════════════════════════════════════════════════════════ */}
      <section id="hero" style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(32px,6vh,64px) var(--gut)" }}>
        <div
          className="container"
          style={{
            textAlign: "center",
          }}
        >
          {/* Stage badge */}
          <div className="badge" style={{ marginBottom: 12 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
            STAGE {STAGE} · LIVE NOW
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 800,
              fontSize: "var(--lg-size)",
              textTransform: "uppercase",
              lineHeight: 1,
              letterSpacing: "-0.01em",
              color: "var(--text-primary)",
              marginBottom: 24,
            }}
          >
            <DeclassifyText text="AUTHORIZE YOUR XN" delay={0.1} />
            <br />
            <DeclassifyText text="ACQUISITION." delay={0.3} style={{ color: "var(--gold)" }} />
          </h1>

          {/* Countdown timer */}
          <SaleTimer />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 2 — LIGHT BG · INFO CARDS + PURCHASE WIDGET
          ════════════════════════════════════════════════════════════ */}
      <section className="section-py section-light" style={{ position: "relative", zIndex: 1, borderTop: "1px solid var(--border-sub)" }}>
        <div className="container">
          <div className="presale-info-grid">

            {/* ── Info cards ─────────────────────────────────────────── */}
            <div className="presale-info-cards">

              {/* Column heading */}
              <div>
                <span className="eyebrow" style={{ marginBottom: 12 }}>STAGE {STAGE} OVERVIEW</span>
                <h2 className="disp-title" style={{ fontSize: "var(--lg-size)", color: "#1C1C22" }}>
                  PRESALE <span style={{ color: "var(--gold)" }}>DETAILS.</span>
                </h2>
              </div>

              {/* Price stats — borderless ledger rows, current price featured */}
              <div className="price-stats">
                <div className="price-stat-row price-stat-row--featured">
                  <div className="price-stat-label">
                    <span className="ticker-live-dot" />
                    Current Presale Price
                  </div>
                  <div className="price-stat-value price-stat-value--featured">
                    {PRICE} <span className="price-stat-unit">USDT</span>
                  </div>
                </div>
                <div className="price-stat-row">
                  <div className="price-stat-label">
                    Listing Price <span className="price-stat-tag">→ TARGET</span>
                  </div>
                  <div className="price-stat-value price-stat-value--strike">
                    {LISTING} <span className="price-stat-unit">USDT</span>
                  </div>
                </div>
                <div className="price-stat-row">
                  <div className="price-stat-label">Potential ROI</div>
                  <div className="price-stat-value price-stat-value--gold">4× AT LISTING</div>
                </div>
              </div>

              {/* Stage progress */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>STAGE {STAGE} PROGRESS</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--gold)" }}>{SOLD_PCT}% FILLED</span>
                </div>
                <div style={{ height: 6, background: "var(--border-sub)", position: "relative" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${SOLD_PCT}%`, background: "linear-gradient(90deg, #A88A52, #E8C882)" }} />
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)", marginTop: 8 }}>
                  78% FILLED · 18,240 XN REMAINING BEFORE STAGE 4
                </p>
              </div>

              {/* Stage rail — borderless stepper */}
              <div className="stage-rail">
                <div className="stage-rail-label">PRESALE STAGES</div>
                <div className="stage-stepper-track">
                  {STAGES.map((s) => (
                    <div key={s.num} className="stage-step">
                      <div className={`stage-step-dot${s.status === "active" ? " is-active" : ""}${s.status === "closed" ? " is-closed" : ""}`}>
                        {s.status === "closed" ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          s.num
                        )}
                      </div>
                      <div className="stage-step-info">
                        <div className="stage-step-name">Stage {s.num}</div>
                        <div className="stage-step-price">{s.price} <span className="stage-step-unit">USDT</span></div>
                        {s.status === "active" && (
                          <span className="badge badge-active" style={{ margin: 0 }}>
                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
                            ACTIVE
                          </span>
                        )}
                        {s.status === "closed" && <span className="stage-step-status">CLOSED</span>}
                        {s.status === "upcoming" && <span className="stage-step-status">UPCOMING</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust & Security strip */}
              <div className="trust-strip">
                <span className="trust-strip-label">TRUST & SECURITY</span>
                {TRUST_ITEMS.map((item) => (
                  <span key={item.title} style={{ display: "contents" }}>
                    <span className="trust-sep">·</span>
                    <span className="trust-item">{item.icon}{item.title}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* ── Purchase widget ────────────────────────────────────── */}
            <div className="presale-info-widget presale-widget-col">
              <PurchaseCard />
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — SOLID DARK BG · FAQ
          ════════════════════════════════════════════════════════════ */}
      <section className="section-py" style={{ position: "relative", zIndex: 1, background: "var(--bg-primary)", borderTop: "1px solid var(--border-sub)" }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow" style={{ marginBottom: 12 }}>FAQ</span>
            <h2 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
              QUICK <span style={{ color: "var(--gold)" }}>ANSWERS</span>
            </h2>
          </div>
          {FAQ_ITEMS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
        </div>
      </section>
    </>
  );
}
