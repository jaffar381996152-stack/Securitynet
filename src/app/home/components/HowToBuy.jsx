"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";

const STEPS = [
  {
    num: "01",
    title: "Connect Your Wallet",
    desc: "Install MetaMask, Coinbase Wallet, or Trust Wallet. Ensure it supports BEP-20, ERC-20, or TRC-20 tokens.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M16 12h.01" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Select Network",
    desc: "Choose your preferred network — BEP-20 (Binance Smart Chain), ERC-20 (Ethereum), or TRC-20 (Tron). Fund with USDT.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Copy Deposit Address",
    desc: "On the purchase widget, copy the deposit address shown for your selected network. This is where you'll send your USDT.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="9" y="9" width="13" height="13" rx="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Send USDT",
    desc: "Send USDT from your wallet to the deposit address (minimum $10). Double-check the address and network before confirming.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Receive XN Tokens",
    desc: "XN tokens arrive in your wallet within 2 minutes of confirmation. Import the contract address to view your balance immediately.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
];

function StepCard({ step, delay }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="card-dark"
      style={{
        padding: "28px 24px",
        position: "relative",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {/* Faint step number — top-right */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          fontFamily: "var(--font-mono)",
          fontSize: 48,
          fontWeight: 700,
          color: "rgba(212,175,110,0.12)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {step.num}
      </div>

      <div style={{ marginBottom: 20 }}>{step.icon}</div>

      <h3
        style={{
          fontFamily: "var(--font-disp)",
          fontWeight: 700,
          fontSize: 18,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--text-primary)",
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {step.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-disp)",
          fontSize: 14,
          color: "var(--text-muted)",
          lineHeight: 1.7,
        }}
      >
        {step.desc}
      </p>
    </div>
  );
}

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="section-py" style={{ background: "#000000", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <FadeUpSection style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>HOW TO BUY</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)", color: "var(--text-primary)" }}>
            FIVE STEPS TO <span style={{ color: "var(--gold)" }}>SECURE YOUR XN</span>
          </h2>
        </FadeUpSection>

        {/* 1px-gap grid */}
        <div
          className="htb-grid"
          style={{
            display: "grid",
            gap: 1,
            background: "var(--border-sub)",
            marginBottom: 48,
          }}
        >
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} delay={i * 0.1} />
          ))}
        </div>

        <FadeUpSection delay={0.4} style={{ textAlign: "center" }}>
          <Link href="/how-to-buy" className="btn-ghost" data-cursor="cta" style={{ color: "var(--text-primary)", borderColor: "var(--text-primary)" }}>
            WATCH VIDEO GUIDE →
          </Link>
        </FadeUpSection>
      </div>
    </section>
  );
}
