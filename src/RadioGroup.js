"use strict"

import React from 'react'
import classnames from 'classnames'
import { toTextValue } from './utils/objects'
import Radio from './Radio'

class RadioGroup extends React.Component {
  static displayName = "RadioGroup"

  static propTypes = {
    className: React.PropTypes.string,
    data: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.func
    ]).isRequired,
    inline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    textTpl: React.PropTypes.string,
    value: React.PropTypes.any,
    valueTpl: React.PropTypes.string
  }

  static defaultProps = {
    textTpl: '{text}',
    valueTpl: '{id}'
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setValue(nextProps.value)
    }
    if (nextProps.data !== this.props.data) {
      this.setState({ data: this.formatData(nextProps.data) })
    }
  }

  state = {
    value: this.props.value,
    data: this.formatData(this.props.data)
  }

  formatData (data) {
    if (typeof data === 'function') {
      data.then(res => {
        this.setState({ data: this.formatData(res) })
      })()
      return []
    } else {
      return toTextValue(data, this.props.textTpl, this.props.valueTpl)
    }
  }

  setValue (value) {
    this.setState({ value: value })
  }

  getValue () {
    return this.state.value
  }

  handleChange (value) {
    if (this.props.readOnly) {
      return
    }

    this.setState({ value: value })
    let change = this.props.onChange
    if (change) {
      setTimeout(function () {
        change(value)
      }, 0)
    }
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-radio-group',
      { 'rct-inline': this.props.inline }
    )
    let items = this.state.data.map(function (item, i) {
      return (
        <Radio key={i}
          onClick={this.handleChange.bind(this)}
          readOnly={this.props.readOnly}
          checked={this.state.value === item.$value}
          text={item.$text}
          value={item.$value}
        />
      )
    }, this)

    return (
      <div style={this.props.style} className={className}>{items}</div>
    )
  }
}

export default RadioGroup

require('./FormControl').register(

  'radio-group',

  function (props) {
    return <RadioGroup {...props} />
  },

  RadioGroup

)
