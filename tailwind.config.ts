import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: {
          50: "#f5f7ff",
          100: "#e8ecff",
          200: "#c7d0ff",
          300: "#9aa8ff",
          400: "#6c7bff",
          500: "#4553ff",
          600: "#2d34f5",
          700: "#1f26d9",
          800: "#1c22ab",
          900: "#1c2385",
          950: "#090a35"
        }
      },
      fontFamily: {
        heading: ["'Space Grotesk'", "ui-sans-serif", "system-ui"],
        body: ["'Inter'", "ui-sans-serif", "system-ui"]
      },
      boxShadow: {
        aurora: "0 20px 60px rgba(72, 89, 255, 0.25)"
      },
      backgroundImage: {
        grid: "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)"
      },
      backgroundSize: {
        "grid-size": "24px 24px"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: []
};

export default config;
