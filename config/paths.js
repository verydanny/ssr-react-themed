const path = require('path')
const fs = require('fs')

const appDir = fs.realpathSync(process.cwd())
const resolveApp = (relativePath) => path.resolve(appDir, relativePath)

const paths = {
  clientBuild: resolveApp('dist/client'),
  serverBuild: resolveApp('dist/server'),
  dotenv: resolveApp('.env'),
  src: resolveApp('src'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
  srcUi: resolveApp('src/ui'),
  publicPath: '/static/'
}

paths.resolveModules = [
  paths.srcClient,
  paths.srcServer,
  paths.src,
  'node_modules'
]

module.exports = paths
