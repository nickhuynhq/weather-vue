/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "header": "#2e3440",
        "weather-primary": "#4c566a",
        "weather-secondary": "#2e3440",
        "weather-primary--light": "#e5e9f0",
        "weather-secondary--light": "#eceff4",
        "alert": "#ebcb8b",
        "text-primary": "white",
        "text-secondary": "black",
        "text-primary--light": "#2e3440",
        "text-secondary--light": "white",
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
