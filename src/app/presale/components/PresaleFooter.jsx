"use client";
export default function PresaleFooter() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-sub)",
        padding: "24px var(--gut)",
        maxWidth: "var(--max-w)",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px 20px",
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.1em",
          color: "var(--text-muted)",
          lineHeight: 1.8,
        }}
      >
        <span>© 2025 SecurityNet.ai</span>
        <span>·</span>
        <span>Smart contract: 0x917D…85FFc</span>
        <span>·</span>
        <a href="/contact-us" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          Terms of Use
        </a>
        <span>·</span>
        <a href="/contact-us" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          Privacy Policy
        </a>
        <span>·</span>
        <a href="/contact-us" style={{ color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
        >
          Risk Disclaimer
        </a>
      </div>
    </footer>
  );
}
