'use strict'

import objectAssign from 'object-assign'
import { combineReducers } from 'redux'
import { DATA_REQUEST, DATA_RECEIVE } from '../actions'

function component(state = { isFetching: false, data: [] }, action) {
  switch (action.type) {
    case DATA_REQUEST:
      return objectAssign({}, state, {
        isFetching: true
      })
    case DATA_RECEIVE:
      return objectAssign({}, state, {
        isFetching: false,
        data: action.data
      })
  }
}

function componentData(state = {}, action) {
  switch (action.type) {
    case DATA_REQUEST:
    case DATA_RECEIVE:
      return objectAssign({}, state, {
        [action.name]: component(state[action.name], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  componentData
})

export default rootReducer
