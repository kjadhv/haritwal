import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#070e1c",
          900: "#0b1528",
          800: "#0f1e35",
          700: "#152340",
          600: "#1a2b4a",
          500: "#1e3255",
          400: "#243a63",
        },
        brand: "#4b9cf5",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
