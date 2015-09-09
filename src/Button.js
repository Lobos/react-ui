"use strict"

import React from 'react'
import classnames from 'classnames'
import getGrid from './higherorder/grid'
import { requireCss } from './themes'
requireCss('buttons')

@getGrid
class Button extends React.Component {
  static displayName = 'Button'

  static propTypes = {
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    once: React.PropTypes.bool,
    status: React.PropTypes.string,
    style: React.PropTypes.object,
    type: React.PropTypes.oneOf(['submit', 'button'])
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.setState({ disabled: nextProps.disabled })
    }
  }

  state = {
    disabled: this.props.disabled,
    show: null
  }

  disable(elem) {
    this.setState({ disabled: true, show: elem })
  }

  enable(elem) {
    this.setState({ disabled: false, show: elem })
  }

  handleClick() {
    if (this.props.onClick) {
      this.props.onClick()
    }
    if (this.props.once) {
      this.disable()
    }
  }

  render() {
    let status = this.props.status
    if (status) {
      status = `rct-button-${status}`
    }

    const className = classnames(
      this.props.className,
      this.getGrid(),
      'rct-button',
      status
    )

    return (
      <button onClick={this.handleClick.bind(this)}
        style={this.props.style}
        disabled={this.state.disabled}
        className={className}
        type={this.props.type || "button"}>
        { this.state.show || this.props.children }
      </button>
    )
  }
}

export default Button

