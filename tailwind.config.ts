import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      width: {
        330: '20.625rem',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        buttons: 'var(--color-buttons)',
        typography: 'var(--color-typography)',
        light: 'var(--color-light)',
        purple: 'var(--color-purple)',
      },
      backgroundImage: {
        gradient: 'linear-gradient(180deg, #141333 -33.39%, #202261 15.89%, #543C97 55.84%, #6939A2 74.96%)',
      },
    },
  },
  plugins: [],
};
export default config;
