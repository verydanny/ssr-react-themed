import * as React from 'react'
import * as express from 'express'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from '../../client/components/App'


const serverRenderer = () => (req: express.StoreRequestT, res: express.Response) => {
  const content = renderToString(
    <Provider store={ req.store }>
      
    </Provider>
  )
}

export default serverRenderer