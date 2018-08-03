import * as express from 'express'
import cors from 'cors'
import chalk from 'chalk'
import path from 'path'
import bodyParser from 'body-parser'
import manifestHelpers from 'express-manifest-helpers'

import configureStore from '../client/store'
import paths from '../../config/paths'
import serverRender from './middleware/render'

const app = express.default()

if (process.env.NODE_ENV === 'development') {
  app.use(paths.publicPath, express.static(path.join(paths.clientBuild, paths.publicPath)))
  app.use('/favicon.ico', (req, res) => {
    res.send('')
  })
}

app.use(cors())

app.use(bodyParser.json())

app.use((req: express.StoreRequestT, res, next) => {
  req.store = configureStore()
  return next()
})

const manifestPath = path.join(paths.clientBuild, paths.publicPath)

app.use(
  manifestHelpers({
    manifestPath: `${manifestPath}/manifest.json`,
  })
)

app.use(serverRender())

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  return res.status(404).json({
    status: 'error',
    message: err.message,
    stack:
    // print a nicer stack trace by splitting line breaks and making them array items
    process.env.NODE_ENV === 'development' && (err.stack || '')
      .split('\n')
      .map((line: string) => line.trim())
      .map((line: string) => line.split(path.sep).join('/'))
      .map((line: string) =>
        line.replace(
          process
            .cwd()
            .split(path.sep)
            .join('/'),
          '.'
        )
      ),
  })
})

app.listen(process.env.PORT || 8500, () => {
  console.log(
    `[${new Date().toISOString()}]`,
    chalk.blue(`App is running: 🌎 http://localhost:${process.env.PORT || 8500}`)
  )
})

export default app