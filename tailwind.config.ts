/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}', // This catches all files in src
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B6B',
        secondary: '#4ECDC4',
        dark: '#2C3E50',
        light: '#ECF0F1',
        accent: '#FFE66D',
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        display: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}