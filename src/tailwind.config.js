/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary:  '#a855f7',
        secondary:'#ec4899',
        dark:     '#0a0a0f',
        darker:   '#050508',
        surface:  '#13131f',
      },
    },
  },
  plugins: [],
}