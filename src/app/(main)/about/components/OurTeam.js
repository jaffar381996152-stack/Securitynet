"use client";

import { motion } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";
import GeneratedAvatar from "@/components/brand/GeneratedAvatar";

const team = [
  { name: "Jhon Doe", role: "President of Sales" },
  { name: "Alex Carter", role: "Head of AI Engineering" },
  { name: "Maria Lopez", role: "Blockchain Lead" },
  { name: "Sam Patel", role: "Director of Operations" },
  { name: "Lena Schmidt", role: "Head of Security Research" },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function OurTeam() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
            style={{ color: "var(--accent-cyan)" }}
          >
            OUR TEAM
          </motion.p>
          <SplitRise
            text="Talented and Experienced"
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl"
          />
        </div>

        {/* Team grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {team.map((member, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              whileHover={{
                y: -6,
                boxShadow:
                  "0 20px 60px rgba(108,92,231,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                borderColor: "rgba(108,92,231,0.30)",
                transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
              }}
              className="glass-card rounded-[var(--radius-card)] overflow-hidden p-3 flex flex-col gap-4 group"
            >
              {/* Generated avatar panel */}
              <div
                className="relative overflow-hidden rounded-xl flex items-center justify-center"
                style={{ aspectRatio: "304 / 352", background: "var(--bg-surface)" }}
              >
                <motion.div
                  className="absolute inset-0 opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 35%, rgba(108,92,231,0.20) 0%, transparent 70%)",
                  }}
                />
                <GeneratedAvatar name={member.name} size={120} className="relative z-10" />
                {/* Bottom gradient */}
                <div
                  className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, var(--bg-glass) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Info */}
              <div className="text-center pb-1">
                <h6
                  className="font-sora text-sm font-semibold mb-0.5"
                  style={{ color: "var(--text-primary)" }}
                >
                  {member.name}
                </h6>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
