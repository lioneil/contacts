/** @type {import('tailwindcss').Config} */
export default {
  darkMode: [ 'class' ],
  content: [
    './index.html',
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  theme: {
    extend: {
      'btn-default': 'flex gap-3 justify-content-center font-inter text-sm font-semibold leading-5 text-center box-border px-3.5 py-2 w-auto h-[36px] bg-white border border-gray-300 shadow-sm rounded-md disabled:shadow-none disabled:opacity-50',
    },
  },
  plugins: [],
}
