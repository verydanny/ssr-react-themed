const sharedConfig = require('./client.shared')
const webpack = require('webpack')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

const config = {
  ...sharedConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    ...sharedConfig.plugins,
  ],
  mode: 'development',
  devtool: 'source-map',
  performance: {
    hints: false,
  },
}

module.exports = config