/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
    colors: {
      primary: "#004830",
    },
    fontFamily: {
      primary: "Poppins",
    },
  },
  plugins: [require("flowbite/plugin")],
};
