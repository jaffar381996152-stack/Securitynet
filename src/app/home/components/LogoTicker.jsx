const BRANDS = [
  "FORBES", "COINDESK", "BLOOMBERG", "REUTERS", "TECHCRUNCH",
  "COINTELEGRAPH", "DECRYPT", "WIRED", "FORTUNE", "THE BLOCK",
];

function TickerRow({ dir = "left", speed = 30 }) {
  const items = [...BRANDS, ...BRANDS]; // duplicate for seamless loop
  const animName = dir === "left" ? "tickerLeft" : "tickerRight";

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          gap: 48,
          whiteSpace: "nowrap",
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((b, i) => (
          <span
            key={i}
            style={{
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.45,
              flexShrink: 0,
              userSelect: "none",
            }}
          >
            {b}
          </span>
        ))}
      </div>

      {/* Edge fade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg,var(--bg-tertiary) 0%,transparent 12%,transparent 88%,var(--bg-tertiary) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

export default function LogoTicker() {
  return (
    <section
      style={{
        padding: "clamp(32px,5vw,64px) 0",
        background: "var(--bg-tertiary)",
        borderTop: "1px solid var(--border-sub)",
        borderBottom: "1px solid var(--border-sub)",
      }}
    >
      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <span className="eyebrow" style={{ marginBottom: 16 }}>AS SEEN IN</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TickerRow dir="left"  speed={28} />
        <TickerRow dir="right" speed={22} />
      </div>
    </section>
  );
}
