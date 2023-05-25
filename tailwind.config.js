const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brick-red": "#DB5049",
        "sky-blue": "#C5E7E8",
        "dark-sky": "#454A48",
        "pale-amber": "#F1FAEE",
        "pantone-red": "#E63946",
        "fern-green": "#427C3C",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "spin-slower": "spin 5s linear infinite",
        "spin-slow": "spin 2s linear infinite",
      },
      keyframes: {
        flicker: {
          "0%, 100%": {
            opacity: 1,
          },
          "33%": { opacity: 0 },
        },
        flickerAlt: {
          "0%, 100%": {
            opacity: 1,
          },
          "66%": { opacity: 0 },
        },
      },
    },
    fontFamily: {
      logo: ["var(--font-satisfy)", ...fontFamily.sans],
    },
  },
  // plugins: [require("prettier-plugin-tailwindcss")],
};
