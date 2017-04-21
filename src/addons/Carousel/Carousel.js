import React, { Component, Children } from 'react'
import PropTypes from '../../utils/proptypes'
import classnames from 'classnames'
import objectAssign from 'object-assign'
import { range } from '../../utils/numbers'
import Item from './Item'

import _styles from '../../styles/_carousel.scss'

class Carousel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      direction: 'stop',
      pre: 0
    }
  }

  componentWillMount () {
    this.setNext(1)
  }

  componentWillUnmount () {
    if (this._timeout) clearTimeout(this._timeout)
  }

  moveTo (next) {
    if (next === current) return

    const { current } = this.state
    let direction = next > current ? 'forward' : 'backward'
    if (next >= this.count) {
      direction = 'forward'
      next = 0
    }

    this.setState({ pre: current, current: next, direction })

    this.setNext(next + 1)
  }

  setNext (next) {
    const { interval } = this.props
    if (interval && interval > 0) {
      if (this._timeout) clearTimeout(this._timeout)
      this._timeout = setTimeout(() => {
        this.moveTo(next)
      }, interval)
    }
  }

  renderItems () {
    const { current, pre } = this.state
    return Children.toArray(this.props.children).map((child, i) => {
      return (
        <Item key={i}
         current={i === current}
         pre={i === pre && pre !== current}
        >{child}</Item>
      )
    })
  }

  renderIndicator () {
    let indicator = objectAssign({
      position: 'center',
      type: 'circle'
    }, this.props.indicator)

    let className = classnames(
      _styles['carousel-indicator'],
      _styles[`carousel-indicator-${indicator.position}`],
      _styles[`carousel-indicator-${indicator.type}`]
    )

    let inds = range(this.count).map(i => (
      <a key={i} href="javascript:;"
        onClick={this.moveTo.bind(this, i)}
        className={this.state.current === i ? _styles['carousel-indicator-active'] : ''}>
        {indicator.type === 'number' ? i + 1 : ''}
      </a>
    ))
    return <div className={className}>{inds}</div>
  }

  render () {
    // child count
    this.count = Children.toArray(this.props.children).length

    const { style, animation } = this.props
    const { direction } = this.state

    let className = classnames(
      this.props.className,
      _styles.carousel,
      _styles[`carousel-${animation}`],
      _styles[`carousel-${direction}`]
    )

    return (
      <div className={className} style={style}>
        {this.renderItems()}
        {this.renderIndicator()}
      </div>
    )
  }
}

Carousel.propTypes = {
  animation: PropTypes.oneOf(['slide', 'fade']),
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element
  ]),
  className: PropTypes.string,
  indicator: PropTypes.shape({
    position: PropTypes.oneOf(['left', 'center', 'right']),
    type: PropTypes.oneOf(['number', 'circle'])
  }),
  interval: PropTypes.number,
  style: PropTypes.object
}

Carousel.defaultProps = {
  animation: 'slide'
}

export default Carousel
