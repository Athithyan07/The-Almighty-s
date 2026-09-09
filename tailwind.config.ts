import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        glass: {
          light: "rgba(255, 255, 255, 0.45)",
          dark: "rgba(10, 15, 30, 0.55)",
          borderLight: "rgba(255, 255, 255, 0.6)",
          borderDark: "rgba(255, 255, 255, 0.12)",
        },
        sasc: {
          cyan:    "#FFD60A",
          purple:  "#a855f7",
          pink:    "#ec4899",
          indigo:  "#6366f1",
          emerald: "#10b981",
          amber:   "#f59e0b",
        },
        // ── NEW: Playful palette ──
        play: {
          sunshine: "#FFD60A",
          coral:    "#FF6B6B",
          sky:      "#FFD60A",
          mint:     "#51CF66",
          lavender: "#845EF7",
          pink:     "#F06292",
          orange:   "#FF8C42",
          indigo:   "#5C7CFA",
        },
      },
      fontFamily: {
        display: ["'Fredoka One'", "cursive"],
        heading: ["'Merienda'", "cursive", "sans-serif"],
        sans:    ["'Nunito'", "sans-serif"],
      },
      backdropBlur: { xs: "2px" },
      animation: {
        "blob-slow":      "blob 22s infinite alternate ease-in-out",
        "blob-slower":    "blob 30s infinite alternate-reverse ease-in-out",
        "blob-fast":      "blob 14s infinite alternate ease-in-out",
        "pulse-glow":     "pulseGlow 4s infinite ease-in-out",
        "shimmer":        "shimmer 2.5s infinite linear",
        "float":          "float 6s ease-in-out infinite",
        "spin-slow":      "spin 8s linear infinite",
        "float-rotate":   "float-rotate 7s ease-in-out infinite",
        "wiggle":         "wiggle 1.5s ease-in-out infinite",
        "rainbow-shift":  "rainbow-shift 5s linear infinite",
      },
      keyframes: {
        blob: {
          "0%":   { transform: "translate(0px, 0px) scale(1) rotate(0deg)" },
          "33%":  { transform: "translate(50px, -70px) scale(1.15) rotate(120deg)" },
          "66%":  { transform: "translate(-40px, 40px) scale(0.9) rotate(240deg)" },
          "100%": { transform: "translate(0px, 0px) scale(1) rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%":      { opacity: "0.8", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "float-rotate": {
          "0%":   { transform: "translateY(0px) rotate(0deg)" },
          "25%":  { transform: "translateY(-14px) rotate(6deg)" },
          "50%":  { transform: "translateY(-6px) rotate(-4deg)" },
          "75%":  { transform: "translateY(-18px) rotate(8deg)" },
          "100%": { transform: "translateY(0px) rotate(0deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-6deg) scale(1)" },
          "50%":      { transform: "rotate(6deg) scale(1.05)" },
        },
        "rainbow-shift": {
          "0%":   { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "300% 50%" },
        },
      },
      boxShadow: {
        "liquid-light": "0 20px 50px rgba(120,119,198,0.15), 0 10px 20px rgba(0,0,0,0.05), inset 0 1px 1px rgba(255,255,255,0.8)",
        "liquid-dark":  "0 20px 50px rgba(0,0,0,0.6), 0 0 35px rgba(120,119,198,0.15), inset 0 1px 1px rgba(255,255,255,0.15)",
        "glow-cyan":    "0 0 25px rgba(255,214,10,0.5)",
        "glow-purple":  "0 0 25px rgba(168,85,247,0.5)",
        "glow-pink":    "0 0 25px rgba(236,72,153,0.5)",
        "glow-coral":   "0 0 30px rgba(255,107,107,0.45)",
        "glow-mint":    "0 0 30px rgba(81,207,102,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
