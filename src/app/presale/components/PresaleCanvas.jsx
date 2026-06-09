"use client";
import dynamic from "next/dynamic";

const TopographicCanvas = dynamic(
  () => import("@/app/home/components/TopographicCanvas"),
  { ssr: false }
);

export default function PresaleCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}>
      <TopographicCanvas />
    </div>
  );
}
