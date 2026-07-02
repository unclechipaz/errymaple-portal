import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        blue: {
          50: "#F0F5FA",
          100: "#DFEAF3",
          200: "#C0D4E5",
          300: "#9BB9D3",
          400: "#739BBF",
          500: "#4F7CA6",
          600: "#2B4B6A",
          700: "#1E354C",
          800: "#0F2942",
          900: "#081625",
          950: "#040B13",
        },
        school: {
          blue: {
            DEFAULT: "#0F2942", // Muted Premium Navy Blue
            light: "#21446A",
            dark: "#081625",
            50: "#F0F5FA",
            100: "#DFEAF3",
            200: "#C0D4E5",
            300: "#9BB9D3",
            400: "#739BBF",
            500: "#4F7CA6",
            600: "#3A6389",
            700: "#2B4B6A",
            800: "#1E354C",
            900: "#0F2942",
            950: "#081625",
          },
          gold: {
            DEFAULT: "#C5A059", // Muted Metallic Academic Gold
            light: "#DDC597",   // Champagne Gold
            dark: "#9A783E",    // Antique Bronze/Gold
            50: "#FCFAF4",
            100: "#FAF2DE",
            200: "#F2E2BC",
            300: "#E9D097",
            400: "#DFBD75",
            500: "#C5A059",
            600: "#B38F4D",
            700: "#9A783E",
            800: "#80602F",
            900: "#604720",
          },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-playfair)", "serif"],
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-down": "fadeInDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
