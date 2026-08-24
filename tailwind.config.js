/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#efeee9',
      },
      fontFamily: {
        gallos: ['"Gallos Uncial"', '"Gallos Uncial Heavy"', 'serif'],
        hn: ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['"Helvetica Neue ME"', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['"Gallos Uncial"', '"Gallos Uncial Heavy"', 'serif'],
        signature: ['"Alex Brush"', '"MonteCarlo"', '"Great Vibes"', 'cursive'],
        canasita: ['"Canasita"', 'cursive'],
      },
    },
  },
  plugins: [],
}
