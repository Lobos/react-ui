"use strict"

require('../../less/message.less')

import React from 'react'
import classnames from 'classnames'
import Overlay from './overlay.jsx'
import { forEach } from '../utils/objects'
import PubSub from 'pubsub-js'

let messages = []
const ADD_MESSAGE = "EB3A79637B40"
const REMOVE_MESSAGE = "73D4EF15DF50"

class Item extends React.Component {
  static displayName = 'Message.Item'

  static propTypes = {
    className: React.PropTypes.string,
    content: React.PropTypes.any,
    dismissed: React.PropTypes.bool,
    index: React.PropTypes.number,
    onDismiss: React.PropTypes.func,
    type: React.PropTypes.string
  }

  state = {
    dismissed: this.props.dismissed
  }

  dismiss () {
    if (this.state.dismissed) {
      return
    }
    this.setState({ dismissed: true })
    // wait transition end
    setTimeout(function () {
      this.props.onDismiss(this.props.index)
    }.bind(this), 400)
  }

  render () {
    let className = classnames(
      this.props.className,
      'message',
      `message-${this.props.type}`,
      { 'dismissed': this.state.dismissed }
    )

    return (
      <div className={className}>
        <button type="button" onClick={this.dismiss.bind(this)} className="close">&times;</button>
        {this.props.content}
      </div>
    )
  }
}

export default class Message extends React.Component {
  static displayName = 'Message'

  static propTypes = {
    className: React.PropTypes.string
  }

  componentDidMount () {
    let self = this
    PubSub.subscribe(ADD_MESSAGE, function (topic, data) {
      messages.push(data)
      self.setState({ messages: messages })
    })

    PubSub.subscribe(REMOVE_MESSAGE, function (topic, index) {
      messages.splice(index, 1)
      self.setState({ messages: messages })
    })
  }

  static show (content, type) {
    PubSub.publish(ADD_MESSAGE, {
      content: content,
      type: type || 'info'
    })
  }

  state = {
    messages: messages
  }

  dismiss (index) {
    PubSub.publish(REMOVE_MESSAGE, index)
  }

  clear () {
    forEach(this.refs, function (ref) {
      ref.dismiss()
    })
  }

  render () {
    let items = this.state.messages.map((msg, i) => {
      return (
        <Item key={i} index={i} ref={i} onDismiss={this.dismiss} {...msg} />
      )
    })

    let className = classnames(
      this.props.className,
      'rui-message',
      'message-extend',
      { 'has-message': this.state.messages.length > 0 }
    )

    return (
      <div className={className}>
        <Overlay onClick={this.clear.bind(this)} />
        {items}
      </div>
    )
  }
}

/*
Message.show = function (content, type) {
  PubSub.publish(ADD_MESSAGE, {
    content: content,
    type: type || 'info'
  })
}
*/
