/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        header: "#2e3440",
        "weather-primary": "#4c566a",
        "weather-secondary": "#2e3440",
        "weather-primary--light": "white",
        "weather-secondary--light": "#e5e9f0",
        alert: "#ebcb8b",
        "text-primary": "white",
        "text-secondary": "black",
        "text-primary--light": "#2e3440",
        "text-secondary--light": "white",
        "text-hover": "#a3be8c",
      },
    },
    fontFamily: {
      Roboto: ["Roboto, sans-serif"],
    },
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
      xl: "1920px",
    },
    container: {
      padding: "2rem",
      center: true,
      maxWidth: "80rem",
    },
  },
  plugins: [],
};
