'use strict'

require('../../less/form.less')

import React from 'react'
import classnames from 'classnames'
import { forEach } from '../utils/objects'
import FormControl from './formControl.jsx'

export default class Form extends React.Component {
  static displayName = 'Form'

  static propTypes = {
    action: React.PropTypes.string,
    autoload: React.PropTypes.bool,
    beforeSubmit: React.PropTypes.func,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.func
    ]),
    hintType: React.PropTypes.oneOf(['block', 'none', 'pop', 'inline']),
    layout: React.PropTypes.oneOf(['aligned', 'stacked', 'inline']),
    onSubmit: React.PropTypes.func
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
      data(res => {
        this.fetchData(res)
      })
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
      }

      child = React.addons.cloneWithProps(child, props)
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

  /*
  handleSubmit: function (event) {
    if (this.state.locked) {
      return
    }

    event.preventDefault()

    this.setState({ locked: true })

    let success = this.validate()
    if (success && this.props.beforeSubmit) {
      success = this.props.beforeSubmit()
    }

    if (!success) {
      this.setState({ locked: false })
      return
    }

    let data = this.getValue()
    Qwest.post(this.props.action, data, { dataType: this.props.dataType })
    .then(res => {
      if (res.status === 1) {
        if (this.props.onSubmit) {
          this.props.onSubmit(res)
        }
        if (res.msg) {
          Message.show(res.msg, 'success')
        }
      } else {
        Message.show(res.msg || Lang.get('request.empty'), 'warning')
      }
    })
    .catch(e => {
      Message.show(Lang.get('request.failure') + ' ' + e, 'error')
    })
    .complete(() => {
      this.setState({ locked: false })
    })
  },
  */

  render () {
    let className = classnames(
      this.props.className,
      'pure-form',
      {
        'pure-form-aligned': this.props.layout === 'aligned',
        'pure-form-inline': this.props.layout === 'inline',
        'pure-form-stacked': this.props.layout === 'stacked'
      }
    )

    return (
      <form onSubmit={this.handleSubmit} className={className}>
        {this.renderChildren()}
      </form>
    )
  }
}
