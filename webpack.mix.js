const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .react()
    // .sass('resources/sass/app.scss', 'public/css')
    .postCss("resources/css/app.css", "public/css", [
    require("tailwindcss"),
  ]);

// exports.onCreateWebpackConfig = ({actions, getConfig}) => {
//   const config = getConfig();

//   config.node = {
//     fs: 'empty'
//   };
// }

// module.exports = {
//   module: {
//     rules: [
//       {
//         test: /\.css$/i,
//         use: [
//           "style-loader",
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               postcssOptions: {
//                 plugins: [
//                   [
//                     "postcss-preset-env",
//                     {
//                       // Options
//                     },
//                   ],
//                 ],
//               },
//             },
//           },
//         ],
//       },
//     ],
//   },
// };