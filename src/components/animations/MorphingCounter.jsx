"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function MorphingCounter({
  to,
  from = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  duration = 1.5,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const count = useSpring(from, {
    stiffness: 50,
    damping: 15,
    restDelta: 0.001,
  });

  const display = useTransform(count, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );

  useEffect(() => {
    if (isInView) {
      count.set(to);
    }
  }, [isInView, to, count]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
