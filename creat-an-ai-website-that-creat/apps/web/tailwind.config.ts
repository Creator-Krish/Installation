import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          ink: "#090B15",
          panel: "#101423",
          purple: "#6D4AFF",
          teal: "#14C6B7",
          line: "#1F2940",
        },
      },
      boxShadow: {
        glow: "0 24px 80px rgba(109, 74, 255, 0.25)",
      },
      backgroundImage: {
        "forge-grid":
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
