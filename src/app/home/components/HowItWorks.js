"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";
import SplitRise from "@/components/animations/SplitRise";
import XNCoin from "@/components/brand/XNCoin";

const advantages = [
  {
    num: "01",
    title: "Next Generation Video Intelligence",
    body: "Our platform transforms ordinary CCTV footage into actionable intelligence using advanced AI detecting weapons, intrusions, unusual behaviors, and compliance events instantly.",
  },
  {
    num: "02",
    title: "Custom Algorithms Tailored to Your Needs",
    body: "Whether you need weapon detection, attendance automation, face recognition, PPE monitoring, or activity tracking — our team builds fully customized AI models designed around your environment.",
  },
  {
    num: "03",
    title: "Centralized Command & Control",
    body: "Manage thousands of cameras, alerts, and analytics from a unified, cloud-based or on-premise dashboard. Complete visibility. Zero complexity.",
  },
  {
    num: "04",
    title: "Enterprise Grade Security",
    body: "We follow military-grade encryption and strict privacy protocols. Your video streams, user data, and analytics are protected end-to-end.",
  },
  {
    num: "05",
    title: "Remote Operations for Maximum Efficiency",
    body: "Reduce operational costs with our remote monitoring solutions. No need for on-site teams.",
  },
  {
    num: "06",
    title: "Mobile Apps for Alerts & Reports",
    body: "We develop secure and scalable applications to manage all your cameras, analytics, and alerts from a single place.",
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const coinY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Ambient floating coin — soft background brand presence, drifts slower than scroll for depth */}
      <motion.div
        style={{ y: coinY }}
        className="absolute -top-10 -right-16 opacity-30 pointer-events-none hidden md:block"
        aria-hidden="true"
      >
        <XNCoin size={180} float spinDuration={16} glow={false} />
      </motion.div>

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
            OUR ADVANTAGES
          </motion.p>
          <SplitRise
            text="Why SecurityNet AI"
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight max-w-2xl"
          />
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          {advantages.map((adv, i) => (
            <motion.div key={i} variants={cardVariants} className="h-full">
              <LiquidGlassCard className="h-full" padding={false}>
                <div className="p-8 flex flex-col gap-6 h-full">
                  {/* Number badge */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--brand-start) 0%, var(--brand-mid) 100%)",
                      boxShadow: "0 0 20px var(--brand-glow)",
                    }}
                  >
                    {adv.num}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-sora text-lg sm:text-xl font-semibold leading-snug"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {adv.title}
                  </h3>

                  {/* Body */}
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {adv.body}
                  </p>
                </div>
              </LiquidGlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
