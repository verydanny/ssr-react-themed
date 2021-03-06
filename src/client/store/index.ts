import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/rootReducer'
import { ReduxDevTools } from '../../types/redux-dev-tools'

declare const window: ReduxDevTools

export const configureStore = ({ initialState = {}, middleware = [] } = {}) => {
  const devtools =
    typeof window !== 'undefined' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ actionsBlacklist: [] })

  const composeEnhancers = devtools || compose

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(...[thunk].concat(...middleware)))
  )

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./reducers/rootReducer', () =>
        store.replaceReducer(require('./reducers/rootReducer').default)
      )
    }
  }

  return store
}

export default configureStore