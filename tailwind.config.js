/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./web/src/**/*.{html,js}",
  "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
darkMode: "class",
plugins: [nextui()],
};