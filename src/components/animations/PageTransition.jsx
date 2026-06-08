"use client";

import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

/**
 * Wraps every route in a soft cross-fade + rise so moving between pages
 * feels like one continuous experience instead of an instant jump/white
 * flash. Keyed on the pathname so App Router swaps trigger the transition.
 *
 * Reduced-motion users get an instant swap — no animation to sit through.
 */
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return children;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
