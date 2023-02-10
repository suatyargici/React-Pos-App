/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "card": "repeat(auto-fill, minmax(150px, 1fr))"
      },
    },
  },
  plugins: [],
};