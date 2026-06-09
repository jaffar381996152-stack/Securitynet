"use client";
import Link from "next/link";

const STAGE_NUM     = 1;
const STAGE_TOTAL   = 5;
const STAGE_SOLD    = 38;   // percentage
const TOKEN_PRICE   = "$0.20";

export default function UrgencyBar() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 36,
        zIndex: 9000,
        background: "rgba(10,10,14,0.97)",
        borderBottom: "1px solid rgba(212,175,110,0.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Desktop */}
      <div
        className="hidden md:flex"
        style={{
          alignItems: "center",
          gap: 20,
          fontFamily: "'JetBrains Mono','Courier New',monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(240,237,232,0.6)",
        }}
      >
        {/* Pulse dot */}
        <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#4A8C6F",
              display: "inline-block",
              animation: "ubPulse 1.8s ease-in-out infinite",
            }}
          />
          LIVE
        </span>

        <span style={{ color: "rgba(212,175,110,0.3)" }}>│</span>

        <span>
          STAGE{" "}
          <span style={{ color: "#D4AF6E" }}>{STAGE_NUM}</span> OF {STAGE_TOTAL}
        </span>

        <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {/* Mini progress track */}
          <span
            style={{
              width: 60,
              height: 3,
              background: "rgba(212,175,110,0.15)",
              display: "inline-block",
              position: "relative",
              verticalAlign: "middle",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                bottom: 0,
                width: `${STAGE_SOLD}%`,
                background: "#D4AF6E",
              }}
            />
          </span>
          <span style={{ color: "#D4AF6E" }}>{STAGE_SOLD}% SOLD</span>
        </span>

        <span style={{ color: "rgba(212,175,110,0.3)" }}>│</span>

        <span>
          PRICE{" "}
          <span style={{ color: "#D4AF6E" }}>{TOKEN_PRICE} USDT</span>
        </span>

        <span style={{ color: "rgba(212,175,110,0.3)" }}>│</span>

        <Link
          href="/presale"
          data-cursor="cta"
          style={{
            color: "#D4AF6E",
            fontWeight: 600,
            letterSpacing: "0.2em",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#E8C882")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#D4AF6E")}
        >
          BUY NOW →
        </Link>
      </div>

      {/* Mobile: marquee ticker */}
      <div
        className="flex md:hidden"
        style={{ overflow: "hidden", width: "100%", position: "relative" }}
      >
        <div
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            animation: "tickerScroll 18s linear infinite",
            fontFamily: "'JetBrains Mono','Courier New',monospace",
            fontSize: 9,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.6)",
          }}
        >
          {[...Array(3)].map((_, i) => (
            <span key={i} style={{ paddingRight: 48 }}>
              ● STAGE {STAGE_NUM}/{STAGE_TOTAL} &nbsp;·&nbsp; {STAGE_SOLD}% SOLD &nbsp;·&nbsp;
              <span style={{ color: "#D4AF6E" }}>{TOKEN_PRICE} USDT</span>
              &nbsp;·&nbsp; BUY NOW →
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
