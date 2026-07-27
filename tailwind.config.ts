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
          DEFAULT: "hsl(var(--accent))",
          glow: "hsl(var(--accent-glow))"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--line)), 0 10px 40px rgba(0,0,0,.35), 0 0 60px rgba(67,126,255,.12)",
        soft: "0 12px 40px rgba(0,0,0,.28)"
      },
      backgroundImage: {
        aurora:
          "radial-gradient(circle at 20% 20%, rgba(88,150,255,0.24), transparent 30%), radial-gradient(circle at 80% 30%, rgba(170,92,255,0.18), transparent 28%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06), transparent 30%)",
        stars:
          "radial-gradient(circle at 20% 30%, rgba(255,255,255,.9) 0 1px, transparent 1px), radial-gradient(circle at 70% 20%, rgba(255,255,255,.7) 0 1px, transparent 1px), radial-gradient(circle at 10% 80%, rgba(255,255,255,.8) 0 1px, transparent 1px)"
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-14px,0)" }
        },
        glow: {
          "0%,100%": { opacity: 0.45 },
          "50%": { opacity: 0.8 }
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 4s ease-in-out infinite",
        drift: "drift 18s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
