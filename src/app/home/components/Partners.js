"use client";

import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";

const ecosystem = [
  { name: "BNB Chain",      color: "#F0B90B" },
  { name: "Tether USDT",    color: "#26A17B" },
  { name: "WalletConnect",  color: "#3B99FC" },
  { name: "Moralis",        color: "#7B5EA7" },
  { name: "MetaMask",       color: "#E8831D" },
  { name: "Amazon AWS",     color: "#FF9900" },
  { name: "MongoDB",        color: "#00ED64" },
  { name: "OpenAI",         color: "#10A37F" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Partners() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Faint top / bottom dividers */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute bottom-0 inset-x-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--border-subtle) 50%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            POWERED BY
          </motion.p>
          <SplitRise
            text="Built on Industry-Leading Technology"
            as="h2"
            delay={0.05}
            className="text-2xl sm:text-3xl font-bold tracking-tight max-w-xl"
          />
        </div>

        {/* Pills */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {ecosystem.map((item, i) => (
            <motion.div
              key={i}
              variants={pillVariants}
              whileHover={{
                scale: 1.06,
                borderColor: "rgba(108,92,231,0.35)",
                transition: { duration: 0.2 },
              }}
              className="glass flex items-center gap-2.5 px-5 py-2.5 rounded-full cursor-default"
              style={{ border: "1px solid var(--border-glass)" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full shrink-0"
                style={{
                  background: item.color,
                  boxShadow: `0 0 6px ${item.color}90`,
                }}
              />
              <span
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
