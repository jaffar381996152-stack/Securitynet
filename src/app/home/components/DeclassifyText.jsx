"use client";
import { useEffect, useRef, useState } from "react";

export default function DeclassifyText({ text, tag: Tag = "span", style = {}, className = "", delay = 0 }) {
  const ref       = useRef(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ display: "inline", ...style }} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: char === " " ? "inline" : "inline-block",
            opacity: go ? 1 : 0,
            transform: go ? "none" : "translateX(-4px)",
            transition: go
              ? `opacity 0.04s ease ${delay + i * 0.032}s, transform 0.04s ease ${delay + i * 0.032}s`
              : "none",
          }}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </Tag>
  );
}
