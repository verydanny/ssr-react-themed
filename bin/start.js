const webpack = require('webpack')
const nodemon = require('nodemon')
const rimraf = require('rimraf')
const express = require('express')
const webpackDevMiddle = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const webpackConfig = require('../config/webpack.config.js')(process.env.NODE_ENV || 'development')
const paths = require('../config/paths')
const { logMessage, compilerPromise } = require('./utils')

const app = express()

const WEBPACK_PORT =
  process.env.WEBPACK_PORT ||
  (!isNaN(Number(process.env.PORT)) ? Number(process.env.PORT) + 1 : 8501)

const start = async () => {
  rimraf.sync(paths.clientBuild)
  rimraf.sync(paths.serverBuild)

  const [clientConfig, serverConfig] = webpackConfig
  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=http://localhost:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ]

  clientConfig.output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
  clientConfig.output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'

  const publicPath = clientConfig.output.publicPath
}