module.exports = {
  purge: [
    './resources/**/*.blade.php', 
    './resources/**/*.js',
    './resources/**/*.jsx'
    // './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
