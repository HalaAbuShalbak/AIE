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
        corporate: '8px',
      },
      fontFamily: {
        sans: ['Tajawal', 'Segoe UI', 'Tahoma', 'Arial', 'sans-serif'],
      },
      fontSize: {
        display: ['2.25rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-lg': ['1.75rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        'title-md': ['1.375rem', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.75' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-sm': ['0.9375rem', { lineHeight: '1.65' }],
        caption: ['0.8125rem', { lineHeight: '1.5' }],
        overline: ['0.6875rem', { lineHeight: '1.4', letterSpacing: '0.14em', fontWeight: '600' }],
      },
      maxWidth: {
        measure: '42rem',
        content: '72rem',
      },
      boxShadow: {
        nav: '0 1px 0 rgba(15, 23, 42, 0.06), 0 8px 24px rgba(15, 23, 42, 0.04)',
        card: '0 1px 2px rgba(15, 23, 42, 0.05), 0 4px 16px rgba(26, 74, 139, 0.06)',
        'card-hover': '0 4px 12px rgba(15, 23, 42, 0.07), 0 12px 28px rgba(26, 74, 139, 0.08)',
      },
      keyframes: {
        'hero-fade': {
          '0%': { opacity: '0.35' },
          '100%': { opacity: '0.55' },
        },
      },
      animation: {
        'hero-fade': 'hero-fade 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
