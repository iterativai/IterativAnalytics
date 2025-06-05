/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e6f3ff',
          200: '#bae0ff',
          300: '#8eccff',
          400: '#3aa1ff',
          500: '#2288f2',
          600: '#1a6cd4',
          700: '#1557af',
          800: '#12468f',
          900: '#0f3875',
        },
        secondary: {
          50: '#f5f7fa',
          100: '#ebeef3',
          200: '#dde2eb',
          300: '#cbd3e0',
          400: '#94a3bc',
          500: '#647798',
          600: '#4c5f7d',
          700: '#3d4d66',
          800: '#2e3a4d',
          900: '#1f2937',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};