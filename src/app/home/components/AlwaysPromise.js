"use client";

import { useRef } from "react";
import { Radar } from "lucide-react";
import AnimatedVisualPanel from "@/components/brand/AnimatedVisualPanel";
import XNCoin from "@/components/brand/XNCoin";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";

const promises = [
  {
    num: "01",
    title: "24/7 Surveillance",
    text: "Our cloud-based service offers continuous surveillance, providing a constant watchful eye over your property, day and night.",
  },
  {
    num: "02",
    title: "Cost-Effective",
    text: "Eliminate the need for expensive on-premises hardware. Our service is subscription-based and backed with crypto tokens.",
  },
  {
    num: "03",
    title: "Customer Support",
    text: "Our support team is available around the clock to assist you with any queries or concerns.",
  },
  {
    num: "04",
    title: "Smart Object Recognition",
    text: "Our AI identifies objects with precision — from people to vehicles — triggering customizable instant alerts.",
  },
];

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AlwaysPromise() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient floating coin — soft background brand presence */}
      <div className="absolute top-1/3 -left-20 opacity-25 pointer-events-none hidden md:block" aria-hidden="true">
        <XNCoin size={160} float spinDuration={14} glow={false} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* Left — text */}
          <div className="flex-1 lg:max-w-[520px] order-2 lg:order-1">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-4"
              style={{ color: "var(--accent-cyan)" }}
            >
              OUR PROMISE
            </motion.p>
            <SplitRise
              text="Things We Always Promise"
              as="h2"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-12"
            />

            <motion.div
              className="flex flex-col gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {promises.map((p, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  className="flex items-start gap-5"
                >
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                      boxShadow: "0 0 16px var(--brand-glow)",
                    }}
                  >
                    {p.num}
                  </div>
                  <div>
                    <h3
                      className="font-sora text-base sm:text-lg font-semibold mb-1"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {p.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — floating image frame */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 relative order-1 lg:order-2 w-full max-w-[480px] lg:max-w-none"
          >
            {/* Outer wrapper — positive padding gives room for the floating chips */}
            <div className="relative mx-auto" style={{ maxWidth: 440 }}>

              {/* Glass frame */}
              <div
                className="rounded-[2rem] p-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(108,92,231,0.40) 0%, rgba(0,212,255,0.15) 100%)",
                  boxShadow:
                    "0 24px 80px rgba(108,92,231,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="rounded-[1.9375rem] overflow-hidden"
                  style={{ background: "var(--bg-glass)", backdropFilter: "blur(8px)" }}
                >
                  {/* Parallax image */}
                  <div className="relative h-[420px] sm:h-[480px] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{ y: imageY, scale: 1.35, transformOrigin: "center" }}
                    >
                      <AnimatedVisualPanel
                        icon={Radar}
                        accent="#F9A328"
                        accent2="#6C5CE7"
                        label="Always Watching"
                        className="absolute inset-0"
                      />
                    </motion.div>
                    {/* Bottom gradient mask */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-28 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-base) 0%, transparent 100%)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Floating chip — bottom left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 glass-card rounded-2xl px-4 py-3 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--brand-start), var(--brand-mid))",
                    boxShadow: "0 0 12px var(--brand-glow)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className="text-xs font-bold leading-none mb-0.5"
                    style={{ color: "var(--text-primary)" }}
                  >
                    AI Powered
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    Real-time Analysis
                  </p>
                </div>
              </motion.div>

              {/* Floating chip — top right */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -top-4 -right-4 glass-card rounded-full px-4 py-2 flex items-center gap-2"
              >
                <span
                  className="inline-block w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: "var(--accent-cyan)",
                    boxShadow: "0 0 8px var(--accent-cyan)",
                    animation: "orb-pulse 2s ease-in-out infinite",
                  }}
                />
                <p
                  className="text-xs font-semibold whitespace-nowrap"
                  style={{ color: "var(--accent-cyan)" }}
                >
                  24/7 Active
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
