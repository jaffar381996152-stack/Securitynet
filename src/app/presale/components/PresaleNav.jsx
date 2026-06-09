"use client";
import Link from "next/link";

export default function PresaleNav() {
  return (
    <header
      style={{
        position: "fixed",
        top: 36,
        left: 0,
        right: 0,
        height: 60,
        zIndex: 8000,
        background: "rgba(10,10,14,0.97)",
        borderBottom: "1px solid rgba(212,175,110,0.22)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max-w)",
          margin: "0 auto",
          padding: "0 var(--gut)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", flexDirection: "column", textDecoration: "none", flexShrink: 0 }}>
          <span style={{ fontFamily: "var(--font-disp)", fontWeight: 800, fontSize: 18, letterSpacing: "0.08em", color: "var(--text-primary)", textTransform: "uppercase", lineHeight: 1.1 }}>
            SecurityNet
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.22em", color: "var(--gold)", lineHeight: 1.5 }}>
            securitynet.ai
          </span>
        </Link>

        {/* Center info */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: 20, fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase" }}
        >
          <span className="badge" style={{ margin: 0 }}>
            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--c-success)", display: "inline-block", animation: "ubPulse 1.8s ease-in-out infinite" }} />
            STAGE 3 · LIVE NOW
          </span>
          <span style={{ color: "var(--gold)" }}>1 XN = $0.20 USDT</span>
          <span style={{ color: "var(--text-muted)" }}>LISTING: $0.80 USDT</span>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-disp)",
            fontWeight: 600,
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-sec)",
            border: "1px solid var(--border-sub)",
            padding: "8px 16px",
            textDecoration: "none",
            transition: "border-color 0.2s, color 0.2s",
            flexShrink: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border-sub)"; e.currentTarget.style.color = "var(--text-sec)"; }}
        >
          ← Back to site
        </Link>
      </div>
    </header>
  );
}
