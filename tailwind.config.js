/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow:    ["'Barlow Condensed'", "'Arial Narrow'", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "Georgia", "serif"],
        jetbrains: ["'JetBrains Mono'", "'Courier New'", "monospace"],
        // Aliases — redirected to Ghost Protocol fonts
        inter: ["'Barlow Condensed'", "'Arial Narrow'", "sans-serif"],
        sora:  ["'Barlow Condensed'", "'Arial Narrow'", "sans-serif"],
      },
      screens: {
        sm:  "576px",
        md:  "768px",
        lg:  "1024px",
        xl:  "1283px",
        "2xl": "1320px",
      },
      colors: {
        // ── Ghost Protocol core ───────────────────
        void:        "#0A0A0E",
        gold:        "#D4AF6E",
        bone:        "#F0EDE8",
        "gold-bright": "#E8C882",
        "gold-dim":    "#A88A52",

        // ── Surface layers ────────────────────────
        surface: {
          secondary: "#1C1C22",
          tertiary:  "#141418",
        },

        // ── Status ────────────────────────────────
        status: {
          success: "#4A8C6F",
          danger:  "#A85252",
          warn:    "#C48A3A",
        },

        // ── shadcn/ui compatibility ───────────────
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT:    "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT:    "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT:    "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT:    "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT:    "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT:    "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT:    "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",

        // ── Kept for any legacy references ───────
        bg: {
          base:         "var(--bg-primary)",
          primary:      "var(--bg-primary)",
          secondary:    "var(--bg-secondary)",
          tertiary:     "var(--bg-tertiary)",
          glass:        "var(--bg-secondary)",
          surface:      "var(--gold-ghost)",
          "surface-md": "rgba(212,175,110,0.05)",
          "surface-lg": "rgba(212,175,110,0.08)",
        },
        brand: {
          start:     "var(--gold-dim)",
          mid:       "var(--gold)",
          end:       "var(--gold-bright)",
          glow:      "var(--gold-glow)",
          cyan:      "var(--gold)",
          purple:    "var(--gold-dim)",
          magenta:   "var(--gold)",
          gold:      "var(--gold)",
          champagne: "var(--gold-bright)",
          "champagne-deep": "var(--gold-dim)",
        },
        "text-base": {
          primary:   "var(--text-primary)",
          secondary: "var(--text-sec)",
          muted:     "var(--text-muted)",
          accent:    "var(--gold)",
        },
        "accent-legacy": {
          DEFAULT:   "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          cyan:      "var(--gold)",
          amber:     "var(--c-warn)",
          green:     "var(--c-success)",
          red:       "var(--c-danger)",
        },
      },
      borderRadius: {
        // Ghost Protocol: sharp corners everywhere
        lg:   "0px",
        md:   "0px",
        sm:   "0px",
        none: "0px",
      },
      boxShadow: {
        "gold":    "0 0 40px rgba(212,175,110,0.35)",
        "gold-sm": "0 0 20px rgba(212,175,110,0.20)",
        "gold-lg": "0 0 80px rgba(212,175,110,0.50)",
        // Legacy aliases
        "glow-cyan":    "0 0 40px rgba(212,175,110,0.35)",
        "glow-cyan-sm": "0 0 20px rgba(212,175,110,0.20)",
        "glow-purple":  "0 0 40px rgba(212,175,110,0.30)",
        "glow-magenta": "0 0 40px rgba(212,175,110,0.32)",
        "glow-gold":    "0 0 40px rgba(212,175,110,0.35)",
        "glass":        "0 4px 24px rgba(0,0,0,0.5)",
        "glass-lg":     "0 8px 40px rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-up":   "fadeUp 0.6s var(--ease-expo) forwards",
        "shimmer":   "shimmer 2s linear infinite",
        "ticker-l":  "tickerLeft 30s linear infinite",
        "ticker-r":  "tickerRight 30s linear infinite",
        "float":     "float 4s ease-in-out infinite",
        "orb-pulse": "orb-pulse 3s ease-in-out infinite",
        "orb-spin":  "ringRotate 12s linear infinite",
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(212,175,110,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(212,175,110,0.03) 1px,transparent 1px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
