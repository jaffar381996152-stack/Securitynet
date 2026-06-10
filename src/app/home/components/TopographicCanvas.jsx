"use client";
import { useEffect, useRef } from "react";

export default function TopographicCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let rafId;
    let lastTs = 0;
    let frame  = 0;

    const LINES     = 36;
    const FPS       = 22;
    const INTERVAL  = 1000 / FPS;
    const AMPLITUDE = 16;
    const FREQ      = 0.0042;
    const DOT_R     = 1.6;
    const DOT_GAP   = 130;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onScroll = () => {
      const dim = window.scrollY > window.innerHeight * 0.6;
      canvas.style.opacity = dim ? "0.35" : "1";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      frame++;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const spacing = height / (LINES + 1);

      for (let i = 0; i < LINES; i++) {
        const major  = i % 5 === 0;
        const baseY  = (i + 1) * spacing;
        const phase  = i * 0.72 + frame * 0.012;

        ctx.strokeStyle = major ? "rgba(212,175,110,0.13)" : "rgba(212,175,110,0.055)";
        ctx.lineWidth   = major ? 0.8 : 0.4;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y = baseY
            + Math.sin(x * FREQ + phase) * AMPLITUDE
            + Math.sin(x * FREQ * 2.3 + phase * 1.6) * (AMPLITUDE * 0.4);
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (major) {
          ctx.fillStyle = "rgba(212,175,110,0.18)";
          for (let x = 0; x <= width; x += DOT_GAP) {
            const y = baseY
              + Math.sin(x * FREQ + phase) * AMPLITUDE
              + Math.sin(x * FREQ * 2.3 + phase * 1.6) * (AMPLITUDE * 0.4);
            ctx.beginPath();
            ctx.arc(x, y, DOT_R, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        transition: "opacity 0.5s ease",
      }}
      aria-hidden="true"
    />
  );
}
