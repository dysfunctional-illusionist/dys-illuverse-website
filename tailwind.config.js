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
        cutiveMono: ['Cutive Mono', 'monospace'],
        tektur: ['Tektur', 'sans-serif'],
        jura: ['Jura', 'sans-serif'],
        quantico: ['Quantico', 'sans-serif'],
        sourGummy: ['Sour Gummy', 'sans-serif'],
        inconsolata: ['Inconsolata', 'sans-serif'],
        amarante: ['Amarante', 'sans-serif'],
        crimsonText: ['Crimson Text', 'cursive'],
        shantellSans: ['Shantell Sans', 'cursive'],
        cantataOne: ['Cantata One', 'serif'],
        aldrich: ['Aldrich', 'serif'],
      }
    },
  },
  plugins: [],
  safelist: [
    'animate-gradient',
    'hover:animate-gradient',
  ],
};
