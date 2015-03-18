var React = require('react')
var classnames = require('classnames')
var Cortex = require("cortexjs")
var ClickAwayable = require('../mixins/click-awayable')
var Icon = require('./icon.jsx')
var Dom = require('../utils/dom')

var cortex = new Cortex({ open: false })

var Message = React.createClass({

  mixins: [ClickAwayable],

  dismiss: function() {
    cortex.set({ open: false })
  },

  componentClickAway: function () {
    if (this.props.clickaway !== false)
      this.dismiss();
  },

  componentDidMount: function () {
    this._unbindClickAway()
    cortex.on('update', function () {
      this.forceUpdate()
    }.bind(this))
  },

  componentDidUpdate: function(prevProps) {
    var msg = cortex.getValue()
    if (prevProps.open !== msg.open) {
      if (msg.open) {
        this._bindClickAway()
      } else {
        this._unbindClickAway()
      }
    }
    if (msg.open) {
      this.show()
    } else {
      this.close()
    }
  },

  show: function () {
    var el = this.getDOMNode()
    // wait dom ready ??
    setTimeout(function () {
      Dom.addClass(el, 'active')
    }, 50)
  },

  close: function () {
    var el = this.getDOMNode()
    Dom.removeClass(el, 'active')
    // wait transition end, use setTimeout instead of transitionend event
    setTimeout(function () {
      Dom.withoutTransition(el, function () {
        Dom.removeClass(el, 'enter')
      })
    }, 450)
  },

  render: function () {
    // use global cortex value instead of Component.state
    var msg = cortex.getValue()
    var classes = classnames(msg.level, {
      'top': this.props.top,
      'message-container': true,
      'enter': true
    })

    return(
      <div className={classes}>
        <button type="button" onClick={this.dismiss} className="close"><Icon icon="close" /></button>
        {msg.title && <h3>{msg.title}</h3>}
        {msg.content}
      </div>
    )
  }

})

Message.show = function (content, level, title) {
  // add ramdon time to fire cortex update event
  var msg = {
    time: Date.now(),
    open: true,
    content: content,
    level: level || 'info',
    title: title
  }
  cortex.set(msg)
}

var methods = ['error', 'info', 'warn', 'success']
methods.forEach(function (k) {
  Message[k] = function (content, title) {
    Message.show(content, k, title)
  }
})

module.exports = Message

