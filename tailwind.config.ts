import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        330: '20.625rem',
      },
      colors: {
        primary: '#FFF0F0',
        lightGrey: '#EAEEF7',
      },
    },
  },
  plugins: [],
};
export default config;
