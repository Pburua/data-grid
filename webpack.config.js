const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const precssPlugin = require('precss');
const autoprefixerPlugin = require('autoprefixer');

module.exports = {
  entry: './src/index.tsx',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundlefile.js',
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
            ],
          },
        }, {
          loader: 'ts-loader',
        }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'postcss-loader',
          options: {
            plugins() {
              return [
                precssPlugin,
                autoprefixerPlugin,
              ];
            },
          },
        }, {
          loader: 'sass-loader',
        }],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],

};
