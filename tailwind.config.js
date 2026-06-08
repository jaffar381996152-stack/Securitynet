/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        sora: ["Sora", "sans-serif"],
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1283px",
        "2xl": "1320px",
      },
      colors: {
        /* ── Background layers ── */
        bg: {
          base:         "var(--bg-base)",
          primary:      "var(--bg-primary)",
          secondary:    "var(--bg-secondary)",
          tertiary:     "var(--bg-tertiary)",
          glass:        "var(--bg-glass)",
          surface:      "var(--bg-surface)",
          "surface-md": "var(--bg-surface-md)",
          "surface-lg": "var(--bg-surface-lg)",
        },

        /* ── Brand gradient spectrum ── */
        brand: {
          start:     "var(--brand-start)",
          mid:       "var(--brand-mid)",
          end:       "var(--brand-end)",
          glow:      "var(--brand-glow)",
          cyan:      "var(--brand-cyan)",
          purple:    "var(--brand-purple)",
          magenta:   "var(--brand-magenta)",
          gold:      "var(--brand-gold)",
          champagne: "var(--brand-champagne)",
          "champagne-deep": "var(--brand-champagne-deep)",
        },

        /* ── Accent / status colors ── */
        accent: {
          DEFAULT:  "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          cyan:     "var(--accent-cyan)",
          amber:    "var(--accent-amber)",
          green:    "var(--accent-green)",
          red:      "var(--accent-red)",
        },

        /* ── Text hierarchy ── */
        "text-base": {
          primary:   "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted:     "var(--text-muted)",
          accent:    "var(--text-accent)",
        },

        /* ── Borders ── */
        border: {
          DEFAULT: "hsl(var(--border))",
          subtle:  "var(--border-subtle)",
          medium:  "var(--border-medium)",
          strong:  "var(--border-strong)",
          glass:   "var(--border-glass)",
        },

        /* ── shadcn/ui compatibility ── */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        input: "hsl(var(--input))",
        ring:  "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        "glow-cyan":    "0 0 40px rgba(0, 212, 255, 0.35)",
        "glow-cyan-sm": "0 0 20px rgba(0, 212, 255, 0.20)",
        "glow-purple":  "0 0 40px rgba(123, 94, 167, 0.35)",
        "glow-magenta": "0 0 40px rgba(194, 76, 242, 0.32)",
        "glow-gold":    "0 0 40px rgba(249, 163, 40, 0.35)",
        "glass":        "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
        "glass-lg":     "0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
      },
      backdropBlur: {
        xs: "4px",
      },
      animation: {
        "orb-pulse":    "orb-pulse 6s ease-in-out infinite",
        "orb-spin":     "orb-ring-spin 12s linear infinite",
        "fade-up":      "fade-up 0.6s ease-out",
        "shimmer":      "shimmer 2s linear infinite",
        "float":        "float 4s ease-in-out infinite",
        "holo-sweep":   "holo-sweep 6s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-dark": "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "radial-cyan": "radial-gradient(ellipse at center, rgba(0,212,255,0.12) 0%, transparent 70%)",
        "radial-purple": "radial-gradient(ellipse at center, rgba(123,94,167,0.12) 0%, transparent 70%)",
        "radial-magenta": "radial-gradient(ellipse at center, rgba(194,76,242,0.12) 0%, transparent 70%)",
        "gradient-holo": "var(--gradient-holo)",
        "gradient-champagne": "linear-gradient(135deg, #F0D9A8 0%, #F9A328 50%, #D9B873 100%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
