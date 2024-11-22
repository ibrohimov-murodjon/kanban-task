// const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainBg: "rgb(46, 126, 175)",
      },
      boxShadow: {
        headerBgShadow: "rgba(0, 0, 0, 0.3) 0px 0px 0px 40px inset",
      },
    },
  },
  plugins: [],
};
