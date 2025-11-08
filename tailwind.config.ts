import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "agent-primary": "#1B74E4",
        "agent-secondary": "#101828",
        "agent-accent": "#13B497",
        "agent-warning": "#FFB020",
        "agent-danger": "#F04438"
      },
      boxShadow: {
        subtle: "0 10px 40px -20px rgba(16, 24, 40, 0.45)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "monospace"]
      },
      keyframes: {
        "pulse-border": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.7", transform: "scale(1.03)" }
        }
      },
      animation: {
        "pulse-border": "pulse-border 3s ease-in-out infinite"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
