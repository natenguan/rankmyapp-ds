/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1A88FF',
          'blue-dark': '#0050E5',
          navy: '#00132C',
          cyan: '#00A3FF',
          'cyan-light': '#00D9FF',
          orange: '#FF5700',
          'orange-light': '#FF935B',
          teal: '#07C6C3',
          purple: '#8243FF',
          pink: '#FF0167',
        },
        semantic: {
          success: '#07C6C3',
          warning: '#FF5700',
          danger: '#E24B4A',
          info: '#1A88FF',
        },
      },
      fontFamily: {
        display: ['Nunito', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      fontSize: {
        'display-xl': ['40px', { lineHeight: '1.2', fontWeight: '700' }],
        'display-lg': ['28px', { lineHeight: '1.25', fontWeight: '700' }],
        'heading-h2': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-h3': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'heading-h4': ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-default': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'label-upper': ['11px', { lineHeight: '1.3', fontWeight: '500', letterSpacing: '0.08em' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
      },
    },
  },
  plugins: [],
}
