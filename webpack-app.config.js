const path = require('path')

const buildPath = path.resolve(__dirname, 'app')

module.exports = {
  entry: ['babel-polyfill', buildPath + '/src/index.js'],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },
  devServer: {
    contentBase: buildPath,
    openPage: 'src/index.html',
    publicPath: '/dist/js/',
    watchContentBase: true,
    watchOptions: {
      poll: true
    },
    port: 7777
  },
  output: {
    path: buildPath + '/dist/js/',
    filename: 'bundle.js',
    publicPath: '/dist/js/'
  }
}
