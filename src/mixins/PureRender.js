'use strict'

import { shallowEqual, deepEqual } from '../utils/objects'

export default (deep) => (component) => {
  if (deep) {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState)
    }
  } else {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    }
  }

  return component
}
