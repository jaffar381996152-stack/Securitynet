"use client";
const ROW1 = ["CoinTelegraph", "Decrypt", "CoinDesk", "The Block", "Binance", "CryptoSlate", "BeInCrypto", "NewsBTC"];
const ROW2 = ["DappRadar", "BSCScan", "CoinMarketCap", "CoinGecko", "Etherscan", "DefiLlama", "TokenInsight", "Messari"];

function TickerRow({ brands, dir = "left", speed = 28 }) {
  const items = [...brands, ...brands];
  const animName = dir === "left" ? "tickerLeft" : "tickerRight";

  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div
        style={{
          display: "flex",
          gap: 0,
          whiteSpace: "nowrap",
          animation: `${animName} ${speed}s linear infinite`,
          willChange: "transform",
        }}
      >
        {items.map((b, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 160,
              height: 48,
              fontFamily: "var(--font-disp)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.4,
              flexShrink: 0,
              userSelect: "none",
              cursor: "default",
              transition: "opacity 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.color = "var(--gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "0.4";
              e.currentTarget.style.color = "var(--text-muted)";
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
          background: "linear-gradient(90deg,var(--bg-tertiary) 0%,transparent 10%,transparent 90%,var(--bg-tertiary) 100%)",
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
        <span className="eyebrow" style={{ marginBottom: 16 }}>AS FEATURED IN / POWERED BY</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <TickerRow brands={ROW1} dir="left"  speed={22} />
        <TickerRow brands={ROW2} dir="right" speed={26} />
      </div>
    </section>
  );
}
