// Update your tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: '#F5F5F5',
      },
      animation: {
        blob: "blob 7s infinite",
      },
    },
  },
  plugins: [require("daisyui"), require('@fortawesome/fontawesome-free')],
};