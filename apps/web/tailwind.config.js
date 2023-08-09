/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const twColors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: twColors.transparent,
      current: twColors.current,
      black: twColors.black,
      white: twColors.white,
      gray: twColors.zinc,
      primary: twColors.indigo,
      success: twColors.green,
      danger: twColors.red,
      warning: twColors.yellow,
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
