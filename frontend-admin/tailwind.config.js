/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f3ff",
          100: "#ebe9ff",
          200: "#d9d6ff",
          300: "#bbb5ff",
          400: "#9587ff",
          500: "#7457ff",
          600: "#5e33ff",
          700: "#4e22e8",
          800: "#3f1dbb",
          900: "#351a98"
        }
      }
    }
  },
  plugins: []
};

