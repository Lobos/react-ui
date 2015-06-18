"use strict"

require('../../less/message.less')

import React from 'react'
import Overlay from './overlay.jsx'
import Objects from '../utils/objects'
import Classable from '../mixins/classable'
import PubSub from 'pubsub-js'

let messages = []
const ADD_MESSAGE = "EB3A79637B40"
const REMOVE_MESSAGE = "73D4EF15DF50"

const Item = React.createClass({
  displayName: 'Message.Item',

  propTypes: {
    content: React.PropTypes.string,
    dismissed: React.PropTypes.dismissed,
    index: React.PropTypes.number,
    onDismiss: React.PropTypes.func,
    type: React.PropTypes.string
  },

  mixins: [Classable],

  getInitialState: function () {
    return {
      dismissed: this.props.dismissed
    }
  },

  dismiss: function () {
    if (this.state.dismissed) {
      return
    }
    this.setState({ dismissed: true })
    // wait transition end
    setTimeout(function () {
      this.props.onDismiss(this.props.index)
    }.bind(this), 400)
  },

  render: function () {
    let className = this.getClasses(
      'message',
      `message-${this.props.type}`,
      {
        'dismissed': this.state.dismissed
      }
    )

    return (
      <div className={className}>
        <button type="button" onClick={this.dismiss} className="close">&times;</button>
        {this.props.content}
      </div>
    )
  }
})

let Message = React.createClass({
  displayName: 'Message',

  mixins: [Classable],

  getInitialState: function () {
    return {
      messages: messages
    }
  },

  componentDidMount: function () {
    let self = this
    PubSub.subscribe(ADD_MESSAGE, function (topic, data) {
      messages.push(data)
      self.setState({ messages: messages })
    })

    PubSub.subscribe(REMOVE_MESSAGE, function (topic, index) {
      messages.splice(index, 1)
      self.setState({ messages: messages })
    })
  },

  dismiss: function(index) {
    PubSub.publish(REMOVE_MESSAGE, index)
  },

  clear: function () {
    Objects.forEach(this.refs, function (ref) {
      ref.dismiss()
    })
  },

  render: function () {
    let items = this.state.messages.map((msg, i) => {
      return (
        <Item key={i} index={i} ref={i} onDismiss={this.dismiss} {...msg} />
      )
    })

    let className = this.getClasses(
      'rui-message',
      'message-extend',
      { 'has-message': this.state.messages.length > 0 }
    )

    return (
      <div className={className}>
        <Overlay onClick={this.clear} />
        {items}
      </div>
    )
  }
})

Message.show = function (content, type) {
  PubSub.publish(ADD_MESSAGE, {
    content: content,
    type: type || 'info'
  })
}

export default Message
