"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { getGsap } from "@/lib/gsap";

/**
 * Wraps the app in buttery-smooth, weighted scroll (Lenis) and keeps
 * GSAP ScrollTrigger perfectly in sync with it. Disables itself entirely
 * when the user has "reduce motion" turned on — they get normal native
 * scrolling instead.
 */
export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const { gsap, ScrollTrigger } = getGsap();

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return children;
}
