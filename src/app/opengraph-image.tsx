import { ImageResponse } from "next/og";

export const alt = "Securitynet — AI Eyes, Safe Skies Fueled By Blockchain Technology";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Code-generated share-preview card — drawn entirely from the same brand
// gradient/colors as the rest of the UI (see globals.css --brand-*), echoing
// the eye/lens motif of src/app/icon.svg. No raster assets involved.
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
          backgroundColor: "#05060C",
          backgroundImage:
            "radial-gradient(circle at 50% 32%, rgba(108,92,231,0.35) 0%, rgba(5,6,12,0) 62%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 136,
            height: 136,
            borderRadius: 30,
            border: "3px solid #6C5CE7",
            backgroundColor: "rgba(0,212,255,0.06)",
            marginBottom: 44,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 54,
              height: 54,
              borderRadius: 9999,
              backgroundImage:
                "linear-gradient(135deg, #00D4FF 0%, #6C5CE7 55%, #A78BFA 100%)",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 700,
            letterSpacing: -2,
            backgroundImage:
              "linear-gradient(90deg, #00D4FF 0%, #6C5CE7 50%, #A78BFA 100%)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Securitynet
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 24,
            padding: "0 100px",
            fontSize: 30,
            color: "#8892A4",
            letterSpacing: 0.5,
            textAlign: "center",
          }}
        >
          AI Eyes, Safe Skies — Fueled By Blockchain Technology
        </div>
      </div>
    ),
    { ...size }
  );
}
