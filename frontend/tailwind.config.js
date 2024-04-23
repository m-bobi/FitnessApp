/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'sign': '#DA898C'
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}

