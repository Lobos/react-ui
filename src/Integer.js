import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { getGrid } from './utils/grids'
import FormItem from './higherOrders/FormItem'
import { compose } from './utils/compose'

import _styles from './styles/_input.scss'

class Integer extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleAddDown = this.handleAddDown.bind(this)
    this.handleSubDown = this.handleSubDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.setTextElement = this.setTextElement.bind(this)
  }

  setTextElement (el) {
    this.textElement = el
  }

  handleChange (e) {
    const value = e.target.value
    if (/^[-+]?[0-9]*$/.test(value)) {
      this.handleValue(value || 0)
    }
  }

  handleFocus () {
    this.textElement.focus()
  }

  handleValue (val) {
    let value = parseInt(val, 10)
    if (isNaN(value)) value = min

    const { max, min } = this.props
    if (max !== undefined && value > max) value = max
    if (min !== undefined && value < min) value = min

    if (value !== this.props.value) {
      this.props.onChange(value)
    }
  }

  changeValue (mod) {
    let { value } = this.props
    value = parseInt(value, 10)
    this.handleValue(value + mod)
  }

  longPress (mod) {
    if (!this.hold) return
    setTimeout(() => {
      this.changeValue(mod)
      this.longPress(mod)
    }, 50)
  }

  handleAddDown () {
    this.hold = true
    this.changeValue(1)
    setTimeout(() => {
      this.longPress(1)
    }, 600)
  }

  handleSubDown () {
    this.hold = true
    this.changeValue(-1)
    setTimeout(() => {
      this.longPress(-1)
    }, 600)
  }

  handleKeyDown (e) {
    this.hold = true
    if (e.keyCode !== 38 && e.keyCode !== 40) return
    const mod = e.keyCode === 38 ? 1 : -1
    this.changeValue(mod)
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
    this.keyPressTimeOut = setTimeout(() => {
      this.longPress(mod)
    }, 600)
  }

  handleKeyUp () {
    this.hold = false
    if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
  }

  handleMouseUp () {
    this.hold = false
  }

  render () {
    const { className, grid, unit, value, style, size, autoFocus } = this.props

    const cls = classnames(
      className,
      getGrid(grid),
      _styles.integer,
      _styles.input,
      _styles[size]
    )

    return (
      <div className={cls} onMouseUp={this.handleFocus} style={style}>
        <div className={_styles.flex}>
          <input
            autoFocus={autoFocus}
            ref={this.setTextElement}
            type="text"
            onKeyDown={this.handleKeyDown}
            onKeyUp={this.handleKeyUp}
            onChange={this.handleChange}
            value={value}
          />
          <span>{unit}</span>
          <a
            className={_styles.up}
            href="javascript:;"
            onMouseDown={this.handleAddDown}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseUp}
          />
          <a
            className={_styles.down}
            href="javascript:;"
            onMouseDown={this.handleSubDown}
            onMouseUp={this.handleMouseUp}
            onMouseLeave={this.handleMouseUp}
          />
        </div>
      </div>
    )
  }
}

Integer.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  grid: PropTypes.grid,
  max: PropTypes.number,
  min: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.string,
  style: PropTypes.object,
  unit: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Integer.defaultProps = {
  autoFocus: false,
  max: undefined,
  min: undefined,
  size: 'middle',
  style: {},
  unit: '',
  value: undefined
}

export default compose(
  FormItem.register(['integer'], {})
)(Integer)
