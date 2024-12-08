/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#000766',
          50: '#e6e6ff',
          100: '#c2c2ff',
          200: '#9999ff',
          300: '#7070ff',
          400: '#4747ff',
          500: '#1e1eff',
          600: '#0000cc',
          700: '#000766',
          800: '#000033',
          900: '#000019',
        },
        secondary: {
          DEFAULT: '#6B46C1',
          50: '#f3f0ff',
          100: '#e9e3ff',
          200: '#d4c8ff',
          300: '#b69eff',
          400: '#9674ff',
          500: '#6B46C1',
          600: '#5939a3',
          700: '#472c85',
          800: '#351f67',
          900: '#231249',
        },
        accent: {
          DEFAULT: '#FF55DD',
          50: '#fff0fb',
          100: '#ffe5f9',
          200: '#ffccf5',
          300: '#ff99eb',
          400: '#ff77e4',
          500: '#FF55DD',
          600: '#cc44b1',
          700: '#993385',
          800: '#662259',
          900: '#33112c',
        },
      },
    },
  },
  plugins: [],
};