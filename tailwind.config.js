/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      maxWidth: {
        xl: '1500px',
      },
      colors: {
        primary: '#7D0A7F',
        dark:'#0A0F15'
      }
    },
  },
  plugins: [],
}