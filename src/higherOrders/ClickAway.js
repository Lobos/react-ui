import React from 'react'
import PropTypes from '../utils/proptypes'
import { findDOMNode } from 'react-dom'
import * as Events from '../utils/events'
import { isDescendant } from '../utils/dom'

export default function ClickAwayWrap (Component) {
  class ClickAway extends React.Component {
    constructor (props) {
      super(props)
      this.state = { open: props.open }
      this.handleOpen = this.handleOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.registerTarget = this.registerTarget.bind(this)
    }

    componentDidMount () {
      if (!this.target) this.target = findDOMNode(this)
    }

    componentWillUnmount () {
      this.unbindClickAway()
    }

    bindClickAway () {
      const fn = this.getClickAwayEvent()
      Events.on(document, 'click', fn)
      Events.on(document, 'touchstart', fn)
    }

    unbindClickAway () {
      const fn = this.getClickAwayEvent()
      Events.off(document, 'click', fn)
      Events.off(document, 'touchstart', fn)
    }

    registerTarget (target) {
      this.target = target
    }

    getClickAwayEvent () {
      let fn = this._clickAwayEvent
      if (!fn) {
        fn = (event) => {
          let el = this.target

          // Check if the target is inside the current component
          if (event.target !== el && !isDescendant(el, event.target)) {
            this.handleClose()
          }
        }
        this._clickAwayEvent = fn
      }
      return fn
    }

    handleOpen (callback) {
      this.bindClickAway()
      this.setState({ open: true }, callback)
    }

    handleClose (callback) {
      this.unbindClickAway()
      this.setState({ open: false }, callback)
    }

    render () {
      return (
        <Component {...this.props}
          open={this.state.open}
          onOpen={this.handleOpen}
          onClose={this.handleClose}
          registerTarget={this.registerTarget}
        />
      )
    }
  }

  ClickAway.propTypes = {
    open: PropTypes.bool
  }

  return ClickAway
}

ClickAwayWrap.propTypes = {
  onClose: PropTypes.func,
  onOpen: PropTypes.func,
  open: PropTypes.bool,
  registerTarget: PropTypes.func
}
