import { shallowEqual, deepEqual } from '../utils/objects'
import config from '../config'

export default (deep) => (component) => {
  if (deep) {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      if (!config.pureRender) return true
      return !deepEqual(this.props, nextProps) || !deepEqual(this.state, nextState)
    }
  } else {
    component.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      if (!config.pureRender) return true
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState)
    }
  }

  return component
}
