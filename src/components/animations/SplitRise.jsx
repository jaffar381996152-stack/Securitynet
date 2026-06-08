"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SplitRise({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={
              isInView
                ? { opacity: 1, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 30, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.6,
              delay: delay + i * 0.08,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
