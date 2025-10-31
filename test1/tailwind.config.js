const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './index.html',
    './script.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Using slate for a cool, professional dark theme
        gray: {
          '900': '#0f172a', // slate-900
          '800': '#1e293b', // slate-800
          '700': '#334155', // slate-700
          '400': '#94a3b8', // slate-400
          '100': '#f1f5f9', // slate-100
        },
        blue: {
          '400': '#60a5fa', // blue-400
          '500': '#3b82f6', // blue-500
        },
        green: {
          '300': '#86efac',
          '400': '#4ade80', // green-400
          '500': '#22c55e', // green-500
        },
        yellow: {
          '300': '#fde047',
          '400': '#facc15', // yellow-400
        },
        red: {
          '300': '#fca5a5',
          '400': '#f87171', // red-400
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', '"Helvetica Neue"', 'Arial'],
        serif: ['Corinthia', 'cursive'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'glow': {
            '0%': { boxShadow: '0 0 5px #3b82f6, 0 0 10px #3b82f6' },
            '100%': { boxShadow: '0 0 20px #3b82f6, 0 0 30px #3b82f6' },
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-grid-slate-700\\/20': {
          backgroundImage: 'linear-gradient(to right, rgba(51, 65, 85, 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(51, 65, 85, 0.2) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        },
      })
    })
  ],
}