'use strict'

import ReactDOM from 'react-dom'
import { nextUid } from '../utils/strings'
import Container from './Container'

// create container ===================================================

const div = document.createElement('div')
document.body.appendChild(div)
const container = ReactDOM.render(<Container />, div)

// static method ======================================================

function create (type) {
  return (content, msg = {}) => {
    if (typeof msg === 'string') msg = { type: msg }
    if (type) msg.type = type

    msg.id = nextUid()
    msg.content = content
    msg.duration = msg.duration !== undefined
      ? msg.duration
      : (msg.type === 'error' || msg.type === 'danger') ? 0 : 5
    container.addMessage(msg)
  }
}

export default {
  show: create(),
  success: create('success'),
  info: create('info'),
  warning: create('warning'),
  error: create('error'),
  danger: create('danger')
}
