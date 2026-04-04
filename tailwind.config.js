/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1A4A8B',
        accent: '#E91E63',
        steel: '#707070',
        slate: '#F9FAFB',
      },
      borderRadius: {
        corporate: '6px',
      },
      fontFamily: {
        sans: [
          'Segoe UI',
          'Tahoma',
          'Arial',
          'Helvetica Neue',
          'Noto Sans Arabic',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
