"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/**
 * Registers GSAP plugins exactly once and applies a global config that
 * respects `prefers-reduced-motion`. Call this from any client component
 * before using gsap/ScrollTrigger — safe to call repeatedly.
 */
export function getGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      // Collapse every tween/scrub to near-instant instead of disabling
      // GSAP outright — keeps end-states correct without the motion.
      gsap.globalTimeline.timeScale(200);
      ScrollTrigger.config({ ignoreMobileResize: true });
    }

    registered = true;
  }

  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger };
