import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import Alert from '../Alert'

import Styles from '../styles/_message.scss'

export default class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      duration: props.duration
    }
    this.dismiss = this.dismiss.bind(this)
    this.handleMouseOver = this.handleMouseOver.bind(this)
  }

  componentDidMount () {
    const { duration } = this.props
    if (duration > 0) {
      this.timeout = setTimeout(this.dismiss, duration * 1000)
    }
  }

  dismiss () {
    this.props.onClose(this.props.id)
  }

  handleMouseOver () {
    clearTimeout(this.timeout)
    this.setState({ duration: 0 })
  }

  render () {
    const { content, ...props } = this.props
    const { duration } = this.state

    delete props.duration

    return (
      <Alert {...props}
        onClose={duration <= 0 ? this.dismiss : undefined}
        onMouseOver={this.handleMouseOver}
        className={Styles.message}>
        {content}
        { duration > 0 && <div style={{ animationDuration: `${duration}s` }} className={Styles.countdown} /> }
      </Alert>
    )
  }
}

Message.propTypes = {
  content: PropTypes.any,
  duration: PropTypes.number,
  id: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.string
}
