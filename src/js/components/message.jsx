var React = require('react')
var Reflux = require('reflux')
var Icon = require('./icon.jsx')
var Overlay = require('./overlay.jsx')

var messageStore = require('../store/message')
var messageActions = require('../actions/message')
var ClickAwayable = require('../mixins/click-awayable')
var Classable = require('../mixins/classable')

var Message = React.createClass({
  mixins: [ClickAwayable, Classable, Reflux.connect(messageStore, 'messages')],
  
  dismiss: function(index) {
    messageActions.remove(index)
  },

  clear: function () {
    this.msgRefs.forEach(function (ref) {
      this.refs[ref].dismiss()
    }.bind(this))
  },

  render: function () {
    this.msgRefs = []
    var items = this.state.messages.map(function (msg, i) {
      var k = 'm' + i
      this.msgRefs.push(k)
      return (
        <Item key={k} ref={k} onDismiss={this.dismiss} {...msg} />
      )
    }.bind(this))

    var className = this.getClasses(
      'message-container',
      {
        'top': this.props.top,
        'has-message': this.state.messages.length > 0
      }
    )

    return (
      <div className={className}>
        <Overlay onClick={this.clear} />
        {items}
      </div>
    )
  }
})

var Item = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      dismissed: this.props.dismissed
    }
  },

  dismiss: function () {
    if (this.state.dismissed) return
    this.setState({ dismissed: true })
    setTimeout(function () {
      this.props.onDismiss(this.props.index)
    }.bind(this), 400)
  },

  render: function () {
    var className = this.getClasses(
      'message',
      this.props.level,
      {
        'dismissed': this.state.dismissed
      }
    ) 

    return (
      <div className={className}>
        <button type="button" onClick={this.dismiss} className="close"><Icon icon="close" /></button>
        {this.props.title && <h3>{this.props.title}</h3>}
        {this.props.content}
      </div>
    )
  }
})

module.exports = Message
