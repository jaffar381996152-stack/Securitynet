"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PRESALE_END = new Date(
  process.env.NEXT_PUBLIC_PRESALE_END_DATE || "2027-01-01T00:00:00Z"
);

function calculateTimeLeft() {
  const diff = PRESALE_END - new Date();
  if (diff <= 0) return null;
  return {
    days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipDigit({ value }) {
  const display = String(value).padStart(2, "0");
  return (
    <div className="overflow-hidden h-[1.15em] relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={display}
          initial={{ y: "-110%", opacity: 0 }}
          animate={{ y: "0%",    opacity: 1 }}
          exit={{    y: "110%",  opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="block leading-none"
        >
          {display}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

function TimerCard({ value, label }) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          "0 0 0px rgba(108,92,231,0)",
          "0 0 22px rgba(108,92,231,0.28)",
          "0 0 0px rgba(108,92,231,0)",
        ],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col items-center justify-center gap-2.5 rounded-xl"
      style={{
        background:     "var(--bg-glass)",
        backdropFilter: "blur(12px)",
        border:         "1px solid var(--border-glass)",
        width:          "clamp(68px, 13vw, 116px)",
        height:         "clamp(80px, 15vw, 130px)",
      }}
    >
      <span
        className="font-sora font-bold leading-none select-none"
        style={{
          fontSize: "clamp(1.75rem, 5.5vw, 3rem)",
          color:    "var(--text-primary)",
        }}
      >
        <FlipDigit value={value} />
      </span>
      <span
        className="text-[10px] font-semibold tracking-[0.18em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function Separator() {
  return (
    <motion.div
      animate={{ opacity: [1, 0.25, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="flex flex-col gap-1.5 shrink-0 pb-7"
      aria-hidden="true"
    >
      <span
        className="block w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--brand-mid)", boxShadow: "0 0 6px var(--brand-mid)" }}
      />
      <span
        className="block w-1.5 h-1.5 rounded-full"
        style={{ background: "var(--brand-mid)", boxShadow: "0 0 6px var(--brand-mid)" }}
      />
    </motion.div>
  );
}

export default function PreSale({ tokensSold, presaleCap }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-[600px] mx-auto px-4 py-4">
      {timeLeft === null ? (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-sora text-xl font-bold text-center"
          style={{ color: "var(--brand-gold)" }}
        >
          Pre-Sale Has Ended
        </motion.p>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Pre-Sale Ends In
          </motion.p>

          <div className="flex items-center gap-2 sm:gap-3">
            <TimerCard value={timeLeft.days}    label="DAYS" />
            <Separator />
            <TimerCard value={timeLeft.hours}   label="HRS"  />
            <Separator />
            <TimerCard value={timeLeft.minutes} label="MIN"  />
            <Separator />
            <TimerCard value={timeLeft.seconds} label="SEC"  />
          </div>
        </div>
      )}
    </div>
  );
}
