import React, { Component } from 'react'
import PropTypes from '../../utils/proptypes'

export default class Button extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    const { onClick } = this.props
    const { getEditor, Quill } = this.context
    onClick && onClick(getEditor(), Quill)
  }

  render () {
    const { children, className } = this.props
    return (
      <button className={className} type="button" onClick={this.handleClick}>
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.func
}

Button.contextTypes = {
  getEditor: PropTypes.func,
  Quill: PropTypes.func
}
