"use client";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";

const STEPS = [
  { num: "01", title: "CONNECT WALLET", desc: "Connect your MetaMask, Trust Wallet, or any WalletConnect-compatible wallet to the presale platform." },
  { num: "02", title: "CHOOSE NETWORK", desc: "Select BEP-20 (BSC), ERC-20 (Ethereum), or TRC-20 (Tron) — buy with USDT on your preferred chain." },
  { num: "03", title: "ENTER AMOUNT", desc: "Enter the USDT amount you wish to invest. Minimum purchase is $10 USDT. The XN equivalent is calculated at $0.20." },
  { num: "04", title: "RECEIVE XN", desc: "Send USDT to the contract address and authorize. XN tokens will be distributed to your wallet after presale close." },
];

export default function HowToBuy() {
  return (
    <section className="section-py" style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-sub)" }}>
      <div className="container">
        <FadeUpSection style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow" style={{ marginBottom: 12 }}>PURCHASE GUIDE</span>
          <h2 className="disp-title" style={{ fontSize: "var(--lg-size)" }}>
            HOW TO BUY <span style={{ color: "var(--gold)" }}>XN</span>
          </h2>
        </FadeUpSection>

        {/* Steps grid with connector line */}
        <div style={{ position: "relative" }}>
          {/* Horizontal dashed line (desktop only) */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              top: 32,
              left: "calc(12.5% + 20px)",
              right: "calc(12.5% + 20px)",
              height: 1,
              borderTop: "1px dashed rgba(212,175,110,0.25)",
              zIndex: 0,
            }}
          >
            {/* Traveling dot */}
            <div
              style={{
                position: "absolute",
                top: -3,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--gold)",
                animation: "travelDot 4s ease-in-out infinite",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
              gap: "clamp(16px,2vw,24px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            {STEPS.map((step, i) => (
              <FadeUpSection key={step.num} delay={i * 0.1}>
                <div
                  style={{
                    background: "var(--bg-tertiary)",
                    border: "1px solid var(--border-sub)",
                    padding: "clamp(20px,3vw,32px)",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-gold)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border-sub)")}
                >
                  {/* Step number */}
                  <div
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 900,
                      fontSize: 48,
                      color: "var(--gold)",
                      lineHeight: 1,
                      marginBottom: 20,
                      opacity: 0.8,
                    }}
                  >
                    {step.num}
                  </div>

                  <h3
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontWeight: 700,
                      fontSize: 18,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: "var(--text-primary)",
                      marginBottom: 12,
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-disp)",
                      fontSize: 14,
                      color: "var(--text-muted)",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </FadeUpSection>
            ))}
          </div>
        </div>

        <FadeUpSection delay={0.4} style={{ textAlign: "center", marginTop: 40 }}>
          <Link href="/presale" className="btn-primary" data-cursor="cta">
            START BUYING XN →
          </Link>
        </FadeUpSection>
      </div>
    </section>
  );
}
