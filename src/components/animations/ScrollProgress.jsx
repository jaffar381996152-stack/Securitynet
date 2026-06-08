"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        height: 2,
        scaleX,
        background:
          "linear-gradient(90deg, var(--brand-start) 0%, var(--brand-mid) 50%, var(--brand-cyan) 100%)",
      }}
    />
  );
}
