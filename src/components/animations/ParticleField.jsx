"use client";

import { useRef, useEffect } from "react";

/**
 * Drifting glow-dot field. With `connect`, nearby dots are linked by
 * thin pulsing lines — a "neural network thinking" effect — for that
 * high-tech AI atmosphere the brand is going for.
 */
export default function ParticleField({ count = 40, connect = false, linkDistance = 130, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const isMobile = window.innerWidth < 640;
    const n = isMobile ? Math.min(count, 15) : count;
    const colors = ["0, 212, 255", "123, 94, 167"];
    const link = connect && !isMobile;

    const particles = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 1 + Math.random() * 2,
      opacity: 0.1 + Math.random() * 0.3,
      speed: 0.15 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Pulsing links between nearby particles — neural-network "thinking"
      if (link) {
        const pulse = 0.4 + Math.sin(t * 0.02) * 0.3;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < linkDistance) {
              const fade = (1 - dist / linkDistance) * pulse * 0.35;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0, 212, 255, ${fade})`;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }
        }
      }

      particles.forEach((p) => {
        p.y -= p.speed;
        if (p.y < -5) {
          p.y = canvas.height + 5;
          p.x = Math.random() * canvas.width;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [count, connect, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
