import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      blue: "#30475E",
      white: "#FFFFFF",
      red: "#CF0A0A",
      offWhite: "#F4F3F2",
      brightRed: "#F05454",
      black: "#000000",
      blueGrey: "#82909E",
      successGreen: "#4BB543",
    },
    extend: {},
  },
  plugins: [],
};
export default config;
