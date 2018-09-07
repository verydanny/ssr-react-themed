import * as React from 'react'
import * as express from 'express'
import { renderToNodeStream } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { renderToStream } from 'react-themed-too'

import App from '../../client/components/App'
import { HTML } from './templates/Html'

const router = express.Router()

const serverRenderer = () => (req: express.StoreRequestT, res: express.Response) => {
  if (req.store) {

    const store = JSON.stringify(req.store.getState())
    const assets = res.locals.getJavascripts()
    const children = (
      <Provider store={ req.store }>
        <Router location={ req.url } context={{}}>
          <App/>
        </Router>
      </Provider>
    )
    
    res.write(`
    <!doctype html>
    <html>
    <head>
    <title>App</title>
    <script>window.__PRELOADED_STATE__ = ${ store }</script>
    </head>
    <body>
    <div id="app">`)

    const stream = renderToNodeStream(children).pipe(renderToStream())
    stream.pipe(res, { end: false })
    stream.on('end', () => {
      res.end(`</div>${assets.map(src => `<script src="${src}"></script>`)}</body></html>`)
    })

    // const html = renderToString(
    //   <HTML
    //     state={store}
    //     scripts={assets}
    //     css={criticalCss.body}
    //   >
    //     { children }
    //   </HTML>
    // )

    // res.send(html)
  }
}

export default serverRenderer
