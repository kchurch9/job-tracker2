const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 4000
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
   ],
  module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader"
            }
        }, {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};