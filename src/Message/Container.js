import React, { Component, DOM } from 'react'
import Message from './Message'
import { isEmpty } from '../utils/objects'

import Styles from '../styles/_message.scss'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      messages: {}
    }

    this.addMessage = this.addMessage.bind(this)
    this.removeMessage = this.removeMessage.bind(this)
  }

  addMessage (msg) {
    let messages = this.state.messages
    messages[msg.id] = msg
    this.setState({ messages })
  }

  removeMessage (id) {
    let messages = this.state.messages
    delete messages[id]
    this.setState({ messages })
  }

  render () {
    const messages = this.state.messages

    if (isEmpty(messages)) {
      return DOM.noscript()
    } else {
      return (
        <div className={Styles.container}>
          {
            Object.keys(messages).map((key) => {
              return (
                <Message key={key}
                  {...messages[key]}
                  onClose={this.removeMessage}
                />
              )
            })
          }
        </div>
      )
    }
  }
}
