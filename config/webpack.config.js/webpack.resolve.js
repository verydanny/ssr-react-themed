const paths = require('../paths');

module.exports = {
  extensions: ['.js', '.ts', '.tsx', '.json', '.jsx', '.css'],
  modules: paths.resolveModules,
}