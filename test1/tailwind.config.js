module.exports = {
  content: [
    './index.html',
    './script.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gray: {
          '900': '#0b0d12',
          '800': '#141924',
          '700': '#1a2233',
          '600': '#5a6b7a',
          '400': '#9aa3b2',
          '100': '#e8eaef',
        },
        blue: {
          '400': '#3b82f6',
        },
        green: {
            '400': '#2dd4bf',
            '500': '#10b981'
        },
        yellow: {
            '400': '#f59e0b'
        },
        red: {
            '400': '#ef4444'
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', '"Helvetica Neue"', 'Arial'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}