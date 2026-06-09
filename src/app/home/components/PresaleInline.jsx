"use client";
import Link from "next/link";
import FadeUpSection from "./FadeUpSection";

const STAGE     = 1;
const PRICE     = "$0.20";
const LISTING   = "$0.80";
const SOLD_PCT  = 38;
const RAISED    = "$1.24M";
const TOKENS    = "6.2M";
const DAYS_LEFT = 45;

const STAGES = [
  { num: 1, price: "$0.20", status: "active" },
  { num: 2, price: "$0.26", status: "upcoming" },
  { num: 3, price: "$0.34", status: "upcoming" },
  { num: 4, price: "$0.48", status: "upcoming" },
  { num: 5, price: "$0.65", status: "upcoming" },
];

export default function PresaleInline() {
  return (
    <section className="section-py" style={{ background: "var(--bg-tertiary)", borderTop: "1px solid var(--border-sub)", borderBottom: "1px solid var(--border-sub)" }}>
      <div className="container">

        {/* Header row */}
        <FadeUpSection style={{ marginBottom: 56, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <div>
            <span className="eyebrow" style={{ marginBottom: 12 }}>PRESALE · STAGE {STAGE} OF 5</span>
            <h2
              className="disp-title"
              style={{ fontSize: "var(--lg-size)" }}
            >
              SECURE YOUR
              <span style={{ color: "var(--gold)" }}> ALLOCATION</span>
            </h2>
          </div>
          <Link href="/presale" className="btn-ghost" style={{ flexShrink: 0 }}>
            BUY XN NOW →
          </Link>
        </FadeUpSection>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(24px,4vw,56px)" }}>

          {/* Left: stats */}
          <FadeUpSection>
            {/* Stage progress */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                  STAGE {STAGE} PROGRESS
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--gold)" }}>
                  {SOLD_PCT}% SOLD
                </span>
              </div>
              <div style={{ height: 4, background: "var(--border-sub)", position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: `${SOLD_PCT}%`,
                    background: "var(--gold)",
                    transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
                  }}
                />
              </div>
            </div>

            {/* Stats 2×2 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, marginBottom: 32 }}>
              {[
                { label: "USDT RAISED",    value: RAISED },
                { label: "XN DISTRIBUTED", value: TOKENS },
                { label: "DAYS REMAINING", value: `${DAYS_LEFT}D` },
                { label: "CURRENT PRICE",  value: PRICE + " USDT" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border-sub)",
                    padding: "20px 22px",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
                    {label}
                  </div>
                  <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 26, color: "var(--text-primary)", lineHeight: 1 }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>

            {/* ROI comparison */}
            <div
              style={{
                border: "1px solid var(--border-gold)",
                background: "var(--gold-ghost)",
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--text-muted)", marginBottom: 4 }}>PRESALE PRICE</div>
                <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 20, color: "var(--gold)" }}>{PRICE} USDT</div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>→</div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", color: "var(--text-muted)", marginBottom: 4 }}>LISTING PRICE</div>
                <div style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 20, color: "var(--text-primary)" }}>{LISTING} USDT</div>
              </div>
              <div className="badge" style={{ border: "1px solid var(--c-success)", color: "var(--c-success)", background: "rgba(74,140,111,0.08)" }}>
                4× ROI
              </div>
            </div>
          </FadeUpSection>

          {/* Right: stage table */}
          <FadeUpSection delay={0.15}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 16 }}>
              SALE STAGES
            </div>

            <div style={{ border: "1px solid var(--border-sub)" }}>
              {/* Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 1fr",
                  padding: "10px 18px",
                  background: "var(--bg-primary)",
                  borderBottom: "1px solid var(--border-sub)",
                }}
              >
                {["STAGE", "PRICE", "STATUS"].map((h) => (
                  <span key={h} style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                    {h}
                  </span>
                ))}
              </div>

              {STAGES.map((s) => (
                <div
                  key={s.num}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "60px 1fr 1fr",
                    padding: "14px 18px",
                    borderBottom: "1px solid var(--border-sub)",
                    background: s.status === "active" ? "var(--gold-ghost)" : "transparent",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-disp)", fontWeight: 700, fontSize: 18, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)" }}>
                    0{s.num}
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: s.status === "active" ? "var(--gold)" : "var(--text-muted)", alignSelf: "center" }}>
                    {s.price} USDT
                  </span>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {s.status === "active" && (
                      <span className="badge badge-active">ACTIVE</span>
                    )}
                    {s.status === "upcoming" && (
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--text-muted)" }}>
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <Link href="/presale" className="btn-primary" style={{ width: "100%", justifyContent: "center" }} data-cursor="cta">
                BUY XN AT {PRICE} →
              </Link>
            </div>
          </FadeUpSection>
        </div>
      </div>
    </section>
  );
}
