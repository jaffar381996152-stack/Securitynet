"use client";
import { useState } from "react";
import FadeUpSection from "./FadeUpSection";

const QUESTIONS = [
  {
    q: "What is the XN token?",
    a: "XN is the utility and governance token of the Securitynet ecosystem. It powers access to premium AI surveillance features, protocol governance voting, staking rewards, and cross-border data marketplace transactions.",
  },
  {
    q: "How do I buy XN during the presale?",
    a: "Connect a compatible wallet (MetaMask, Trust Wallet, WalletConnect), choose your network (BSC, Ethereum, or Tron), send USDT to the presale contract address, and XN tokens will be distributed to your wallet after the presale closes.",
  },
  {
    q: "Which blockchain networks are supported?",
    a: "The presale accepts USDT on three networks: BEP-20 on Binance Smart Chain (recommended — lowest fees), ERC-20 on Ethereum, and TRC-20 on Tron.",
  },
  {
    q: "When does the presale end?",
    a: "Stage 1 is currently active at $0.20 per XN. Once the stage allocation is filled, Stage 2 opens at $0.26. The presale continues across 5 stages until the public listing.",
  },
  {
    q: "What is the listing price?",
    a: "The planned exchange listing price is $0.80 per XN — a 4× return from the Stage 1 presale price of $0.20. Early participants secure the best possible entry.",
  },
  {
    q: "Is the smart contract audited?",
    a: "Yes. The XN token smart contract has been audited by a third-party blockchain security firm. The audit report is available in the whitepaper and on-chain.",
  },
];

function FAQItem({ item, index }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--border-sub)",
      }}
    >
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
          maxHeight: open ? 200 : 0,
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
    <section className="section-py" style={{ background: "var(--bg-primary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container-narrow">
        <FadeUpSection style={{ marginBottom: 48 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>COMMON QUESTIONS</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
            FREQUENTLY ASKED
          </h2>
        </FadeUpSection>

        <div>
          {QUESTIONS.map((item, i) => (
            <FadeUpSection key={i} delay={i * 0.06}>
              <FAQItem item={item} index={i} />
            </FadeUpSection>
          ))}
        </div>
      </div>
    </section>
  );
}
