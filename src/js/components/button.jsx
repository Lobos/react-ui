"use strict"

require('../../less/button.less')
import React from 'react'
import classnames from 'classnames'
import getGrid from '../higherorder/grid'

class Button extends React.Component {
  static displayName = 'Button'

  static propTypes = {
    children: React.PropTypes.any,
    disabled: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    once: React.PropTypes.bool,
    status: React.PropTypes.string,
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
      status = `button-${status}`
    }

    let className = classnames(
      this.getGrid(),
      'pure-button',
      status,
      { 'pure-button-primary': status === 'button-primary' },
      'button-extend'
    )

    return (
      <button onClick={this.handleClick.bind(this)}
        disabled={this.state.disabled}
        className={className}
        type={this.props.type || "button"}>
        { this.state.show || this.props.children }
      </button>
    )
  }
}

export default getGrid(Button)

