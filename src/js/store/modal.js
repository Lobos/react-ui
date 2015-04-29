var Reflux = require('reflux')
var modalActions = require('../actions/modal')

module.exports = Reflux.createStore({
  listenables: [modalActions],

  getInitialState: function () {
    this.modals = []
    return this.modals
  },

  onOpen: function (modal) {
    this.modals.push(modal)
    this.trigger(this.modals)
  },

  onDismiss: function () {
    this.modals.pop()
    this.trigger(this.modals)
  },

  onConfirm: function (content, title, onCheck) {
    // two arguments
    if (typeof title === 'function') {
      onCheck = title
      title = null
    }

    this.onOpen({
      content: content,
      title: title,
      onCheck: onCheck
    })
  }
})
