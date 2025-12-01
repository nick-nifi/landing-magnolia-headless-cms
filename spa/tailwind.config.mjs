/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-karla)', 'sans-serif'],
      },
      colors: {
        'dark-teal': '#02373F',
        'light-green': '#e2f0e4',
      },
    },
  },
  plugins: [],
};
