/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#FFA466",
        mainBg: "#FFDCB4",
        PrimaryText: "#46230A",
        SuccessNotification: "#90ee90",
        ErrorNotification: "#8B0000",
        InfoNotification: "#ADD8E6",
        WarningNotificartion: "#FFA500",
      },
    },
  },
  plugins: [],
};
