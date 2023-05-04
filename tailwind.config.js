
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx,css}",
    "./src/components/**/*.{js,jsx,ts,tsx,css}",
  ],
  theme: {
    screens: {
      '2xl': {'max': '1299px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1299px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '989px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '479px'},
      // => @media (max-width: 639px) { ... }
    },
    fontFamily: {
      'mont': ['Montserrat', 'system-ui'],
      'sans': ['Open Sans','ui-serif'],
    },
    extend: {
      colors: {
        'yellow': {400:'#F0FA00', 500: '#FEF200'},
        'gray': {400: '#F0EFEF', 500: '#A9A9A9'}
      }
    }
  },
  plugins: [],
}
