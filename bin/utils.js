const glob = require('glob')
const DtsCreator = require('typed-css-modules')
const path = require('path')
const chalk = require('chalk')

const logMessage = (message, level = 'info') => {
  const color = level === 'error' ? 'red' : level === 'warning' ? 'yellow' : 'white'
  console.log(
    `[${new Date().toISOString()}]`,
    chalk[color](message)
  )
}

const compilerPromise = (compiler) => {
  return new Promise(( resolve, reject ) => {
    compiler.plugin('done', (stats) => {
      if (!stats.hasErrors()) {
        return resolve();
      }

      return reject('Compilation Failed!')
    })
  })
}

const generateCssTypes = () => {
  const creator = new DtsCreator()
  const cssPath = path.resolve(__dirname, '..')

  glob(, (err, files) => {
    files.map(filename =>
      creator.create(filename).then(content => {
        content.writeFile()
      })
    )
  })
}

module.exports = {
  logMessage,
  compilerPromise,
  generateCssTypes
}