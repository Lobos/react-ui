'use strict'

import Qwest from 'qwest'

export const DATA_REQUEST = 'DATA_REQUEST'
export const DATA_FAILURE = 'DATA_FAILURE'
export const DATA_RECEIVE = 'DATA_RECEIVE'

function requestData (name) {
  return {
    type: DATA_REQUEST,
    name
  }
}

function receiveData (name, data) {
  return {
    name,
    data,
    type: DATA_RECEIVE,
    receiveAt: Date.now()
  }
}

function fetchData (name) {
  return dispatch => {
    dispatch(requestData(name))
    return Qwest.get(`./json/${name}.json`)
      .then(res => {
        dispatch(receiveData(name, res))
      })
  }
}

function shouldFetchData(state, name) {
  const data = state.componentData[name]
  if (!data) {
    return true
  }
  return !data.isFetching
}

export function fetchDataIfNeeded(name) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState(), name)) {
      return dispatch(fetchData(name))
    }
  }
}
