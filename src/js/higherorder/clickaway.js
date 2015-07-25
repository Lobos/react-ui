'use strict'

import React from 'react'
import * as Events from '../utils/events'
import { isDescendant } from '../utils/dom'

export default function clickAway (Component) {
  Component.prototype.checkClickAway = function (e) {
    let el = React.findDOMNode(this)

    // Check if the target is inside the current component
    if (e.target !== el && !isDescendant(el, e.target)) {
      this.componentClickAway()
    }
  }

  Component.prototype.bindClickAway = function () {
    Events.on(document, 'click', this.checkClickAway.bind(this))
    Events.on(document, 'touchstart', this.checkClickAway.bind(this))
  }

  Component.prototype.unbindClickAway = function () {
    Events.off(document, 'click', this.checkClickAway.bind(this))
    Events.off(document, 'touchstart', this.checkClickAway.bind(this))
  }

  return Component
}
