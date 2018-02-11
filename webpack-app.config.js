const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildPath = path.resolve(__dirname, 'app')
const extractSass = new ExtractTextPlugin({
  filename: 'css/bundle.css'
})

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
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {loader: 'sass-loader'}
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader'
      }
    ]
  },
  plugins: [
    extractSass
  ],
  devServer: {
    contentBase: buildPath,
    publicPath: '/dist/js/',
    watchContentBase: true,
    host: 'localhost',
    historyApiFallback: true,
    watchOptions: {
      poll: 10000
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
