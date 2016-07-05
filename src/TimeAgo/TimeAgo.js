'use strict'

import React, { Component, PropTypes } from 'react'
// import classnames from 'classnames'

// import Styles from './styles/_alert.scss'

export default class TimeAgo extends Component {
  constructor (props) {
    super(props)

  // this.state = { dismissed: false }
  }

  //   handleClose () {
  //     this.setState({ dismissed: true })
  //     setTimeout(() => {
  //       this.refs.element.style.display = 'none'
  //       this.props.onClose && this.props.onClose()
  //     }, 300)
  //   }

  render () {
    const { children, className, base } = this.props
    // const { dismissed } = this.state

    return (
    <div className={className}>
      {children}
      <a>
        {base.toString()}
      </a>
    </div>
    )
  }
}

TimeAgo.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  base: PropTypes.object
}

TimeAgo.defaultProps = {
  base: new Date()
}
