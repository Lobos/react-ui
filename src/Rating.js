import React, { Component, cloneElement } from 'react'
import classnames from 'classnames'
import FormItem from './higherOrders/FormItem'
import PropTypes from './utils/proptypes'

import Styles from './styles/_rating.scss'

let themes = {
  // "star": [Icon, Icon],
  // "heart": [img, img]
}

class Rating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hover: 0
    }
    this.handleLeave = this.handleLeave.bind(this)
  }

  handleHover (value) {
    this.setState({ hover: value })
  }

  handleLeave () {
    this.setState({ hover: 0 })
  }

  getMaxValue () {
    return parseInt(this.props.maxValue)
  }

  getIcon (pos = 0) {
    let icons = this.props.icons
    if (!icons) {
      let theme = this.props.theme || Object.keys(themes)[0]
      icons = themes[theme]
    }
    if (!icons) {
      console.warn('icons or theme not exist')
      return null
    }

    return icons[pos]
  }

  getBackground () {
    let items = []
    let icon = this.getIcon(0)
    let maxValue = this.getMaxValue()
    for (let i = 0; i < maxValue; i++) {
      items.push(cloneElement(icon, { key: i }))
    }

    return <div>{items}</div>
  }

  renderHandle () {
    let { value, onChange } = this.props
    let items = []
    let icon = this.getIcon(1)
    let hover = this.state.hover
    let maxValue = this.getMaxValue()

    value = parseInt(value)

    let [min, max] = [hover, value].sort((a, b) => a - b)

    for (let i = 0, state; i < maxValue; i++) {
      if (hover === 0) {
        state = value > i ? Styles.active : undefined
      } else {
        state = i < min ? Styles.active
          : i >= max ? undefined : Styles.half
      }

      items.push(
        <span key={i}
          style={{cursor: 'pointer'}}
          onMouseOver={this.handleHover.bind(this, i + 1)}
          onClick={onChange.bind(this, i + 1)}
          className={classnames(
            Styles.handle,
            state
          )}>
          {cloneElement(icon)}
        </span>
      )
    }

    return <div onMouseOut={this.handleLeave} className={Styles.front}>{items}</div>
  }

  renderMute () {
    let items = []
    let icon = this.getIcon(1)
    let width = (this.props.value / this.props.maxValue * 100) + '%'

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(cloneElement(icon, { key: i }))
    }

    return (
      <div style={{ width }} className={Styles.front}>
        <div className={Styles.inner}>
          {items}
        </div>
      </div>
    )
  }

  render () {
    let className = classnames(
      this.props.className,
      Styles.rating
    )
    return (
      <div style={this.props.style} className={className}>
        { this.getBackground() }
        { this.props.readOnly ? this.renderMute() : this.renderHandle() }
      </div>
    )
  }
}

Rating.propTypes = {
  className: PropTypes.string,
  icons: PropTypes.array,
  maxValue: PropTypes.number_string,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
  size: PropTypes.number,
  style: PropTypes.object,
  theme: PropTypes.string,
  value: PropTypes.number_string
}

Rating.defaultProps = {
  value: 0,
  maxValue: 5
}

export function registerTheme (key, icons) {
  themes[key] = icons
};

export default FormItem.register('rating', {}, Rating)

