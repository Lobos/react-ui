'use strict'

import React from 'react'
import classnames from 'classnames'
import Regs from './utils/regs'
import getGrid from './higherorder/grid'

import { requireCss } from './themes'
requireCss('input')
requireCss('form-control')

@getGrid
class Input extends React.Component {
  static displayName = 'Input'

  static propTypes = {
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    rows: React.PropTypes.number,
    style: React.PropTypes.object,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value)
    }
  }

  state = {
    value: this.props.value
  }

  getValue () {
    return this.refs.input.value
  }

  setValue (value) {
    this.setState({ value })
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return
    }

    let value = event.target.value

    if (value && (this.props.type === 'integer' || this.props.type === 'number')) {
      if (!Regs[this.props.type].test(value)) {
        value = this.state.value || ''
      }
    }

    this.setState({ value: value })
    setTimeout(() => {
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    }, 0)
  }

  render () {
    const props = {
      className: classnames(
        this.props.className,
        'rct-form-control',
        this.getGrid()
      ),
      onChange: this.handleChange.bind(this),
      type: this.props.type === 'password' ? 'password' : 'text',
      value: this.state.value
    }

    if (this.props.type === 'textarea') {
      return (<textarea ref="input" {...this.props} {...props} rows={this.props.rows} />)
    } else {
      return (<input ref="input" {...this.props} {...props} />)
    }
  }
}

export default Input

import FormControl from './FormControl'

FormControl.register(

  ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'textarea'],

  function (props) {
    return <Input {...props} />
  },

  Input

)

FormControl.register(

  ['integer', 'number'],

  function (props) {
    return <Input {...props} />
  },

  Input,

  'number'

)
