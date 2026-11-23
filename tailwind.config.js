/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7D2D76',
          dark: '#61316B',
        },
        plum: {
          DEFAULT: '#56344F',
          dark: '#46394A',
        },
        pink: '#EE6B8B',
        mustard: '#E3C058',
        gold: '#D2AE34',
        lavender: '#DDCFE6',
        'off-white': '#FAF8FC',
        'light-gray': '#F4F3F5',
        text: '#2B2430',
        muted: '#77717B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
