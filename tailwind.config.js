/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.tsx",
    "./src/components/**/*.tsx",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Mulish': ['Mulish'],
    },
    screens: {
      'cell': '450px',
      'sm': '763px',
      'laptop': '1024px',
      'desktop': '1180px',
    },
  },
  plugins: [],
}
