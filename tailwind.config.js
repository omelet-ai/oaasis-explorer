/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Refined color palette
        'lavender': {
          DEFAULT: '#A78BFA',
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
        },
        'violet': {
          DEFAULT: '#8B5CF6',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED',
          900: '#1e1033',
        },
        'teal': {
          DEFAULT: '#2DD4BF',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        'cyan': {
          DEFAULT: '#22D3EE',
          400: '#22D3EE',
          500: '#06B6D4',
        },
        'emerald': {
          DEFAULT: '#34D399',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        'amber': {
          DEFAULT: '#FBBF24',
          400: '#FBBF24',
          500: '#F59E0B',
        },
        'lime': {
          DEFAULT: '#A3E635',
          400: '#A3E635',
          500: '#84CC16',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(167, 139, 250, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(167, 139, 250, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
