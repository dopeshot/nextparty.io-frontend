module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    fontFamily: {
      'rubik': ['Rubik', 'sans-serif']
    },
    extend: {
      colors: {
        'lightgrey': '#B3B3BF',
        'darkgray': '#3E4851',
        'truth-yellow': '#F6BF22',
        'dare-green': '#09BB88',
        'background-black': '#0C0C0C'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
