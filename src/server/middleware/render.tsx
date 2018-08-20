import * as React from 'react'
import * as express from 'express'
import { renderToNodeStream, renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { extractCritical } from 'react-themed-too'

import App from '../../client/components/App'
import { HTML } from './templates/Html'

const serverRenderer = () => (req: express.StoreRequestT, res: express.Response) => {
  if (req.store) {

    const store = JSON.stringify(req.store.getState())
    const assets = res.locals.getJavascripts()
    const children = renderToString(
      <Provider store={ req.store }>
        <Router location={ req.url } context={{}}>
          <App/>
        </Router>
      </Provider>
    )

    const css = extractCritical(children)

    const html = renderToString(
      <HTML
        state={store}
        scripts={assets}
        css={css.css}
      >
        { children }
      </HTML>
    )

    res.send(html)
  }
}

export default serverRenderer
