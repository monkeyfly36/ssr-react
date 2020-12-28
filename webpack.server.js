const path = require('path')
const nodeExternals = require('webpack-node-externals')
// 服务端的webpack
module.exports = {
  target: 'node',
  mode: 'development',
  entry: './server/index.js',
  externals: [nodeExternals()], // 规避node层node_modules代码
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
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
        // 服务端同构css, 解决document.getElement(xxx) -- isomorphic-style-loader
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        }] 
      }
    ]
  }
}