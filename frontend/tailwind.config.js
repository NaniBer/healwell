/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'telegram': {
          bg: '#2481cc',
          text: '#ffffff',
        }
      },
    },
  },
  plugins: [],
}
