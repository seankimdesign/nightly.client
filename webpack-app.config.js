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
  },
  resolve: {
    alias: {
      Shared: path.resolve(__dirname, 'shared'),
      Root: path.resolve(__dirname, 'app/src')
    }
  },
  devtool: 'source-map'
}
