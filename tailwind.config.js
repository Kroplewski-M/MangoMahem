/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#FFA466",
        mainBg: "#FFDCB4",
        PrimaryText: "#46230A",
      },
    },
  },
  plugins: [],
};
