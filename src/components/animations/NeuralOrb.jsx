"use client";

export default function NeuralOrb({ size = 420, className = "" }) {
  const s = typeof size === "number" ? `${size}px` : size;

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      style={{ width: s, height: s }}
      aria-hidden="true"
    >
      {/* Outer slow-rotating ring */}
      <div
        className="absolute inset-0 orb-ring"
        style={{ animationDuration: "20s" }}
      />

      {/* Inner ring, tilted 60° */}
      <div
        className="absolute inset-0 orb-ring"
        style={{
          animationDuration: "30s",
          animationDirection: "reverse",
          transform: "rotate3d(1, 0.5, 0, 60deg)",
        }}
      />

      {/* Dashed ring */}
      <div
        className="absolute inset-[8%] rounded-full"
        style={{
          border: "1px dashed rgba(0, 212, 255, 0.15)",
          animation: "orb-ring-spin 25s linear infinite",
          animationDirection: "reverse",
        }}
      />

      {/* Core orb */}
      <div
        className="absolute orb"
        style={{ inset: "12%" }}
      />

      {/* Ambient glow ring */}
      <div
        className="absolute inset-[-15%] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0, 212, 255, 0.05) 0%, transparent 70%)",
          animation: "orb-pulse 8s ease-in-out infinite",
        }}
      />

      {/* Orbital nodes */}
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <div
          key={deg}
          className="absolute rounded-full"
          style={{
            width: 6,
            height: 6,
            background: "var(--brand-cyan)",
            top: "50%",
            left: "50%",
            transform: `rotate(${deg}deg) translateX(${size / 2 - 20}px) translateY(-50%)`,
            opacity: 0.6,
            animation: `orb-pulse ${2 + (deg / 60) * 0.4}s ease-in-out infinite`,
            boxShadow: "0 0 6px var(--brand-cyan)",
          }}
        />
      ))}
    </div>
  );
}
