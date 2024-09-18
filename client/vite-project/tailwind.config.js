/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whitesmoke: '#F5F5F5',  // Custom white smoke color
      },
    },
  },
  plugins: [],
};
