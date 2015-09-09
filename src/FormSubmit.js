'use strict'

import React from 'react'
import Button from './Button'

export default class FormSubmit extends React.Component {
  static displayName = 'FormSubmit'

  static propTypes = {
    children: React.PropTypes.any,
    locked: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    style: React.PropTypes.object
  }

  render () {
    let children = this.props.children
    let content
    if (Array.isArray(children)) {
      content = this.props.locked ? children[1] : children[0]
    } else {
      content = children
    }

    return (
      <div style={this.props.style} className="rct-control-group">
        <Button type="submit"
          status='primary'
          onClick={this.props.onClick}
          disabled={this.props.locked}>
          {content}
        </Button>
      </div>
    )
  }
}

