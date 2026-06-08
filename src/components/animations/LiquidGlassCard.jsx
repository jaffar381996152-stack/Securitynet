"use client";

import { motion } from "framer-motion";

export default function LiquidGlassCard({
  children,
  className = "",
  hover = true,
  padding = true,
}) {
  const base = `glass-card rounded-[var(--radius-card)] ${padding ? "p-6" : ""} ${className}`;

  if (!hover) {
    return <div className={base}>{children}</div>;
  }

  return (
    <motion.div
      className={base}
      whileHover={{
        y: -6,
        boxShadow:
          "0 20px 60px rgba(108, 92, 231, 0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
        borderColor: "rgba(108, 92, 231, 0.30)",
      }}
      transition={{
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
