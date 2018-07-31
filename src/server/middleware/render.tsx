import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from '../../client/components/App'

const serverRenderer = () => (req, res) => {
  const content = renderToString(
    <Provider store={req.store}>
      
    </Provider>
  )
}