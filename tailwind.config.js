/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          dark: '#050505',
          light: '#0C0C0F'
        },
        crimson: {
          500: '#A61C2E',
          600: '#8A1524',
          glow: 'rgba(166, 28, 46, 0.5)'
        }
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
