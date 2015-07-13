"use strict"

let React = require('react')
let Events = require('../utils/events.js')
let Dom = require('../utils/dom.js')

module.exports = {

  //When the component mounts, listen to click events and check if we need to
  //Call the componentClickAway function.
  componentDidMount: function() {
    if (this.autoBind) {
      this.bindClickAway()
    }
  },

  componentWillUnmount: function() {
    if (this.autoBind) {
      this.unbindClickAway()
    }
  },

  checkClickAway: function(e) {
    let el = React.findDOMNode(this)

    // Check if the target is inside the current component
    if (this.isMounted() && e.target !== el && !Dom.isDescendant(el, e.target)) {
      if (this.componentClickAway) {
        this.componentClickAway()
      }
    }
  },

  bindClickAway: function() {
    Events.on(document, 'click', this.checkClickAway)
    Events.on(document, 'touchstart', this.checkClickAway)
  },

  unbindClickAway: function() {
    Events.off(document, 'click', this.checkClickAway)
    Events.off(document, 'touchstart', this.checkClickAway)
  }

}
