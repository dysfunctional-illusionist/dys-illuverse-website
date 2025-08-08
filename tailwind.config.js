/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx}",
    "./components/**/*.{astro,html,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        DEFAULT: '#070029ff',
      },
      fontFamily: {
        handjet: ['Handjet', 'sans-serif'],
        coda: ['Coda', 'system-ui'],
        doHyeon: ['Do Hyeon', 'sans-serif'],
        cantarell: ['Cantarell', 'sans-serif'],
        hiMelody: ['Hi Melody', 'sans-serif'],
        cutiveMono: ['Cutive Mono', 'sans-serif'],
      }
    },
  },
  plugins: [],
  safelist: [
    'animate-gradient',
    'hover:animate-gradient',
  ],
};
