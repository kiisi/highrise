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
        primary: '#684EA0',
        sec:'#ED1B35',
        dark:'#0A0F15'
      }
    },
    screens: {
      xs: "376px",
      ss: "768px",
      sm: "900px",
      md: "1024px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
}