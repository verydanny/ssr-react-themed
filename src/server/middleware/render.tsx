import * as React from 'react'
import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from '../../client/components/App'
import { HTML } from './templates/Html'

const serverRenderer = () => (req: express.StoreRequestT, res: express.Response) => {
  if (req.store) {
    const content = renderToString(
      <Provider store={ req.store }>
        <Router location={ req.url } context={{}}>
          <App/>
        </Router>
      </Provider>
    )
  
    const state = JSON.stringify(req.store.getState())

    return res.send(`
      <!doctype html>
      ${renderToString(
        <HTML state={ state }>
          { content }
        </HTML>
      )}
    `)
  }
}

export default serverRenderer