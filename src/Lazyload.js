import React, { Component, Children } from 'react'
import PropTypes from './utils/proptypes'
import { addStack, removeStack } from './utils/lazyload'

export default class Lazyload extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isRender: false
    }
  }

  componentDidMount () {
    this._lazyId = addStack(this)
  }

  componentWillUnmount () {
    removeStack(this._lazyId)
  }

  markToRender () {
    this.setState({ isRender: true })
  }

  render () {
    const { isRender } = this.state
    const { children, placeholder } = this.props

    if (!isRender) return placeholder

    if (Array.isArray(children)) {
      return <div>{children}</div>
    } else {
      return Children.only(children)
    }
  }
}

Lazyload.propTypes = {
  children: PropTypes.any.isRequired,
  placeholder: PropTypes.element.isRequired
}
