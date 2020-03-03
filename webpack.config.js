const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundlefile.js'
  },

  resolve: {
    extensions: [ ".tsx", ".ts", ".js" ]
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [ {
          loader: 'babel-loader',
          options: {
            presets: [
              "@babel/preset-env",
              '@babel/preset-react'
            ]
          }
        }, {
          loader: "ts-loader"
        } ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]

};