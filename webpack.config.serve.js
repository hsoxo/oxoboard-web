const path = require("path");
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')

const port = process.env.PORT || 8089;

module.exports = {
  ...webpackConfig,
  mode: 'development',
  watch: true,
  entry: {
    hot: 'webpack/hot/dev-server',
    checkin: __dirname + "/src/index.tsx",
  },
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
    publicPath: "/"
  },
  devServer: {
    contentBase: path.join(__dirname, "/public"), // index.html的位置
    port: port,
    hot: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
};