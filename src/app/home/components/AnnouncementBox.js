"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function AnnouncementBox() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="max-w-7xl mx-auto px-6 pb-8"
    >
      <div className="relative glass-card rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 overflow-hidden">

        {/* Gradient left accent border */}
        <div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
          style={{
            background:
              "linear-gradient(180deg, var(--brand-start) 0%, var(--brand-end) 100%)",
          }}
        />

        {/* Pulsing dot + text */}
        <div className="pl-4 sm:pl-5">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "var(--accent-cyan)",
                boxShadow: "0 0 8px var(--accent-cyan)",
                animation: "orb-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent-cyan)" }}
            >
              Live Now
            </span>
          </div>
          <h3
            className="text-lg sm:text-xl font-bold mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            XN Token Presale is Live
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Purchase XN tokens at the presale price of{" "}
            <strong style={{ color: "var(--brand-gold)" }}>$0.20</strong>{" "}
            before public listing.
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/presale"
          className="btn-primary btn-shimmer px-6 py-3 text-sm rounded-xl shrink-0"
        >
          Join Presale →
        </Link>
      </div>
    </motion.div>
  );
}
