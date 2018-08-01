import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import app from './appReducer'

const rootReducer = combineReducers({
  app,
  router,
})

export default rootReducer