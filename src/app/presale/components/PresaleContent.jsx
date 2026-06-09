"use client";
import DigitalGold from "@/components/token/erctoken";
import SaleTimer from "./SaleTimer";
import Link from "next/link";
import { useState } from "react";

const STAGE     = 1;
const PRICE     = "$0.20";
const LISTING   = "$0.80";
const SOLD_PCT  = 38;

const STAGES = [
  { num: 1, price: "$0.20", status: "active"   },
  { num: 2, price: "$0.26", status: "upcoming" },
  { num: 3, price: "$0.34", status: "upcoming" },
  { num: 4, price: "$0.48", status: "upcoming" },
  { num: 5, price: "$0.65", status: "upcoming" },
];

const TRUST_ITEMS = [
  { label: "KYC VERIFIED",        icon: "✓" },
  { label: "CONTRACT AUDITED",    icon: "✓" },
  { label: "MULTISIG SECURED",    icon: "✓" },
  { label: "LICENSED ENTITY",     icon: "✓" },
];

const FAQ_ITEMS = [
  { q: "When will XN tokens be distributed?", a: "XN tokens are distributed directly to your wallet within minutes of payment confirmation by our system. The process is fully automated." },
  { q: "Is there a minimum purchase?",        a: "The minimum purchase is $10 USDT. There is no maximum — large purchases may be subject to a brief verification period." },
  { q: "Can I participate from any country?", a: "The presale is open globally. Some jurisdictions may have restrictions — please consult local regulations. US persons are not eligible." },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid var(--border-sub)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          gap: 16,
        }}
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
    <section style={{ background: "var(--bg-primary)", minHeight: "100vh" }}>
      <div
        className="container"
        style={{
          paddingTop: "clamp(48px,6vw,80px)",
          paddingBottom: "clamp(64px,8vw,120px)",
        }}
      >
        {/* Back link */}
        <div style={{ marginBottom: 32 }}>
          <Link
            href="/"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
          >
            ← BACK TO SITE
          </Link>
        </div>

        {/* Two-column layout */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{
            gap: "clamp(32px,5vw,64px)",
            alignItems: "start",
          }}
        >
          {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
          <div>
            {/* Stage badge */}
            <div className="badge" style={{ marginBottom: 24 }}>
              <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
              STAGE {STAGE} OF 5 · LIVE NOW
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
              SECURE YOUR
              <br />
              <span style={{ color: "var(--gold)" }}>XN ALLOCATION</span>
            </h1>

            {/* Price comparison */}
            <div
              style={{
                display: "flex",
                gap: 2,
                marginBottom: 32,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  flex: 1,
                  minWidth: 140,
                  background: "var(--gold-ghost)",
                  border: "1px solid var(--border-gold)",
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>PRESALE PRICE</div>
                <div style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 32, color: "var(--gold)", lineHeight: 1 }}>{PRICE} <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>USDT</span></div>
              </div>

              <div
                style={{
                  flex: 1,
                  minWidth: 140,
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-sub)",
                  padding: "20px 24px",
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>LISTING PRICE</div>
                <div style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 32, color: "var(--text-primary)", lineHeight: 1 }}>{LISTING} <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-muted)" }}>USDT</span></div>
              </div>

              <div
                style={{
                  background: "rgba(74,140,111,0.1)",
                  border: "1px solid rgba(74,140,111,0.3)",
                  padding: "20px 24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  minWidth: 100,
                }}
              >
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--c-success)", marginBottom: 6 }}>POTENTIAL ROI</div>
                <div style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 28, color: "var(--c-success)", lineHeight: 1 }}>4×</div>
              </div>
            </div>

            {/* Stage progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>STAGE {STAGE} PROGRESS</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--gold)" }}>{SOLD_PCT}% SOLD</span>
              </div>
              <div style={{ height: 6, background: "var(--border-sub)", position: "relative" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: `${SOLD_PCT}%`, background: "linear-gradient(90deg, var(--gold-dim), var(--gold))" }} />
              </div>
            </div>

            {/* Stage table */}
            <div style={{ marginBottom: 40, border: "1px solid var(--border-sub)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr 1fr 1fr", padding: "10px 18px", background: "var(--bg-secondary)", borderBottom: "1px solid var(--border-sub)" }}>
                {["#", "STAGE", "PRICE", "STATUS"].map((h) => (
                  <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>{h}</span>
                ))}
              </div>
              {STAGES.map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "48px 1fr 1fr 1fr",
                    padding: "14px 18px",
                    borderBottom: "1px solid var(--border-sub)",
                    background: s.status === "active" ? "var(--gold-ghost)" : "transparent",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 16, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)" }}>0{s.num}</span>
                  <span style={{ fontFamily: "var(--font-disp)", fontSize: 14, color: "var(--text-sec)", alignSelf: "center" }}>Stage {s.num}</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)", alignSelf: "center" }}>{s.price}</span>
                  <div style={{ alignSelf: "center" }}>
                    {s.status === "active" && <span className="badge badge-active">ACTIVE</span>}
                    {s.status === "upcoming" && <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>UPCOMING</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust grid */}
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>TRUST & SECURITY</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
                {TRUST_ITEMS.map((item) => (
                  <div
                    key={item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "16px 18px",
                      background: "var(--bg-secondary)",
                      border: "1px solid var(--border-sub)",
                    }}
                  >
                    <span style={{ width: 20, height: 20, border: "1px solid var(--c-success)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--c-success)" }}>{item.icon}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-sec)" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro FAQ */}
            <div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>FAQ</div>
              {FAQ_ITEMS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
            </div>
          </div>

          {/* ── RIGHT COLUMN (sticky buy widget) ───────────────────── */}
          <div style={{ position: "sticky", top: "calc(36px + 72px + 24px)" }}>
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
