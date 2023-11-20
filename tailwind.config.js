/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        silver: "#C0C0C0",
        customBlue: "#2d6acd",
      },
    },
  },

  plugins: [],
};
