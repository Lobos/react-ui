var Reflux = require('reflux')
var messageActions = require('../actions/message')

var index = 1

module.exports = Reflux.createStore({
  listenables: [messageActions],

  getInitialState: function () {
    this.messages = []
    return this.messages
  },

  push: function (content, level, title, clickaway) {
    this.messages.push({
      open: true,
      index: index++,
      content: content,
      level: level || 'info',
      title: title,
      clickaway: clickaway
    })
    this.trigger(this.messages)
  },

  onClear: function () {
    this.messages = []
    this.trigger(this.messages)
  },

  onRemove: function (index) {
    var si = -1
    for (var i=0, count=this.messages.length; i<count; i++) {
      if (this.messages[i].index === index) {
        si = i
        break
      }
    }
    this.messages.splice(si, 1)
    this.trigger(this.messages)
  },

  onSuccess: function (content, title) {
    this.push(content, 'success', title, true)
  },

  onInfo: function (content, title) {
    this.push(content, 'info', title, true)
  },

  onWarn: function (content, title) {
    this.push(content, 'warn', title, true)
  },

  onError: function (content, title) {
    this.push(content, 'error', title, false)
  }
})
