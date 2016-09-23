'use strict'

import ReactDOM from 'react-dom'
import { objectAssign } from '../utils/objects'
import { nextUid } from '../utils/strings'

import Container from './Container'
import fakeModal from './Fake'

import {getLang} from '../lang'

// create container ===================================================

const div = document.createElement('div')
document.body.appendChild(div)
const container = ReactDOM.render(<Container />, div)

// static method ======================================================

function close (id) {
  container.removeModal(id)
};

function open (options) {
  options = objectAssign({
    id: nextUid(),
    padding: '1rem'
  }, options)

  container.addModal(options)
  return options.id
};

function alert (content, header = getLang('modal.alert'), callback) {
  let buttons = {}
  if (typeof callback === 'function') {
    buttons[getLang('buttons.ok')] = function () {
      callback()
      return true
    }
  } else {
    buttons[getLang('buttons.ok')] = true
  }

  return open({
    clickaway: false,
    content,
    header,
    buttons
  })
};

function confirm (content, callback, header = getLang('modal.confirm')) {
  let buttons = {}

  buttons[getLang('buttons.ok')] = () => {
    callback()
    return true
  }
  buttons[getLang('buttons.cancel')] = true

  return open({
    clickaway: false,
    content,
    header,
    buttons
  })
};

const Modal = fakeModal(open, close)

Modal.open = open
Modal.alert = alert
Modal.confirm = confirm
Modal.close = close

export default Modal
