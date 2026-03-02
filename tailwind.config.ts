import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      fak: ['Proxima Nova'],
    },
    extend: {
      colors: {
        tumbleweed: {
          50: '#fbf6f1',
          100: '#f6e9de',
          200: '#ebd1bd',
          300: '#d9a37f',
          400: '#d18a66',
          500: '#c76e48',
          600: '#b9593d',
          700: '#9a4734',
          800: '#7c3b30',
          900: '#653129',
          950: '#361814',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
