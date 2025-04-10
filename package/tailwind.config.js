/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'dd-',
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#ADD6FF',
          200: '#70B8FF',
          300: '#3399FF',
          400: '#1F8FFF',
          500: '#0074E5',
          600: '#005CB8',
          700: '#003D7A',
          800: '#001F3D',
          900: '#001429',
        },
        secondary: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        dark: {
          50: '#DEE4EA',
          100: '#C7D1DB',
          200: '#B6C2CF',
          300: '#9FADBC',
          400: '#8C9BAB',
          450: '#738496',
          500: '#596773',
          600: '#454F59',
          650: '#38414A',
          700: '#2C333A',
          750: '#282E33',
          800: '#22272B',
          850: '#1D2125',
          900: '#161A1D',
          950: '#101214',
        },
        warning: '#FF9F43',
        success: '#28C76F',
        error: '#D52B1E',
      },
      animation: {
        'cutoff-spin': 'spin 0.8s infinite cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'cutoff-spin-slow': 'spin 4.5s linear infinite',
        rotate: 'rotate 0.8s linear infinite',
        'stroke-dash': 'stroke-dash 1.6s ease-in infinite',
      },
      keyframes: {
        rotate: {
          to: {
            transform: 'rotate(1turn)',
          },
        },
        'stroke-dash': {
          '0%': {
            strokeDasharray: '1, 100',
            strokeDashoffset: '0',
          },
          '50%': {
            strokeDasharray: '80, 100',
            strokeDashoffset: '46',
          },
          to: {
            strokeDasharray: '1, 100',
            strokeDashoffset: '0',
          },
        },
      },
    },
  },
  plugins: [],
}
