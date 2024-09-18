/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#552A7B",
        secondary: "#F1BB00",
        ternary: "#E7E2EC",
        error: "#F1BB00",
        success: "#F1BB00",
        warning: "#F1BB00",
        "title-active": "#14142B",
        body: "#4E4B66",
        label: "#6E7191",
        placeholder: "#A0A3BD",
        line: "#D9DBE9",
        "input-bg": "#EFF0F6",
        background: "#F7F7FC",
        "off-white": "#FCFCFC",
        overlay: "#1D1A1D5F",
      },
      backgroundImage: {
        hero: "url('/src/assets/images/backgroung.jpeg')",

        // New Black Gradient
        'gradient-black': 'linear-gradient(135deg, #000000 0%, #434343 100%)',
      },
    },
  },
  plugins: [],
};
