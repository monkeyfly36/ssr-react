const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 客户端的webpack
module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.spa.html',
      template: 'src/index.spa.html',
      inject: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        // 才能支持import 支持jsx
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', ['@babel/preset-env']] // @babel/preset-env 支持js最新语法
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true
          }
        }]
      }
    ]
  }
}