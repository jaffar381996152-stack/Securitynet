"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";
import DeclassifyText from "./DeclassifyText";
import PurchaseCard from "@/app/presale/components/PurchaseCard";

const SOLD_PCT   = 78;
const RAISED     = "$847,230";
const XN_SOLD    = "4,236,150";

const PROOF_ITEMS = [
  "Alex M. bought 2,500 XN · 2 min ago",
  "Priya K. bought 500 XN · 5 min ago",
  "Diego R. bought 10,000 XN · 8 min ago",
  "Sarah O. bought 1,250 XN · 12 min ago",
  "Wei L. bought 3,800 XN · 16 min ago",
  "Fatima A. bought 750 XN · 19 min ago",
  "Lucas B. bought 15,000 XN · 23 min ago",
  "Nadia P. bought 600 XN · 27 min ago",
  "Ethan W. bought 4,200 XN · 31 min ago",
  "Mei T. bought 1,000 XN · 35 min ago",
  "Carlos V. bought 8,500 XN · 4 min ago",
  "Olivia S. bought 320 XN · 9 min ago",
  "Hiroshi N. bought 2,100 XN · 14 min ago",
  "Zainab Y. bought 12,000 XN · 21 min ago",
  "Marco D. bought 450 XN · 6 min ago",
  "Ingrid F. bought 6,750 XN · 11 min ago",
  "Tariq H. bought 900 XN · 18 min ago",
  "Sofia G. bought 1,800 XN · 25 min ago",
  "Noah C. bought 5,000 XN · 7 min ago",
  "Aaliyah J. bought 275 XN · 3 min ago",
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
  const [inView, setInView] = useState(false);

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

  return (
    <section
      ref={sectionRef}
      className="section-py section-light"
      style={{
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
                color: "#1C1C22",
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
                  className="card-dark"
                  style={{
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

          {/* ── RIGHT COLUMN — buy widget (desktop only) ──────────── */}
          <FadeUpSection delay={0.15}>
            <div className="presale-inline-widget">
              <PurchaseCard />
              <Link href="/presale" className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 16 }}>
                VIEW FULL PRESALE PAGE →
              </Link>
            </div>
          </FadeUpSection>
        </div>

        {/* Social proof ticker */}
        <div style={{ marginTop: 40, overflow: "hidden", position: "relative", borderTop: "1px solid var(--border-sub)", paddingTop: 16 }}>
          <div
            style={{
              display: "flex",
              gap: 56,
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
                  fontSize: 14,
                  letterSpacing: "0.1em",
                  color: "var(--text-muted)",
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "var(--gold)", marginRight: 8 }}>●</span>
                {item}
              </span>
            ))}
          </div>
          {/* Edge fades */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,#F5F2ED 0%,transparent 8%,transparent 92%,#F5F2ED 100%)", pointerEvents: "none" }} />
        </div>
      </div>
    </section>
  );
}
