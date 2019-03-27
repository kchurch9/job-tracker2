const path = require('path')

require('dotenv').config({path:path.resolve(__dirname,'..','.env')})

const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/index.js'
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 4000,
    historyApiFallback: true//this ensures that the same app is always loaded on all url's
  },
  mode: 'development',
  resolve: {
    extensions: ['.js', '.json']
  },
  plugins: [
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          'process.env.API_HOST': JSON.stringify(process.env.API_HOST)
      }),
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