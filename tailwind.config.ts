import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/steps/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      colors: {
        white: "#FFFFFF",
        black: "#000000",

        green: "#34C759",
        "green-100": "#EBF9EE",
        "green-300": "#AEE9BC",
        "green-700": "#34C759",
        "matcha-green": "#38B34B",
        yellow: "#FBC918",
        red: "#F00000",
        "blue-active": "#0022F0",

        "gray-50": "#FBFBFB",
        "gray-100": "#F7F7F7",
        "gray-200": "#EEEEEE",
        "gray-300": "#E6E6E6",
        "gray-400": "#DFDFDF",
        "gray-500": "#CFCDD8",
        "gray-600": "#B9B9B9",
        "gray-700": "#8C8C8C",
        "gray-800": "#636363",
        "gray-900": "#202020",

        "light-purple": "#F3EBFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
