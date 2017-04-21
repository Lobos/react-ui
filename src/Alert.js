import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'

import Styles from './styles/_alert.scss'

export default class Alert extends Component {
  constructor (props) {
    super(props)

    this.state = { dismissed: false }
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose () {
    this.setState({ dismissed: true })
    setTimeout(() => {
      this.refs.element.style.display = 'none'
      this.props.onClose && this.props.onClose()
    }, 300)
  }

  render () {
    const { children, className, onClose, type, ...others } = this.props
    const { dismissed } = this.state

    return (
      <div ref="element" {...others} className={
        classnames(
          Styles.alert,
          Styles[type],
          onClose && Styles.dismissible,
          dismissed && Styles.dismissed,
          className
        )}>
        <a className={Styles.close} onClick={this.handleClose} href="javascript:;">×</a>
        { children }
      </div>
    )
  }
}

Alert.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.string
}

Alert.defaultProps = {
  type: 'info'
}
