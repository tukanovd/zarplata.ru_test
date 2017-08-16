const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'

const path = require('path')

module.exports = {

  devtool: 'cheap-module-source-map',

  entry: './src/index.js',

  output: {
    path: path.resolve('build'),
    filename: 'static/js/[name].[hash:8].js',
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },

  plugins: [

    new CleanWebpackPlugin(['./build'], {
      verbose: true,
      dry: false,
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],

}