import NeuralOrb from "@/components/animations/NeuralOrb";
import SplitRise from "@/components/animations/SplitRise";
import MagneticButton from "@/components/animations/MagneticButton";

export const metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist or may have been moved.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
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
          Error 404
        </p>
        <div className="flex justify-center">
          <SplitRise
            text="Blind Spot Detected"
            as="h1"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          />
        </div>
        <p
          className="mx-auto mt-5 max-w-md text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Our sensors can&apos;t find the page you&apos;re looking for — it may
          have moved, or never existed. Let&apos;s get you back in frame.
        </p>
        <div className="mt-9 flex justify-center">
          <MagneticButton href="/home" variant="primary" size="md">
            Back to Home
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
