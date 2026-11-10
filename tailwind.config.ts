import type { Config } from "tailwindcss";

// Tokens sampled from /design/tagt-mockup.png. See docs/DECISIONS.md (D2).
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          950: "#1A0B2E", // hero background
          900: "#210B34", // footer
          800: "#3A0A4A", // primary purple: headings, dark buttons
          700: "#4F1A63",
          600: "#6A3A86",
          200: "#D9C8E0",
          100: "#EFE6F2",
        },
        gold: {
          DEFAULT: "#D9B46C", // buttons, accents on purple
          light: "#E6C78A",
          ink: "#8A6A2F", // gold text on cream (AA)
        },
        cream: {
          DEFAULT: "#FDF9F3", // page
          card: "#F9F5EE",
          line: "#EBE0CF",
        },
        violet: "#6E43C9", // "Watch Live" header button (mockup)
        ink: "#2A1236",
        sub: "#6A5A72",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", '"Times New Roman"', "serif"],
        sans: ["Inter", "system-ui", "-apple-system", '"Segoe UI"', "Roboto", "sans-serif"],
      },
      maxWidth: { site: "1180px" },
      spacing: { gutter: "clamp(16px, 4vw, 40px)" },
      screens: { nav: "1000px" },
      boxShadow: {
        card: "0 1px 2px rgba(42,18,54,.04), 0 12px 30px -18px rgba(42,18,54,.25)",
      },
    },
  },
  plugins: [],
};
export default config;
