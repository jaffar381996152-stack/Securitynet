"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { images3 } from "@/app/libs/generates3url";
import SplitRise from "@/components/animations/SplitRise";
import LiquidGlassCard from "@/components/animations/LiquidGlassCard";

function daysUntil(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff > 0) return `${diff} days`;
  if (diff === 0) return "Today";
  return "Past";
}

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

export default function Events() {
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/uploadevent")
      .then((r) => r.json())
      .then((data) => setEventData(data.images ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (!loading && eventData.length === 0) return null;

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
            DISCOVER
          </motion.p>
          <SplitRise
            text="Upcoming Events"
            as="h2"
            delay={0.1}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          />
        </div>

        {/* Loading skeletons */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="glass-card rounded-[var(--radius-card)] h-72 animate-pulse"
                style={{ opacity: 0.4 }}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            {eventData.map((event, i) => (
              <motion.div key={i} variants={cardVariants} className="h-full">
                <LiquidGlassCard padding={false} className="h-full overflow-hidden">

                  {/* Image with overlays */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={images3(event.event_image)}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={event.title}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Darkened overlay */}
                    <div
                      className="absolute inset-0"
                      style={{ background: "rgba(8,11,20,0.45)" }}
                    />
                    {/* Gradient mask at bottom */}
                    <div
                      className="absolute bottom-0 inset-x-0 h-16 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(to top, var(--bg-glass) 0%, transparent 100%)",
                      }}
                    />
                    {/* Date badge */}
                    <div className="absolute top-4 left-4">
                      <div
                        className="glass rounded-full px-3 py-1.5 flex items-center gap-2"
                        style={{ border: "1px solid var(--border-glass)" }}
                      >
                        <span
                          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: "var(--accent-cyan)",
                            boxShadow: "0 0 6px var(--accent-cyan)",
                          }}
                        />
                        <span
                          className="text-xs font-semibold"
                          style={{ color: "var(--accent-cyan)" }}
                        >
                          {daysUntil(event.date)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-6 flex flex-col gap-2">
                    <h3
                      className="font-sora text-lg font-semibold leading-snug"
                      style={{ color: "var(--text-primary)" }}
                    >
                      {event.title}
                    </h3>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      Coming Soon
                    </p>
                  </div>

                </LiquidGlassCard>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </section>
  );
}
