"use client";
import Link from "next/link";

export default function MobileBottomBar() {
  return (
    <div
      className="mobile-bottom-bar flex lg:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        background: "var(--bg-secondary)",
        borderTop: "1px solid var(--border-gold)",
        zIndex: 6000,
        padding: "0 var(--gut)",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.14em",
          color: "var(--text-muted)",
        }}
      >
        1 XN = <span style={{ color: "var(--gold)" }}>$0.20</span> · STAGE 3
      </span>

      <Link
        href="/presale"
        data-cursor="cta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          height: 44,
          padding: "0 24px",
          background: "var(--gold)",
          color: "var(--text-inv)",
          fontFamily: "var(--font-disp)",
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          textDecoration: "none",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#E8C882")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "var(--gold)")}
      >
        BUY XN →
      </Link>
    </div>
  );
}
