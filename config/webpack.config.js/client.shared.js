const path = require('path')
const paths = require('../paths')
const { client: clientLoaders } = require('./webpack.loaders')
const resolvers = require('./webpack.resolve')
const plugins = require('./webpack.plugins')

module.exports = {
  name: 'client',
  target: 'web',
  entry: {
    app: [
      '@babel/polyfill',
      path.resolve(__dirname, '../../src/client')
    ]
  },
  output: {
    path: path.join(paths.clientBuild, paths.publicPath),
    filename: 'app.js',
    publicPath: paths.publicPath,
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  module: {
    rules: clientLoaders
  },
  resolve: { ...resolvers
  },
  plugins: [
    ...plugins.shared,
    ...plugins.client
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  optimization: {
    namedModules: true,
    noEmitOnErrors: true
  },
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: false,
    modules: false,
    reasons: false,
    timings: true,
    version: false,
  },
}