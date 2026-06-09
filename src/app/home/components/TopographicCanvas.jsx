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
    let offset = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const FPS = 24;
    const INTERVAL = 1000 / FPS;

    const draw = (ts) => {
      rafId = requestAnimationFrame(draw);
      if (ts - lastTs < INTERVAL) return;
      lastTs = ts;
      offset += 0.18;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const lineGap   = 34;
      const dotRadius = 1.8;
      const dotGap    = 90;
      const amplitude = 14;
      const freq      = 0.0045;

      ctx.strokeStyle = "rgba(212,175,110,0.055)";
      ctx.lineWidth   = 1;
      ctx.fillStyle   = "rgba(212,175,110,0.14)";

      for (let row = 0; row * lineGap < height + lineGap; row++) {
        const baseY = row * lineGap;
        const phaseShift = row * 0.6;

        ctx.beginPath();
        for (let x = 0; x <= width; x += 2) {
          const y = baseY + Math.sin((x * freq) + (offset * 0.02) + phaseShift) * amplitude;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Dot nodes
        for (let x = 0; x <= width; x += dotGap) {
          const y = baseY + Math.sin((x * freq) + (offset * 0.02) + phaseShift) * amplitude;
          ctx.beginPath();
          ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
      aria-hidden="true"
    />
  );
}
