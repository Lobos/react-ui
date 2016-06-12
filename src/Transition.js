'use strict'

import React, { PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
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
    let el = this.element
    el.style.display = ''
    setTimeout(() => {
      addClass(el, 'enter')
      removeClass(el, 'leave')
    }, 10)
  }

  leave () {
    let el = this.element
    addClass(el, 'leave')
    removeClass(el, 'enter')
    setTimeout(() => {
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
  tf: PropTypes.string
}

Transition.defaultProps = {
  duration: 400,
  tf: ''
}
