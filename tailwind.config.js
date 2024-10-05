/** @type {import('tailwindcss').Config} */

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      screens: {
        'xxs': '400px',
        'xs': '500px',
        'sm': '600px',
        'md': '800px',
        'lg': '1024px',
        'xl': '1280px',
        'xxl': '1500px',
      },

      fontFamily: {
        sans: ['Lexend', 'sans-serif'],
      },

      fontSize: {
        'tiny': '0.625rem', // 10px, um tamanho personalizado
        'xs': '0.75rem',   // 12px
        'sm': '0.875rem',  // 14px
        'md': '1rem',  // 16px
        'base': '1rem',    // 16px
        'lg': '1.125rem',  // 18px
        'xl': '1.25rem',   // 20px
      },

      colors: {
        'orange': '#f58634',
        'oil': '#00051a',
        'letters': '#010721',
      },
    },
  },
  plugins: [],
}
