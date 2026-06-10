"use client";

export default function OrDivider({ label = "OR" }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
      <div style={{ flex: 1, height: 1, background: "var(--border-sub)" }} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: "var(--text-muted)",
        }}
      >
        {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--border-sub)" }} />
    </div>
  );
}
