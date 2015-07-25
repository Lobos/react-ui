'use strict'

require('../../less/grid.less')
require('../utils/grids').create()

export default function getGrid (component) {
  component.prototype.getGrid = function () {
    const responsive = this.props.responsive !== null ?
                       this.props.responsive :
                       'md'
    const width = parseInt(this.props.width)
    if (width && width <= 24) {
      if (responsive) {
        return `pure-u pure-u-1 pure-u-${responsive}-${width}-24`
      } else {
        return `pure-u pure-u-${width}-24`
      }
    }
    return ''
  }
  return component
}
