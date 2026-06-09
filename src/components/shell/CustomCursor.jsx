"use client";
import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const rafRef  = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Desktop only
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setMounted(true);

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.14);
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.14);
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 18}px, ${ring.current.y - 18}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnterCta = (e) => {
      const el = e.target.closest("[data-cursor='cta']");
      if (el && ringRef.current) {
        ringRef.current.style.width  = "64px";
        ringRef.current.style.height = "64px";
        ringRef.current.style.marginTop  = "-14px";
        ringRef.current.style.marginLeft = "-14px";
        ringRef.current.style.opacity = "1";
      }
    };
    const onLeaveCta = () => {
      if (ringRef.current) {
        ringRef.current.style.width  = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.marginTop  = "0px";
        ringRef.current.style.marginLeft = "0px";
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onEnterCta);
    document.addEventListener("mouseout",  onLeaveCta);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnterCta);
      document.removeEventListener("mouseout",  onLeaveCta);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#D4AF6E",
          zIndex: 99998,
          pointerEvents: "none",
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1.5px solid rgba(212,175,110,0.55)",
          zIndex: 99997,
          pointerEvents: "none",
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
          opacity: 0.7,
        }}
      />
    </>
  );
}
