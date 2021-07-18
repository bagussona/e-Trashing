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
        1: '1px',
        3: '3px', 
        6: '6px'
      },
      zIndex: {
        '99': '99',
        '100': '100',
        '101': '101',
        '999': '999'
      },
      width: {
        '3': '0.75rem',
        '30': '7.5rem',
        '9/20': '45%',
        '100': '25rem',
        '120': '30rem',
        '125': '31.25rem',
        '140': '35rem',
      },
      height: {
        '3': '0.75rem',
        '100': '25rem', 
        '120': '30rem',
        '125': '31.25rem',
        '140': '35rem',
      },
      minHeight: {
        '125': '31.25rem',
        '14': '3.5rem'
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      margin: ['first', 'last', 'hover', 'active'],
      
    },
    scrollbars: ['rounded'],
  },
  plugins: [
    require('tailwind-scrollbar')
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
