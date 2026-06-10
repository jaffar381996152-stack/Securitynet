"use client";

import { useEffect } from "react";
import NeuralOrb from "@/components/animations/NeuralOrb";
import SplitRise from "@/components/animations/SplitRise";
import MagneticButton from "@/components/animations/MagneticButton";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <NeuralOrb size={520} className="opacity-30" />
      </div>

      <div
        className="glass-card relative z-10 w-full max-w-xl rounded-[var(--radius-card)] px-8 py-14 text-center sm:px-14"
      >
        <p
          className="mb-5 text-xs font-semibold uppercase tracking-[0.3em]"
          style={{ color: "var(--accent-cyan)" }}
        >
          System Alert
        </p>
        <div className="flex justify-center">
          <SplitRise
            text="Signal Interrupted"
            as="h1"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          />
        </div>
        <p
          className="mx-auto mt-5 max-w-md text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Something went wrong on our end. Try again, or head back to safety
          while we get things back online.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <MagneticButton onClick={() => reset()} variant="primary" size="md">
            Try Again
          </MagneticButton>
          <MagneticButton href="/" variant="ghost" size="md">
            Back to Home
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
