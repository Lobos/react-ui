"use strict"

import React from 'react'
import classnames from 'classnames'
import { requireCss } from './themes'
requireCss('checkbox')

class Checkbox extends React.Component {
  static displayName = "Checkbox"

  static propTypes = {
    checked: React.PropTypes.bool,
    children: React.PropTypes.any,
    className: React.PropTypes.string,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    text: React.PropTypes.any,
    value: React.PropTypes.any
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.checked !== this.props.checked) {
      this.setState({ checked: nextProps.checked })
    }
  }

  state = {
    checked: !!this.props.checked
  }

  handleChange (event) {
    if (this.props.readOnly) {
      return
    }

    this.setState({ checked: event.target.checked })
    if (this.props.onChange) {
      this.props.onChange(event.target.checked, this.props.value, this.props.index)
    }
  }

  getValue () {
    return this.refs.input.checked ? (this.props.value || true) : false
  }

  setValue (value) {
    var checked = value === true || value === 1 || value === this.state.value
    this.setState({ checked: checked })
  }

  render () {
    return (
      <label style={this.props.style} className={ classnames(this.props.className, "rct-checkbox") }>
        <input ref="input"
          type="checkbox"
          disabled={this.props.readOnly}
          onChange={this.handleChange.bind(this)}
          checked={this.state.checked}
          value={this.props.value}
        />
        {this.props.text}
        {this.props.children}
      </label>
    )
  }
}

require('./FormControl').register(

  'checkbox',

  function (props) {
    return <Checkbox {...props} />
  },

  Checkbox
)

export default Checkbox
