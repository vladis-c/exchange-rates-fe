/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
      },
      maxWidth: {
        1280: '1280px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
