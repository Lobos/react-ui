"use strict"

import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Overlay from './Overlay'
//import { forEach } from './utils/objects'
import PubSub from 'pubsub-js'

import { requireCss } from './themes'
requireCss('message')

const ADD_MESSAGE = "EB3A79637B40"
const REMOVE_MESSAGE = "73D4EF15DF50"
const CLEAR_MESSAGE = "73D4EF15DF52"
let messages = []
let messageContainer = null

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

  dismiss () {
    if (this.props.dismissed) {
      return
    }
    this.props.onDismiss(this.props.index)
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-message',
      `rct-message-${this.props.type}`,
      { 'dismissed': this.props.dismissed }
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
    className: React.PropTypes.string,
    messages: React.PropTypes.array
  }

  static show (content, type) {
    if (!messageContainer) {
      createContainer()
    }
    PubSub.publish(ADD_MESSAGE, {
      content: content,
      type: type || 'info'
    })
  }

  dismiss (index) {
    PubSub.publish(REMOVE_MESSAGE, index)
  }

  clear () {
    PubSub.publish(CLEAR_MESSAGE)
  }

  render () {
    let items = this.props.messages.map((msg, i) => {
      return (
        <Item key={i} index={i} ref={i} onDismiss={this.dismiss} {...msg} />
      )
    })

    let className = classnames(
      this.props.className,
      'rct-message-container',
      { 'has-message': this.props.messages.length > 0 }
    )

    return (
      <div className={className}>
        <Overlay onClick={this.clear.bind(this)} />
        {items}
      </div>
    )
  }
}

function renderContainer() {
  ReactDOM.render(<Message messages={messages} />, messageContainer)
}

function createContainer () {
  messageContainer = document.createElement('div')
  document.body.appendChild(messageContainer)
}

PubSub.subscribe(ADD_MESSAGE, (topic, data) => {
  messages = [...messages, data]
  renderContainer()
})

PubSub.subscribe(REMOVE_MESSAGE, (topic, index) => {
  messages = [
    ...messages.slice(0, index),
    ...messages.slice(index + 1)
  ]
  renderContainer()
})

PubSub.subscribe(CLEAR_MESSAGE, () => {
  messages = messages.map((m) => {
    m.dismissed = true
    return m
  })
  renderContainer()
  setTimeout(() => {
    messages = []
    renderContainer()
  }, 400)
})
