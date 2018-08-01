const sharedConfig = require('./server.shared')
const webpack = require('webpack')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')

const config = {
  ...sharedConfig,
  plugins: [
    new WriteFileWebpackPlugin(),
    ...sharedConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ],
  mode: 'development',
  performance: {
    hints: false,
  },
}

module.exports = config