/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/your-vue-app-name/src/**/*.{vue,js,ts,jsx,tsx}', // Adjust the path if needed
    './libs/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
