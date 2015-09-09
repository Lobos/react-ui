"use strict"

import React from 'react'
import classnames from 'classnames'

import { requireCss } from './themes'
requireCss('rating')

let themes = {
  // "star": [Icon, Icon],
  // "heart": [img, img]
}

class Rating extends React.Component {
  static displayName = 'Rating'

  static propTypes = {
    className: React.PropTypes.string,
    icons: React.PropTypes.array,
    maxValue: React.PropTypes.number,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    theme: React.PropTypes.string,
    value: React.PropTypes.number
  }

  static defaultProps = {
    maxValue: 5
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value)
    }
  }

  state = {
    value: this.props.value,
    hover: 0,
    wink: false
  }

  handleHover (value) {
    return function () {
      this.setState({ hover: value })
    }.bind(this)
  }

  handleLeave () {
    this.setState({ hover: 0 })
  }

  setValue (value) {
    this.setState({ value })
  }

  getValue () {
    return this.state.value
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
    let items = [],
        icon = this.getIcon(0)
    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(React.cloneElement(icon, { key: i }))
    }

    return <div className="rct-rating-bg">{items}</div>
  }

  handleChange (val) {
    this.setValue(val)
    this.setState({ wink: true })
    setTimeout(() => {
      this.setState({ wink: false })
    }, 1000)
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(val)
      }
    })
  }

  getHandle () {
    let items = [],
        icon = this.getIcon(1),
        hover = this.state.hover,
        wink = this.state.wink,
        value = hover > 0 ? hover : this.state.value

    for (let i = 0, active; i < this.props.maxValue; i++) {
      active = value > i
      items.push(
        <span key={i}
          style={{cursor: 'pointer'}}
          onMouseOver={this.handleHover(i + 1)}
          onClick={this.handleChange.bind(this, i + 1)}
          className={classnames('rct-rating-handle', { 'active': active, 'wink': active && wink })}>
          {React.cloneElement(icon)}
        </span>
      )
    }

    return <div onMouseOut={this.handleLeave.bind(this)} className="rct-rating-front">{items}</div>
  }

  getMute () {
    let items = [],
        icon = this.getIcon(1),
        width = (this.state.value / this.props.maxValue * 100) + '%'

    for (let i = 0; i < this.props.maxValue; i++) {
      items.push(React.cloneElement(icon, { key: i }))
    }

    return (
      <div style={{ width: width }} className="rct-rating-front">
        <div className="rct-rating-inner">
          {items}
        </div>
      </div>
    )
  }

  render () {
    let className = classnames(
      this.props.className,
      "rct-rating"
    )
    return (
      <div style={this.props.style} className={className}>
        { this.getBackground() }
        { this.props.readOnly ? this.getMute() : this.getHandle() }
      </div>
    )
  }
}

Rating.register = function (key, icons) {
  themes[key] = icons
}

export default Rating

require('./FormControl').register(

  'rating',

  function (props) {
    return <Rating {...props} />
  },

  Rating

)
