"use client";
import { useEffect, useRef, useState } from "react";

export default function useCounterAnimation({ target, duration = 1400, suffix = "", formatter = Math.round }) {
  const ref = useRef(null);
  const [value, setValue] = useState(formatter(0) + suffix);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setValue(formatter(Math.round(target * eased)) + suffix);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration, suffix, formatter]);

  return { ref, value };
}
