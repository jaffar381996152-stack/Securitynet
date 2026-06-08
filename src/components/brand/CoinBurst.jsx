"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Celebratory "coin shower" — a burst of small XN coin glyphs that fly
 * outward and tumble down. Mount it once near the top of a screen/card
 * and flip `active` to true the instant a purchase succeeds; it replays
 * every time `burstKey` changes.
 *
 * Renders nothing for reduced-motion users (the success state is still
 * communicated via text/UI — this is a celebratory extra, not information).
 *
 * @param {boolean} active     Show the burst
 * @param {string|number} burstKey  Change this to replay the animation
 * @param {number}  count      How many coins to burst
 */
export default function CoinBurst({ active = false, burstKey = 0, count = 18 }) {
  const reducedMotion = useReducedMotion();

  const coins = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.4;
        const distance = 90 + Math.random() * 140;
        return {
          id: i,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance * 0.6 - 40,
          fallY: 220 + Math.random() * 140,
          rotate: (Math.random() - 0.5) * 720,
          scale: 0.45 + Math.random() * 0.4,
          delay: Math.random() * 0.25,
          duration: 1.4 + Math.random() * 0.9,
          hue: i % 3,
        };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [burstKey, count]
  );

  if (reducedMotion) return null;

  const palette = [
    "linear-gradient(135deg, #F9A328 0%, #F0D9A8 100%)",
    "linear-gradient(135deg, #00D4FF 0%, #7B5EA7 100%)",
    "linear-gradient(135deg, #C24CF2 0%, #00D4FF 100%)",
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible" aria-hidden="true">
      <AnimatePresence>
        {active && (
          <motion.div
            key={burstKey}
            className="absolute left-1/2 top-1/2"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            {coins.map((c) => (
              <motion.span
                key={c.id}
                className="absolute rounded-full flex items-center justify-center text-[9px] font-extrabold"
                style={{
                  width: 22,
                  height: 22,
                  marginLeft: -11,
                  marginTop: -11,
                  background: palette[c.hue],
                  color: "rgba(8,11,20,0.78)",
                  boxShadow: "0 0 14px rgba(249,163,40,0.35)",
                }}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0, rotate: 0 }}
                animate={{
                  x: [0, c.x, c.x * 1.15],
                  y: [0, c.y, c.y + c.fallY],
                  opacity: [0, 1, 1, 0],
                  scale: [0, c.scale, c.scale],
                  rotate: [0, c.rotate],
                }}
                transition={{
                  duration: c.duration,
                  delay: c.delay,
                  times: [0, 0.35, 1],
                  ease: [0.22, 0.61, 0.36, 1],
                }}
              >
                XN
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
