/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [ 'class' ],
  content: [
    './index.html',
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
