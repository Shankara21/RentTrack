/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        mainDark: "#18181a",
        secondaryDark: "#0a0a0b",
        cGrey: "#27272A",
        cBlue: "#387ADF",
      },
    },
  },
  plugins: [require("daisyui")],
};
