var Events = require('../utils/events')
var Dom = require('../utils/dom')

module.exports = {
  componentWillMount: function () {
    this.setState({ fixed: false })
  },

  componentDidMount: function() {
    Events.on(window, 'scroll', this.onScroll)
  },

  componentWillUnmount: function() {
    Events.off(window, 'scroll', this.onScroll)
  },

  _setScrollTop: function (top) {
    this._scrollTop = top
  },

  _getScrollTop: function () {
    return this._scrollTop || 64
  },

  onScroll: function () {
    var top = Dom.getScrollTop()
    if (top > this._getScrollTop()) {
      if (this.state.fixed === false)
        this.setState({ fixed: true })
    } else {
      if (this.state.fixed === true)
        this.setState({ fixed: false })
    }
  }

}
