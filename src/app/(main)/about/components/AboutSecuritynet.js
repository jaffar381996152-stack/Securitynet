"use client";

import { useRef } from "react";
import { Eye } from "lucide-react";
import AnimatedVisualPanel from "@/components/brand/AnimatedVisualPanel";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitRise from "@/components/animations/SplitRise";

const paragraphs = [
  "Securitynet AI is focused on one mission: turning cameras into intelligent security systems. We design and deploy AI-driven video analytics that detect weapons, automate attendance, monitor behavior, and provide real-time security insights for organizations of any size.",
  "Beyond algorithms, we engineer the complete digital layer around your surveillance infrastructure. Our team builds secure web portals and admin panels that allow you to manage all your cameras, AI models, alerts, and users from a single, intuitive interface.",
  "We also offer remote AI operations and monitoring services to help you reduce cost and improve response time. Our experts manage and fine-tune your detection pipelines, triage alerts, and keep your systems running smoothly.",
  "Security and privacy are at the core of everything we build. From end-to-end encrypted data flows to strict access control and secure deployments, we ensure your video data and analytics stay fully protected.",
];

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export default function AboutSecuritynet() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 relative overflow-hidden">
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
              WHO WE ARE
            </motion.p>
            <SplitRise
              text="About Securitynet"
              as="h2"
              delay={0.1}
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-10"
            />
            <motion.div
              className="flex flex-col gap-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
            >
              {paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  variants={itemVariants}
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {p}
                </motion.p>
              ))}
            </motion.div>
          </div>

          {/* Right — floating glass frame + parallax */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-1 relative order-1 lg:order-2 w-full max-w-[460px] lg:max-w-none"
          >
            <div className="relative mx-auto" style={{ maxWidth: 440 }}>
              {/* Glass frame */}
              <div
                className="rounded-[2rem] p-[1px]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(108,92,231,0.35) 0%, rgba(0,212,255,0.12) 100%)",
                  boxShadow: "0 24px 80px rgba(108,92,231,0.16)",
                }}
              >
                <div
                  className="rounded-[1.9375rem] overflow-hidden"
                  style={{ background: "var(--bg-glass)", backdropFilter: "blur(8px)" }}
                >
                  <div className="relative h-[480px] sm:h-[540px] overflow-hidden">
                    <motion.div
                      className="absolute inset-0"
                      style={{ y: imageY, scale: 1.35, transformOrigin: "center" }}
                    >
                      <AnimatedVisualPanel
                        icon={Eye}
                        accent="#7B5EA7"
                        accent2="#00D4FF"
                        label="Intelligent Operations"
                        className="absolute inset-0"
                      />
                    </motion.div>
                    {/* Bottom fade */}
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

              {/* Floating chip */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
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
                      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
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
                    Secure by Design
                  </p>
                  <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
                    End-to-end encrypted
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
