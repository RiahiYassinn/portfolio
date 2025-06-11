/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f1fe',
          100: '#cce3fd',
          200: '#99c8fb',
          300: '#66acf9',
          400: '#3391f7',
          500: '#0a192f', // Deep navy
          600: '#0058cc',
          700: '#0046a3',
          800: '#00357a',
          900: '#002352',
        },
        accent: {
          50: '#e6fffa',
          100: '#b3ffef',
          200: '#80ffe4',
          300: '#4dffda',
          400: '#1affcf',
          500: '#64ffda', // Teal
          600: '#00cc9c',
          700: '#00997a',
          800: '#006652',
          900: '#00332b',
        },
        secondary: {
          50: '#f2f6fc',
          100: '#e6eef9',
          200: '#cddcf3',
          300: '#b3cbee',
          400: '#9ab9e8',
          500: '#8ca2e0', // Light purple
          600: '#6680cb',
          700: '#5166a3',
          800: '#3d4d7a',
          900: '#283352',
        },
        dark: {
          100: '#d5d5d5',
          200: '#acacac',
          300: '#828282',
          400: '#595959',
          500: '#0a192f', // Navy (dark mode background)
          600: '#09152a',
          700: '#071024',
          800: '#060c1f',
          900: '#040819',
        },
        light: {
          100: '#ffffff',
          200: '#fafafa',
          300: '#f5f5f5',
          400: '#f0f0f0',
          500: '#e6f1fe', // Light background
          600: '#e0e0e0',
          700: '#d1d1d1',
          800: '#c2c2c2',
          900: '#b3b3b3',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};