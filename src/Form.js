'use strict'

import React from 'react'
import classnames from 'classnames'
import { forEach } from './utils/objects'
import FormControl from './FormControl'
import FormSubmit from './FormSubmit'

import { requireCss } from './themes'
requireCss('form')

export default class Form extends React.Component {
  static displayName = 'Form'

  static propTypes = {
    beforeSubmit: React.PropTypes.func,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.func
    ]).isRequired,
    hintType: React.PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
    layout: React.PropTypes.oneOf(['aligned', 'stacked', 'inline']),
    onSubmit: React.PropTypes.func,
    style: React.PropTypes.object
  }

  static defaultProps = {
    data: {},
    layout: 'inline'
  }

  componentWillMount () {
    this.fetchData(this.props.data)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== this.props.data) {
      this.fetchData(nextProps.data)
    }
  }

  state = {
    locked: false,
    data: {}
  }

  fetchData (data) {
    if (typeof data === 'function') {
      data.then(res => {
        this.fetchData(res)
      })()
      return
    }
    this.setState({ data })
    this.setData(data)
  }

  getValue () {
    let data = this.state.data
    forEach(this.refs, (ref, k) => {
      if (!ref.props.ignore) {
        data[k] = ref.getValue()
      }
    })
    return data
  }

  setValue (key, value) {
    let data = this.state.data
    data[key] = value
    this.setState({ data })
  }

  setData (data) {
    forEach(this.refs, (ref, k) => {
      ref.setValue(data[k])
    })
  }

  equalValidate (targetRef, equalRef) {
    let self = this
    return function () {
      let target = self.refs[targetRef]
      if (!target) {
        console.warn(`equal target '${targetRef}' not existed`)
        return false
      }
      let equal = self.refs[equalRef]
      return target.getValue() === equal.getValue()
    }
  }

  renderChildren () {
    return React.Children.map(this.props.children, child => {
      let props = {
        hintType: child.props.hintType || this.props.hintType,
        readOnly: child.props.readOnly || this.state.locked,
        layout: this.props.layout
      }
      if (child.type === FormControl) {
        if (!child.props.name) {
          console.warn('FormControl must have a name!')
          return null
        }
        props.ref = child.props.name
        props.value = this.state.data[child.props.name]
        if (child.props.equal) {
          props.onValidate = this.equalValidate(child.props.equal, child.props.name)
        }
      } else if (child.type === FormSubmit) {
        props.locked = this.state.locked
      }

      child = React.cloneElement(child, props)
      return child
    })
  }

  getReference (name) {
    return this.refs[name]
  }

  validate () {
    let success = true
    forEach(this.refs, function (child) {
      if (child.props.ignore) {
        return
      }
      let suc = child.validate()
      success = success && suc
    })
    return success
  }

  handleSubmit (event) {
    if (this.state.locked) {
      return
    }

    event.preventDefault()
    this.onSubmit()
  }

  onSubmit () {
    this.setState({ locked: true })

    let success = this.validate()
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit()
    }

    if (!success) {
      this.setState({ locked: false })
      return
    }

    if (this.props.onSubmit) {
      this.props.onSubmit(this.getValue())
      this.setState({ locked: false })
    }
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-form',
      {
        'rct-form-aligned': this.props.layout === 'aligned',
        'rct-form-inline': this.props.layout === 'inline',
        'rct-form-stacked': this.props.layout === 'stacked'
      }
    )

    return (
      <form onSubmit={this.handleSubmit.bind(this)} style={this.props.style} className={className}>
        {this.renderChildren()}
      </form>
    )
  }
}
