'use strict'

import classnames from 'classnames'
import React from 'react'
import PubSub from 'pubsub-js'
import Button from './button.jsx'
import Overlay from './overlay.jsx'
import {getLang} from '../lang'
import modalStyle from '../../less/modal.less'

let modals = []
const ADD_MODAL = 'id39hxqm'
const REMOVE_MODAL = 'id39i40m'
const ZINDEX = 1100

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
  }

  state = {
    modals: modals
  }

  close () {
    PubSub.publish(REMOVE_MODAL)
  }

  renderModals () {
    return this.state.modals.map((options, i) => {
      let style = {
        width: options.width || 500,
        zIndex: ZINDEX + i
      }
      style.marginLeft = 0 - style.width / 2

      let header, btnOk
      if (options.header) {
        header = <div className={modalStyle.header}>{options.header}</div>
      }
      if (options.onOk) {
        btnOk = <Button status="primary" onClick={() => {this.close(); options.onOk()}}>{getLang('buttons.ok')}</Button>
      }

      let modal = (
        <div key={i} style={style} className={modalStyle.modal}>
          <a className={modalStyle.close} onClick={this.close.bind(this)}>&times;</a>
          {header}
          <div className={modalStyle.content}>
            {options.content}
          </div>
          <div className={modalStyle.footer}>
            {btnOk}
          </div>
        </div>
      )
      return modal
    })
  }

  render () {
    let mlen = this.state.modals.length
    let className = classnames(
      modalStyle.modalContainer,
      { active: mlen > 0}
    )

    return (
      <div className={className}>
        <Overlay className={classnames({active: mlen > 0})} style={{zIndex: ZINDEX + mlen - 1}} />
        { this.renderModals() }
      </div>
    )
  }
}

Modal.show = function (options) {
  PubSub.publish(ADD_MODAL, options)
}

Modal.alert = function (content) {
  Modal.show({
    content,
    onOk: () => {}
  })
}
