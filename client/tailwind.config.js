/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: "#191D2A",

      secondary: "#232938",

      card: "#2C3445",

      accent: "#3B82F6",
    },
  },
},
  plugins: [],
};