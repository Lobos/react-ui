'use strict'

import React from 'react'
import * as Events from '../utils/events'
import { isDescendant } from '../utils/dom'

export default function clickAway(Component) {
  Component.prototype.getClickAwayEvent = function () {
    let fn = this.state.checkClickAwayMethod

    if (!fn) {
      const self = this
      fn = function (e) {
        let el = React.findDOMNode(self)

        // Check if the target is inside the current component
        if (e.target !== el && !isDescendant(el, e.target)) {
          self.componentClickAway()
        }
      }
      this.setState({ checkClickAwayMethod: fn })
    }

    return fn
  }

  Component.prototype.bindClickAway = function () {
    let fn = this.getClickAwayEvent()
    Events.on(document, 'click', fn)
    Events.on(document, 'touchstart', fn)
  }

  Component.prototype.unbindClickAway = function () {
    let fn = this.getClickAwayEvent()
    Events.off(document, 'click', fn)
    Events.off(document, 'touchstart', fn)
  }

  return Component
}
