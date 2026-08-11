import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg))",
        panel: "hsl(var(--panel))",
        panel2: "hsl(var(--panel-2))",
        line: "hsl(var(--line))",
        text: "hsl(var(--text))",
        muted: "hsl(var(--muted))",
        accent: {
          DEFAULT: "#ffb454",
          glow: "#ff8a3c"
        },
        cyan: {
          DEFAULT: "#ffa040",
          dim: "#99601a",
          glow: "#ffb86c"
        },
        teal: "#e7c96e",
        purple: "#c97a8b",
        coral: "#ff8a7a",
        amber: "#ffb454",
        "space-navy": "#0d0502",
        "space-dark": "#1b0d02",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        space: ["var(--font-space)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--line)), 0 10px 40px rgba(0,0,0,.35), 0 0 60px rgba(255,160,60,.08)",
        soft: "0 12px 40px rgba(0,0,0,.28)",
        "glow-cyan": "0 0 20px rgba(255,160,60,.12), 0 0 40px rgba(255,160,60,.06)",
        "glow-amber": "0 0 20px rgba(255,140,50,.12), 0 0 40px rgba(255,140,50,.06)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 20% 20%, rgba(255,140,50,0.12), transparent 30%), radial-gradient(circle at 80% 30%, rgba(180,60,100,0.08), transparent 28%)",
        stars:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,.9) 0 1px, transparent 1px), radial-gradient(circle at 70% 20%, rgba(255,255,255,.7) 0 1px, transparent 1px), radial-gradient(circle at 10% 80%, rgba(255,255,255,.8) 0 1px, transparent 1px)",
        "neural-grid":
          "linear-gradient(to right, rgba(255,160,60,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,160,60,0.03) 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" }
        },
        glow: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" }
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        "pulse-cyan": {
          "0%,100%": { boxShadow: "0 0 8px rgba(255,160,60,0.15)" },
          "50%": { boxShadow: "0 0 20px rgba(255,160,60,0.3)" }
        },
        blink: {
          "50%": { opacity: "0" }
        },
        "data-flow": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "0 200%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        drift: "drift 18s linear infinite",
        "pulse-cyan": "pulse-cyan 3s ease-in-out infinite",
        blink: "blink 1s step-end infinite",
        "data-flow": "data-flow 3s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
