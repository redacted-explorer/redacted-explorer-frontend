import { nextui } from "@nextui-org/theme";
import type { Config } from "tailwindcss";

const nearGreen = {
  "50": "#edfff8",
  "100": "#d5fff0",
  "200": "#aeffe1",
  "300": "#70ffcc",
  "400": "#2bfdaf",
  "500": "#00ec95",
  "600": "#00c075",
  "700": "#00965e",
  "800": "#06754d",
  "900": "#076041",
  "950": "#003723",
  DEFAULT: "#00ec95",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|table|ripple|spinner|checkbox|spacer).js",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "near-green": nearGreen,
      },
    },
  },
  plugins: [nextui({
    defaultTheme: "redacted",
    themes: {
      redacted: {
        layout: {
          radius: {
            small: "0",
            medium: "0",
            large: "0",
          },
        },
        colors: {
          default: nearGreen,
          content1: "#18181b",
          content2: "#27272a",
          content3: "#3f3f46",
          content4: "#52525b",
        },
      },
    }
  })],
};
export default config;
