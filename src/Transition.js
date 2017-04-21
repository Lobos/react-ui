import React, { cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from './utils/proptypes'
import { addClass, removeClass } from './utils/dom'

export default class Transition extends React.Component {
  componentDidMount () {
    this.element = findDOMNode(this)
    this.element.display = 'none'
    this.action(this.props.act)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.act !== this.props.act) {
      this.action(nextProps.act)
    }
  }

  action (act) {
    switch (act) {
      case 'enter':
        this.enter()
        break
      case 'leave':
        this.leave()
        break
    }
  }

  enter () {
    if (this.leaving) {
      clearTimeout(this.leaving)
    }

    const { enter, leave } = this.props
    let el = this.element
    el.style.display = ''
    setTimeout(() => {
      addClass(el, enter)
      removeClass(el, leave)
    }, 10)
  }

  leave () {
    const { enter, leave } = this.props
    let el = this.element
    addClass(el, leave)
    removeClass(el, enter)
    this.leaving = setTimeout(() => {
      el.style.display = 'none'
    }, this.props.duration)
  }

  render () {
    const { children, tf, duration } = this.props
    let style = {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: tf
    }

    return cloneElement(children, {style})
  }
}

Transition.propTypes = {
  act: PropTypes.oneOf(['enter', 'leave']),
  children: PropTypes.element,
  duration: PropTypes.number,
  enter: PropTypes.string,
  leave: PropTypes.string,
  tf: PropTypes.string
}

Transition.defaultProps = {
  duration: 400,
  tf: ''
}
