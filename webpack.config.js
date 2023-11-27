// const path = require("path");

// module.exports = {
//   entry: "./src/index.js",
//   output: { path: path.resolve(__dirname, "dist") },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: "babel-loader",
//           options:{
//             presets: ["@babel/preset-env", "@babel/preset-react"],
//           }
//         },
//       },
//     ],
//   },
// };

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

module.exports = {
  // Webpack configuration goes here
  mode: 'development',
};