import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import FadeUpSection from "../home/components/FadeUpSection";
import { pageMetadata } from "@/app/libs/seo";

export const metadata = pageMetadata({
  title: "How to Buy XN — Video Guide",
  description:
    "Watch a step-by-step video guide on how to buy XN tokens during the SecurityNet presale — connect your wallet, select a network, send USDT, and receive XN.",
  path: "/how-to-buy",
});

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

export default function HowToBuyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="section-py">
          <div className="container">
            <FadeUpSection style={{ textAlign: "center", marginBottom: 40 }}>
              <span className="eyebrow" style={{ marginBottom: 12 }}>VIDEO GUIDE</span>
              <h1 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
                HOW TO BUY <span style={{ color: "var(--gold)" }}>XN TOKENS</span>
              </h1>
            </FadeUpSection>

            <FadeUpSection delay={0.1} style={{ marginBottom: 64 }}>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 9",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border-gold)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    border: "1px solid var(--border-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="var(--gold)" stroke="none">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                  }}
                >
                  Video guide coming soon
                </span>
              </div>
            </FadeUpSection>

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
                <FadeUpSection key={step.num} delay={i * 0.1}>
                  <div
                    style={{
                      background: "var(--bg-secondary)",
                      padding: "28px 24px",
                      position: "relative",
                      height: "100%",
                    }}
                  >
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
                </FadeUpSection>
              ))}
            </div>

            <FadeUpSection delay={0.4} style={{ textAlign: "center" }}>
              <Link href="/presale" className="btn-primary" data-cursor="cta">
                GO TO PRESALE →
              </Link>
            </FadeUpSection>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
