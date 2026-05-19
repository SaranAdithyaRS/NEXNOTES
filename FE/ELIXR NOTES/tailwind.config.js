/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(137, 250, 244)",
        secondary: "#EF863E",
      }
    }
  },
  plugins: [],
}