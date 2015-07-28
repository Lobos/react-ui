'use strict'

import React from 'react'
import Button from './button.jsx'

export default class FormSubmit extends React.Component {
  static displayName = 'FormSubmit'

  static propTypes = {
    children: React.PropTypes.any,
    locked: React.PropTypes.bool,
    onClick: React.PropTypes.func
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
      <div className="pure-control-group">
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

