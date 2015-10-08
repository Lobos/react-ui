'use strict'

import React from 'react'
import ReactDOM from 'react-dom'

export default function prettify (Component) {
  class Prettify extends React.Component {
    static displayName = 'Prettify'

    static propTypes = {
      children: React.PropTypes.array
    }

    componentDidMount () {
      window.prettyPrint(null, ReactDOM.findDOMNode(this.refs.component))
    }

    render () {
      return (
        <Component ref="component">
          {this.props.children}
        </Component>
      )
    }
  }

  return Prettify
}
