"use client";
import { useState } from "react";
import Link from "next/link";
import FadeUpSection from "@/app/home/components/FadeUpSection";

// Real XN BEP-20 token (verified on-chain: name/symbol XN, 18 decimals).
// Env-overridable; was wrongly set to the deposit wallet.
const CONTRACT_ADDRESS =
  process.env.NEXT_PUBLIC_XN_TOKEN_CONTRACT_ADDRESS ||
  "0x01c4D7E3FA846D9Ed293912118AdaC5B654344F0";

const META = [
  { label: "Deployed On", value: "BNB Chain" },
  { label: "Token Symbol", value: "XN" },
  { label: "Token Decimals", value: "18" },
  { label: "Token Standard", value: "BEP-20" },
];

export default function SmartContract() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(CONTRACT_ADDRESS).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contract" className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-gold)" }}>
      <div className="container">
        <span className="eyebrow">SMART CONTRACT</span>
        <h2 className="disp-title" style={{ fontSize: "clamp(36px,5vw,64px)", marginBottom: 28 }}>
          CONTRACT <span className="gold-word">DETAILS</span>
        </h2>

        <FadeUpSection delay={0.08}>
          <div
            style={{
              background: "var(--bg-primary)",
              border: "1px solid var(--border-gold)",
              padding: "24px 28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              marginBottom: 32,
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(12px,1.5vw,18px)", color: "var(--text-primary)", letterSpacing: "0.04em", wordBreak: "break-all" }}>
              {CONTRACT_ADDRESS}
            </span>
            <button
              onClick={handleCopy}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: copied ? "var(--c-success)" : "var(--gold)",
                border: `1px solid ${copied ? "var(--c-success)" : "var(--border-gold)"}`,
                background: "transparent",
                padding: "8px 18px",
                flexShrink: 0,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => { if (!copied) e.currentTarget.style.background = "var(--gold-ghost)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
            >
              {copied ? "COPIED ✓" : "COPY ADDRESS"}
            </button>
          </div>
        </FadeUpSection>

        <FadeUpSection delay={0.16}>
          <div className="contract-meta-grid" style={{ border: "1px solid var(--border-sub)", marginBottom: 36 }}>
            {META.map((m) => (
              <div key={m.label}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 6 }}>
                  {m.label}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 15, color: "var(--text-primary)", fontWeight: 500 }}>{m.value}</div>
              </div>
            ))}
          </div>
        </FadeUpSection>

        <FadeUpSection delay={0.24}>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href={`https://bscscan.com/token/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener" className="btn-primary">
              VIEW ON BSCSCAN →
            </a>
            <a href="#" target="_blank" rel="noopener" className="btn-ghost">
              AUDIT REPORT →
            </a>
            <Link href="/presale" className="btn-ghost">
              BUY XN →
            </Link>
          </div>
        </FadeUpSection>
      </div>
    </section>
  );
}
