var React = require('react')
var Reflux = require('reflux')
var Icon = require('./icon.jsx')
var Overlay = require('./overlay.jsx')

var Objects = require('../utils/objects')
var messageStore = require('../store/message')
var messageActions = require('../actions/message')
var Classable = require('../mixins/classable')

var Message = React.createClass({
  mixins: [Classable, Reflux.connect(messageStore, 'messages')],
  
  dismiss: function(index) {
    messageActions.remove(index)
  },

  clear: function () {
    Objects.forEach(this.refs, function (ref) {
      ref.dismiss()
    })
  },

  render: function () {
    var items = this.state.messages.map(function (msg, i) {
      return (
        <Item key={i} ref={i} onDismiss={this.dismiss} {...msg} />
      )
    }, this)

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
