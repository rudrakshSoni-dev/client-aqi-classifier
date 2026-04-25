import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        aqi: {
          good: { bg: "#EAF3DE", text: "#3B6D11", border: "#639922" },
          moderate: { bg: "#FAEEDA", text: "#854F0B", border: "#BA7517" },
          sensitive: { bg: "#FAECE7", text: "#993C1D", border: "#D85A30" },
          unhealthy: { bg: "#FCEBEB", text: "#A32D2D", border: "#E24B4A" },
          very: { bg: "#FBEAF0", text: "#993556", border: "#D4537E" },
          severe: { bg: "#EEEDFE", text: "#3C3489", border: "#7F77DD" },
        },
        brand: {
          navy: "#0F172A",
          slate: "#1E293B",
          muted: "#64748B",
          light: "#F8FAFC",
          border: "#E2E8F0",
          accent: "#3B6D11",
        },
        mode: {
          fast: {
            bg: "#FFF7ED",
            border: "#F97316",
            text: "#C2410C",
            badge: "#FFEDD5",
          },
          smart: {
            bg: "#EFF6FF",
            border: "#3B82F6",
            text: "#1D4ED8",
            badge: "#DBEAFE",
          },
        },
      },
      borderRadius: {
        xl: "0.75rem",
        lg: "0.5rem",
        md: "0.375rem",
      },
    },
  },
  plugins: [],
};
export default config;
