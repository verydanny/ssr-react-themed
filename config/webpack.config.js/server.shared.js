const path = require('path')
const nodeExternals = require('webpack-node-externals')

const paths = require('../paths')
const { server: serverLoaders } = require('./webpack.loaders')
const resolvers = require('./webpack.resolve')
const plugins = require('./webpack.plugins')

module.exports = {
  name: 'server',
  target: 'node',
  entry: {
    server: [
      '@babel/polyfill',
      path.resolve(__dirname, '../../src/server/')
    ]
  },
  externals: [
    nodeExternals({
      whitelist: /\.css$/
    })
  ],
  output: {
    path: paths.serverBuild,
    filename: 'server.js',
    publicPath: paths.publicPath
  },
  resolve: { ...resolvers },
  module: {
    rules: serverLoaders
  },
  plugins: [
    ...plugins.shared,
    ...plugins.server
  ],
  stats: {
    colors: true
  },
}

