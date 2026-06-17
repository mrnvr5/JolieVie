/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f2e7df',
        sage: '#c4cac3',
        blush: '#dca791',
        terracotta: '#c96148',
        'dark-red': '#802d20',
        brown: '#492c0d',
        teal: '#5ddbd6',
        yellow: '#e8c84a',
      },
      fontFamily: {
        playfair: ['"Cormorant Garamond"', 'serif'],
        script:   ['"Great Vibes"', 'cursive'],
        'alegreya-sc': ['"Alegreya Sans SC"', 'sans-serif'],
        alegreya: ['"Alegreya Sans"', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee:  'marquee 30s linear infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
