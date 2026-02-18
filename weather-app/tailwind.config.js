/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(147, 197, 253, 0.3)',
        'neon-hover': '0 0 30px rgba(147, 197, 253, 0.5)',
      },
    },
  },
  plugins: [],
}
