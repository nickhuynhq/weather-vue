/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "header": "#2e3440",
        "weather-primary": "#4c566a",
        "weather-secondary": "#2e3440",
        "alert": "#ebcb8b",
        "text-primary": "white",
        "text-secondary": "black",
        "text-hover": "#a3be8c",
      }
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    container: {
      padding: "2rem",
      center: true
    },
    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}
