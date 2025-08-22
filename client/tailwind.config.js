/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      textShadow: {
        'glow': '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(173, 216, 230, 0.3), 0 0 30px rgba(173, 216, 230, 0.2)',
        'glow-pink': '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 182, 193, 0.3), 0 0 30px rgba(255, 182, 193, 0.2)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-glow': {
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(173, 216, 230, 0.3), 0 0 30px rgba(173, 216, 230, 0.2)',
        },
        '.text-shadow-glow-pink': {
          textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 182, 193, 0.3), 0 0 30px rgba(255, 182, 193, 0.2)',
        },
      }
      addUtilities(newUtilities)
    },
  ],
}
