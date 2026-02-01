module.exports = {
  content: [
    "./src/**/*.html",
    "./src/js/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        bg: '#050505',
        surface: '#0A0A0A',
      },
      transitionDuration: {
        '800': '800ms',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
