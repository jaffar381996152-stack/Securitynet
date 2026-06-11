import { ImageResponse } from "next/og";

export const alt = "Securitynet — AI-Powered Security, Fueled By The XN Token";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Code-generated share-preview card — drawn in the Ghost Protocol gold theme
// (see globals.css --gold/--bg-primary), echoing the shield/"XN" mark of
// src/app/icon.svg. No raster assets involved.
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0E",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(212,175,110,0.16) 0%, rgba(10,10,14,0) 62%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 136,
            height: 136,
            borderRadius: 16,
            border: "2px solid #D4AF6E",
            backgroundColor: "rgba(212,175,110,0.06)",
            marginBottom: 44,
            fontSize: 48,
            fontWeight: 800,
            letterSpacing: 2,
            color: "#D4AF6E",
          }}
        >
          XN
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#F0EDE8",
          }}
        >
          Security<span style={{ color: "#D4AF6E" }}>net</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 26,
            padding: "0 100px",
            fontSize: 30,
            color: "#B8B5AE",
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          AI-Powered Security, Fueled By The XN Token
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 40,
            padding: "12px 32px",
            border: "1px solid rgba(212,175,110,0.35)",
            color: "#D4AF6E",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
          }}
        >
          XN Presale Live · $0.20 USDT
        </div>
      </div>
    ),
    { ...size }
  );
}
