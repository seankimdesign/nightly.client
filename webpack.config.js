const path = require('path')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin({
  filename: 'css/bundle.css'
})

module.exports = {
  entry: {
    main: ['./app/src/js/main.js', './app/src/css/main.scss']
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
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractSass
  ],
  output: {
    path: path.resolve(__dirname, 'app/dist'),
    filename: 'js/bundle.js'
  }
}
