'use strict'

const grid = 'rct-g'
require('../utils/grids').create(grid)

export default function getGrid (component) {
  component.prototype.getGrid = function (width) {
    const responsive = this.props.responsive !== null ?
                       this.props.responsive :
                       'md'
    width = width || parseInt(this.props.width)
    if (width && width <= 24) {
      if (responsive) {
        return `${grid} ${grid}-1 ${grid}-${responsive}-${width}-24`
      } else {
        return `${grid} ${grid}-${width}-24`
      }
    }
    return ''
  }
  return component
}
