"use strict"

import React from 'react'

import { requireCss } from './themes'
requireCss('checkbox')

export default class Radio extends React.Component {
  static displayName = "Radio"

  static propTypes = {
    checked: React.PropTypes.bool,
    index: React.PropTypes.number,
    onClick: React.PropTypes.func,
    readOnly: React.PropTypes.bool,
    style: React.PropTypes.object,
    text: React.PropTypes.any,
    value: React.PropTypes.any
  }

  handleClick () {
    if (this.props.onClick) {
      this.props.onClick(this.props.value, this.props.index)
    }
  }

  render () {
    return (
      <label style={this.props.style} className="rct-radio">
        <input ref="input"
          type="radio"
          disabled={this.props.readOnly}
          onChange={() => {}}
          onClick={this.handleClick.bind(this)}
          checked={this.props.checked}
          value={this.props.value}
        />
        <span>{this.props.text}</span>
      </label>
    )
  }
}
