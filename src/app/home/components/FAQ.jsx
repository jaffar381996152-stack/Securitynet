"use client";
import { useState } from "react";
import FadeUpSection from "./FadeUpSection";

const QUESTIONS = [
  {
    q: "What is XN token and what is it used for?",
    a: "XN is a BEP-20 utility token that powers the SecurityNet.ai ecosystem. XN is used to pay for platform services, access real-time intelligence feeds, participate in governance, and earn staking rewards.",
  },
  {
    q: "How do I connect my wallet to purchase XN?",
    a: "Visit the presale page and click 'Connect Wallet.' Supported wallets include MetaMask, Coinbase Wallet, Trust Wallet, and WalletConnect-compatible wallets. Once connected, select your network and enter the amount you wish to purchase.",
  },
  {
    q: "Which networks and wallets are supported?",
    a: "We support BEP-20 (Binance Smart Chain), ERC-20 (Ethereum), and TRC-20 (Tron) for USDT payments. MetaMask, Coinbase Wallet, Trust Wallet, and any WalletConnect-compatible wallet are accepted.",
  },
  {
    q: "What is the minimum purchase amount?",
    a: "The minimum purchase amount is $10 USDT, which equals 50 XN at the current Stage 3 price of $0.20 USDT per token. There is no maximum purchase limit.",
  },
  {
    q: "When will XN be listed on exchanges?",
    a: "XN is targeted for exchange listing in Q2 2026. Applications have been submitted to Tier-1 and Tier-2 centralized exchanges. The listing price is set at $0.80 USDT — a 4× return on Stage 3 participants.",
  },
  {
    q: "How do I import XN to my wallet after purchase?",
    a: "In MetaMask or Trust Wallet, go to 'Import Token' and enter the XN contract address: 0x917D93261B6b232F6b8b643d65b48928D1c85FFc. Token symbol: XN. Decimals: 18.",
  },
  {
    q: "Is the smart contract audited?",
    a: "Yes. The XN smart contract has been independently audited by a leading blockchain security firm. The full audit report is available in the whitepaper. A second audit is currently underway ahead of the Token Generation Event.",
  },
  {
    q: "What happens if I miss the current presale stage?",
    a: "Each presale stage closes permanently once filled. If Stage 3 closes, Stage 4 will open at $0.35 USDT per XN. There are 5 stages in total, with the final presale price at $0.55 USDT before the public listing at $0.80 USDT.",
  },
];

function FAQItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ borderBottom: "1px solid var(--border-sub)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "22px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 16,
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 600,
            fontSize: 17,
            color: "var(--text-primary)",
            letterSpacing: "0.02em",
          }}
        >
          {item.q}
        </span>
        <span
          style={{
            fontFamily: "var(--font-disp)",
            fontWeight: 700,
            fontSize: 20,
            color: "var(--gold)",
            flexShrink: 0,
            width: 20,
            textAlign: "center",
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "none",
            lineHeight: 1,
          }}
        >
          +
        </span>
      </button>

      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 240 : 0,
          transition: "max-height 0.35s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-disp)",
            fontSize: 15,
            color: "var(--text-muted)",
            lineHeight: 1.7,
            paddingBottom: 22,
          }}
        >
          {item.a}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="section-py" style={{ background: "#000000", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container-narrow">
        <FadeUpSection style={{ marginBottom: 48 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>CLASSIFIED — FREQUENTLY ASKED</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
            INTELLIGENCE BRIEF
          </h2>
        </FadeUpSection>

        <div>
          {QUESTIONS.map((item, i) => (
            <FadeUpSection key={i} delay={i * 0.05}>
              <FAQItem item={item} />
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
