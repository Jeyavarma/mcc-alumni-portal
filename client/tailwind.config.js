/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eeeef7',
          100: '#d4d4ee',
          200: '#aeaedd',
          300: '#8585c8',
          400: '#5f5fb2',
          500: '#3a3a95',
          600: '#2e2e7a',
          700: '#25255f',
          800: '#1c1b3b',   /* Port Gore — official MCC dark */
          900: '#111027',
          950: '#080815',
        },
        gold: {
          50:  '#fefbee',
          100: '#fdf5cb',   /* Barley White — official MCC cream */
          200: '#fbeb87',
          300: '#f8dc56',
          400: '#eabd53',   /* Ronchi Gold — official MCC accent */
          500: '#d4a030',
          600: '#b07e1f',
          700: '#8a5e14',
          800: '#644310',
          900: '#3e2a09',
        },
        cream: {
          DEFAULT: '#fff5cb',   /* Barley White */
          muted:   '#f5e89a',
          dark:    '#e8d46a',
        },
        surface: {
          DEFAULT: '#13122a',
          card:    '#1c1b3b',   /* Port Gore as card bg */
          elevated:'#252450',
          border:  '#2e2d5c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Crimson Text"', 'Georgia', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
