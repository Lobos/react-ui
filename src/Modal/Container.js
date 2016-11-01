import React, { Component } from 'react'
import classnames from 'classnames'
import Modal from './Modal'
import { isEmpty } from '../utils/objects'
import { removeItem } from '../utils/array'
import Transition from '../Transition'

import _modal from '../styles/_modal.scss'

export default class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      increase: false,
      ids: [],
      modals: {}
    }
    this.addModal = this.addModal.bind(this)
    this.removeModal = this.removeModal.bind(this)
  }

  addModal (props) {
    let { modals, ids } = this.state
    modals[props.id] = props
    if (ids.indexOf(props.id) < 0) {
      ids.push(props.id)
    }

    this.setState({ modals, ids, increase: true })
    document.body.style.height = '100%'
    document.body.style.overflow = 'hidden'
  }

  removeModal (id) {
    let { modals, ids } = this.state

    id = id || ids.pop()
    let props = modals[id]

    if (!props) { return }

    props.onClose && props.onClose()

    delete modals[id]
    ids = removeItem(ids, id)
    this.setState({ modals, ids, increase: false })

    if (isEmpty(modals)) {
      document.body.style.height = ''
      document.body.style.overflow = ''
    }
  }

  renderModals () {
    const { modals } = this.state

    return Object.keys(modals).map((key, i) => {
      return <Modal key={key} {...modals[key]} index={i} onClose={this.removeModal} />
    })
  }

  render () {
    let className = classnames(
      _modal.container
    )

    return (
      <Transition act={isEmpty(this.state.modals) ? 'leave' : 'enter'}
        duration={300}
        enter={_modal.enter}
        leave={_modal.leave}
        tf="ease-out">
        <div className={className}>
          { this.renderModals() }
        </div>
      </Transition>
    )
  }
}
