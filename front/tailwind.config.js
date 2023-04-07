/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FE6244",
      },
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
};
