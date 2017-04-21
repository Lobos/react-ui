import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { shallowEqual } from './utils/objects'

import Styles from './styles/_radio-checkbox.scss'

export default class Radio extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // empty function
    this.handleChange = () => {}
  }

  shouldComponentUpdate (nextProps) {
    return !shallowEqual(this.props, nextProps)
  }

  handleClick () {
    const { onClick, index, checkValue } = this.props
    if (onClick) {
      onClick(checkValue, true, index)
    }
  }

  render () {
    const { style, className, checked, block, readOnly, checkValue, text, children } = this.props

    let labelClass = classnames(
      className,
      Styles.radio,
      block ? Styles.block : Styles.inline,
      readOnly ? Styles.disabled : undefined,
      checked ? Styles.checked : undefined
    )

    return (
      <label style={style} className={labelClass}>
        <input ref="input"
          type="radio"
          disabled={readOnly}
          onChange={this.handleChange}
          onClick={this.handleClick}
          checked={checked}
          value={checkValue}
        />
        <span className={Styles.indicator} />
        <span>{text}</span>
        <span>{ children }</span>
      </label>
    )
  }
}

Radio.propTypes = {
  block: PropTypes.bool,
  checkValue: PropTypes.any,
  checked: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number,
  onClick: PropTypes.func,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  text: PropTypes.any,
  value: PropTypes.any
}
