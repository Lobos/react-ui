'use strict'

import { nextUid } from '../utils/strings'
const pre = nextUid()
require('../utils/grids').create(pre)

export default function getGrid (component) {
  component.prototype.getGrid = function () {
    const responsive = this.props.responsive !== null ?
                       this.props.responsive :
                       'md'
    const width = parseInt(this.props.width)
    if (width && width <= 24) {
      if (responsive) {
        return `${pre} ${pre}-1 ${pre}-${responsive}-${width}-24`
      } else {
        return `${pre} ${pre}-${width}-24`
      }
    }
    return ''
  }
  return component
}
