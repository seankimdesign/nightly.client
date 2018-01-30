const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const buildPath = path.resolve(__dirname, 'landing')
const extractSass = new ExtractTextPlugin({
  filename: 'css/bundle.css'
})

module.exports = {
  entry: {
    main: [buildPath + '/src/js/main.js', buildPath + '/src/css/main.scss']
  },
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
  output: {
    path: buildPath + '/dist',
    filename: 'js/bundle.js'
  },
  resolve: {
    alias: {
      Shared: path.resolve(__dirname, 'shared')
    }
  }
}
