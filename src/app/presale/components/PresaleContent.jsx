"use client";
import DigitalGold from "@/components/token/erctoken";
import SaleTimer from "./SaleTimer";
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

const FAQ_ITEMS = [
  {
    q: "When do I receive my XN tokens?",
    a: "XN tokens are credited to your wallet within 2 minutes of payment confirmation. The process is fully automated. Import the contract address 0x917D93261B6b232F6b8b643d65b48928D1c85FFc to see your balance immediately after receipt.",
  },
  {
    q: "Is my payment secure?",
    a: "Yes. The XN smart contract has been independently audited by a leading blockchain security firm. All transactions are verified on-chain. Always verify the contract address before sending: 0x917D93261B6b232F6b8b643d65b48928D1c85FFc.",
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
    <section style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
      <div
        className="container"
        style={{
          paddingTop: "clamp(48px,6vw,80px)",
          paddingBottom: "clamp(64px,8vw,120px)",
        }}
      >
        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: "clamp(32px,5vw,64px)", alignItems: "start" }}
        >
          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div>
            {/* Stage badge */}
            <div className="badge" style={{ marginBottom: 24 }}>
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
                marginBottom: 32,
              }}
            >
              <DeclassifyText text="AUTHORIZE YOUR XN" delay={0.1} />
              <br />
              <DeclassifyText text="ACQUISITION." delay={0.3} style={{ color: "var(--gold)" }} />
            </h1>

            {/* Price block — 3 rows */}
            <div style={{ marginBottom: 32, border: "1px solid var(--border-sub)" }}>
              {[
                {
                  label: "Current Presale Price",
                  value: <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--gold)" }}>{PRICE} USDT</span>,
                },
                {
                  label: "Listing Price",
                  value: (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--gold)", textDecoration: "line-through", textDecorationColor: "rgba(212,175,110,0.5)" }}>{LISTING} USDT</span>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--gold)" }}>→ TARGET</span>
                    </span>
                  ),
                },
                {
                  label: "Potential ROI",
                  value: <span style={{ fontFamily: "var(--font-mono)", fontSize: 24, color: "var(--gold)" }}>4× AT LISTING</span>,
                },
              ].map(({ label, value }, i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 18px",
                    borderBottom: i < arr.length - 1 ? "1px solid var(--border-sub)" : "none",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {label}
                  </span>
                  {value}
                </div>
              ))}
            </div>

            {/* Stage progress */}
            <div style={{ marginBottom: 32 }}>
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

            {/* Stage table */}
            <div style={{ marginBottom: 40, border: "1px solid var(--border-sub)" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "10px 18px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-sub)" }}>
                {["STAGE", "PRICE", "STATUS"].map((h) => (
                  <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>{h}</span>
                ))}
              </div>
              {STAGES.map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    padding: "14px 18px",
                    borderBottom: "1px solid var(--border-sub)",
                    background: s.status === "active" ? "var(--gold-ghost)" : "transparent",
                    borderLeft: s.status === "active" ? "3px solid var(--gold)" : "3px solid transparent",
                    opacity: s.status === "closed" ? 0.5 : 1,
                  }}
                >
                  <span style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 16, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)" }}>
                    Stage {s.num}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)", alignSelf: "center" }}>
                    {s.price} USDT
                  </span>
                  <div style={{ alignSelf: "center" }}>
                    {s.status === "active" && (
                      <span className="badge badge-active" style={{ margin: 0 }}>
                        <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
                        ACTIVE
                      </span>
                    )}
                    {s.status === "closed" && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>CLOSED</span>
                    )}
                    {s.status === "upcoming" && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>UPCOMING</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust grid — 2×2 with 1px gap */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>TRUST & SECURITY</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--border-sub)" }}>
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.title}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      padding: "18px 20px",
                      background: "var(--bg-secondary)",
                    }}
                  >
                    <span style={{ flexShrink: 0, marginTop: 1 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "var(--font-disp)", fontSize: 13, fontWeight: 600, textTransform: "uppercase", color: "var(--text-primary)", marginBottom: 3 }}>
                        {item.title}
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick FAQ */}
            <div>
              <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>
                QUICK ANSWERS
              </div>
              {FAQ_ITEMS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
            </div>
          </div>

          {/* ── RIGHT COLUMN (sticky buy widget) ───────────────────── */}
          <div className="presale-widget-col">
            <SaleTimer />
            <div style={{ marginTop: 16 }}>
              <DigitalGold />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
