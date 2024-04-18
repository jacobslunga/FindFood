import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#DCE35B",
        secondary: "#45B649",
      },
      fontFamily: {
        "sat-bold": "Satoshi Bold",
        "sat-medium": "Satoshi Med",
        "sat-regular": "Satoshi Reg",
        "sat-black": "Satoshi Black",
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
