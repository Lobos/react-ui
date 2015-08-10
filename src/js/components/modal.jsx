'use strict'

import classnames from 'classnames'
import React from 'react'
import PubSub from 'pubsub-js'
import Button from './button.jsx'
import Overlay from './overlay.jsx'
import {getLang} from '../lang'
import modalStyle from '../../less/modal.less'

const ADD_MODAL = 'id39hxqm'
const REMOVE_MODAL = 'id39i40m'
const CLICKAWAY = 'id5bok7e'
const ZINDEX = 1100
let modals = []
let modalContainer = null

export default class Modal extends React.Component {
  static displayName = 'Modal'

  componentDidMount () {
    PubSub.subscribe(ADD_MODAL, (topic, props) => {
      modals.push(props)
      this.setState({ modals })
    })

    PubSub.subscribe(REMOVE_MODAL, (data) => {
      let props = modals.pop()
      if (props.onClose) {
        props.onClose(data)
      }
      this.setState({ modals })
    })

    PubSub.subscribe(CLICKAWAY, () => {
      let props = modals[modals.length - 1]
      if (props.clickaway) {
        PubSub.publish(REMOVE_MODAL)
      }
    })
  }

  state = {
    modals: modals
  }

  close () {
    PubSub.publish(REMOVE_MODAL)
  }

  clickaway () {
    PubSub.publish(CLICKAWAY)
  }

  renderModals () {
    return this.state.modals.map((options, i) => {
      let style = {
        width: options.width || 500,
        zIndex: ZINDEX + i
      }
      if (typeof style.width === 'number' || style.width.indexOf('px') > 0) {
        style.width = parseInt(style.width)
        style.marginLeft = 0 - style.width / 2
      } else if (style.width.indexOf('%') > 0) {
        style.marginLeft = (0 - parseInt(style.width) / 2) + '%'
      }

      let header, buttons = []
      if (options.header) {
        header = <div className={modalStyle.header}>{options.header}</div>
      }

      if (options.buttons) {
        let lastButton = Object.keys(options.buttons).length - 1
        buttons = Object.keys(options.buttons).map((btn, j) => {
          let func = options.buttons[btn],
              status = j === lastButton ? 'primary' : '',
              handle = () => {
                if (func === true) {
                  this.close()
                } else {
                  if (func()) {
                    this.close()
                  }
                }
              }
          return <Button status={status} key={j} onClick={handle}>{btn}</Button>
        })
      }

      let modal = (
        <div key={i} style={style} className={modalStyle.modal}>
          <a className={modalStyle.close} onClick={this.close.bind(this)}>&times;</a>
          {header}
          <div className={modalStyle.content}>
            {options.content}
          </div>
          {
            buttons.length > 0 &&
            <div className={modalStyle.footer}>
              {buttons}
            </div>
          }
        </div>
      )
      return modal
    })
  }

  render () {
    let mlen = this.state.modals.length
    let className = classnames(
      modalStyle.modalContainer,
      { active: mlen > 0 }
    )

    return (
      <div className={className}>
        <Overlay onClick={this.clickaway.bind(this)} className={classnames({active: mlen > 0})} style={{zIndex: ZINDEX + mlen - 1}} />
        { this.renderModals() }
      </div>
    )
  }
}

Modal.open = function (options) {
  if (!modalContainer) {
    createContainer()
  }
  PubSub.publish(ADD_MODAL, options)
}

Modal.alert = function (content) {
  let buttons = {}
  buttons[getLang('buttons.ok')] = true

  Modal.open({
    clickaway: false,
    content,
    buttons: buttons
  })
}

Modal.confirm = function (content, onOk) {
  let buttons = {}
  buttons[getLang('buttons.cancel')] = true
  buttons[getLang('buttons.ok')] = () => {
    onOk()
    return true
  }

  Modal.open({
    clickaway: false,
    content,
    buttons: buttons
  })
}

function createContainer () {
  modalContainer = document.createElement('div')
  document.body.appendChild(modalContainer)
  React.render(<Modal />, modalContainer)
}
