module.exports = {
  purge: [
    './resources/**/*.blade.php', 
    './resources/**/*.js',
    './resources/**/*.jsx'
    // './resources/**/*.vue',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderWidth: {
        3: '3px', 
        6: '6px'
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      margin: ['first', 'last'],
    },
  },
  plugins: [
    // plugin(({ addVariant, e }) => {
    //   addVariant('before', ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`before${separator}${className}`)}::before`;
    //     });
    //   });
    //   addVariant('after', ({ modifySelectors, separator }) => {
    //     modifySelectors(({ className }) => {
    //       return `.${e(`after${separator}${className}`)}::after`;
    //     });
    //   });
    // }), 
    // plugin(({ addUtilities }) => {
    //   const contentUtilities = {
    //     '.content': {
    //       content: 'attr(data-content)',
    //     }, 
    //     '.content-before': {
    //       content: 'attr(data-before)',
    //     }, 
    //     '.content-after': {
    //       content: 'attr(data-after)',
    //     },
    //   };

    //   addUtilities(contentUtilities, ['before', 'after']);
    // }),
  ],
}
