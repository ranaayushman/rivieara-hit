import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      /* ── Arabian Nights Color Palette ─────────────────────────── */
      colors: {
        arabian: {
          bg:          "var(--bg-primary)",
          surface:     "var(--surface-primary)",
          "surface-alt": "var(--surface-alt)",
          gold:        "var(--gold-primary)",
          "gold-deep": "var(--gold-deep)",
          "gold-light":"var(--gold-light)",
          sand:        "var(--sand)",
          red:         "var(--accent-red)",
          purple:      "var(--accent-purple)",
          cream:       "var(--cream)",
        },
      },

      /* ── Typography ──────────────────────────────────────────── */
      fontFamily: {
        cinzel:    ["var(--font-cinzel)", "serif"],
        messiri:   ["var(--font-messiri)", "sans-serif"],
        inter:     ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      fontSize: {
        "hero":    ["clamp(4rem, 10vw, 9rem)",   { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display": ["clamp(3rem, 6vw, 5.5rem)",  { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "section": ["clamp(2rem, 5vw, 3.75rem)", { lineHeight: "1.1" }],
      },

      /* ── Spacing ─────────────────────────────────────────────── */
      spacing: {
        "section": "var(--space-section)",
      },

      /* ── Border Radius ───────────────────────────────────────── */
      borderRadius: {
        luxury:  "var(--radius-luxury)",
        arabian: "var(--radius-arabian)",
      },

      /* ── Shadows ─────────────────────────────────────────────── */
      boxShadow: {
        "glow-gold-sm":  "var(--shadow-glow-gold-sm)",
        "glow-gold-md":  "var(--shadow-glow-gold-md)",
        "glow-gold-lg":  "var(--shadow-glow-gold-lg)",
        "glow-red-sm":   "var(--shadow-glow-red-sm)",
        "glow-red-md":   "var(--shadow-glow-red-md)",
        "cinematic":     "var(--shadow-cinematic)",
      },

      /* ── Background Images (Gradients) ──────────────────────── */
      backgroundImage: {
        "gradient-hero":     "var(--gradient-hero)",
        "gradient-gold":     "var(--gradient-gold)",
        "gradient-section":  "var(--gradient-section)",
        "gradient-card":     "var(--gradient-card)",
      },

      /* ── Keyframes ───────────────────────────────────────────── */
      keyframes: {
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-12px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%":      { opacity: "1" },
        },
        "shimmer": {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "ember-drift": {
          "0%":   { transform: "translateY(0) translateX(0) scale(1)",   opacity: "0" },
          "10%":  { opacity: "1" },
          "90%":  { opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) translateX(30px) scale(0.3)", opacity: "0" },
        },
        "fog-drift": {
          "0%":   { transform: "translateX(-10%)", opacity: "0.3" },
          "50%":  { opacity: "0.5" },
          "100%": { transform: "translateX(10%)",  opacity: "0.3" },
        },
        "spin-slow": {
          "0%":   { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gallery-scroll": {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },

      /* ── Animations ──────────────────────────────────────────── */
      animation: {
        "float":          "float 6s ease-in-out infinite",
        "glow-pulse":     "glow-pulse 3s ease-in-out infinite",
        "shimmer":        "shimmer 3s linear infinite",
        "ember-drift":    "ember-drift 8s ease-in infinite",
        "fog-drift":      "fog-drift 20s ease-in-out infinite alternate",
        "spin-slow":      "spin-slow 20s linear infinite",
        "gallery-scroll": "gallery-scroll 30s linear infinite",
      },

      /* ── Transitions ─────────────────────────────────────────── */
      transitionTimingFunction: {
        "expo-out":  "cubic-bezier(0.16, 1, 0.3, 1)",
        "spring":    "cubic-bezier(0.22, 1, 0.36, 1)",
        "cinematic": "cubic-bezier(0.4, 0, 0, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
