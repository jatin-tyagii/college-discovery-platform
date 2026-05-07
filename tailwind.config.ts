import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0A0A0A",
          50: "#F5F5F5",
          100: "#E8E8E8",
          200: "#C8C8C8",
          300: "#A0A0A0",
          400: "#707070",
          500: "#4A4A4A",
          600: "#2D2D2D",
          700: "#1A1A1A",
          800: "#111111",
          900: "#0A0A0A",
        },
        accent: {
          DEFAULT: "#E8C547",
          dark: "#C9A832",
          light: "#F2D96B",
        },
        cream: {
          DEFAULT: "#F5F0E8",
          dark: "#EDE5D8",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            fontFamily: "var(--font-dm-sans)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
