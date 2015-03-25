var Reflux = require('reflux')
var loadingActions = require('../actions/loading')

module.exports = Reflux.createStore({
  listenables: [loadingActions],

  init: function () {
    this.count = 0
  },

  onStart: function (text) {
    this.count++
    this.trigger(this.count, text)
  },

  onEnd: function () {
    this.count--
    if (this.count < 0) this.count = 0
    this.trigger(this.count)
  },

  onClear: function () {
    this.count = 0
    this.trigger(this.count)
  }
})
