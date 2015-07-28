'use strict'

require('../../less/input.less')

import React from 'react'
import classnames from 'classnames'
import getGrid from '../higherorder/grid'

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

  state = {
    value: this.props.value
  }

  getValue () {
    return React.findDOMNode(this).value
  }

  setValue (value) {
    this.setState({ value })
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return
    }

    let value = event.target.value
    this.setState({ value: value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    let type = this.props.type === 'password' ? 'password' : 'text'
    let props = {
      className: classnames('form-control', this.getGrid()),
      onChange: this.handleChange.bind(this),
      type: type,
      value: this.state.value
    }

    if (this.props.type === 'textarea') {
      return (<textarea {...this.props} {...props} rows={this.props.rows} />)
    } else {
      return (<input {...this.props} {...props} />)
    }
  }
}

export default Input

import FormControl from './formControl.jsx'

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
