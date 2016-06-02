'use strict'

import { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'

class Code extends Component {
  componentDidMount () {
    window.prettyPrint(null, findDOMNode(this.code))
  }

  render () {
    return (
      <div className="code">
        <pre className="prettyprint">
          {this.props.children}
        </pre>
      </div>
    )
  }
};

Code.propTypes = {
  children: PropTypes.any
}

export default Code
