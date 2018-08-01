import { ActionT } from '../types'
import { ActionTypes } from '../actions/app'

export interface AppState {
  app_loaded: boolean
}

export const INITIAL_STATE = Object.freeze({
  app_loaded: false
})

export default (state: AppState = INITIAL_STATE, action: ActionT) => {
  const { type, payload = {} } = action

  switch (type) {
    case ActionTypes.APP_LOADED: {
      return {
        ...state,
        app_loaded: true
      }
    }
  }

  return state
}