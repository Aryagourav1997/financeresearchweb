import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0e17",
          panel: "#0f1623",
          card: "#121a2a",
          elevated: "#172033",
          border: "#1f2a40",
        },
        ink: {
          DEFAULT: "#e6edf6",
          muted: "#8a96ad",
          subtle: "#5b6478",
        },
        brand: {
          DEFAULT: "#6aa6ff",
          400: "#6aa6ff",
          500: "#4d8bf0",
          600: "#3a6fd0",
        },
        bull: "#22c55e",
        bear: "#ef4444",
        caution: "#f59e0b",
        neutral: "#60a5fa",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      boxShadow: {
        card: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 24px -12px rgba(0,0,0,0.5)",
        glow: "0 0 0 1px rgba(106,166,255,0.25), 0 0 24px -6px rgba(106,166,255,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
