'use strict'

import { Component } from 'react'
import { findDOMNode } from 'react-dom'

class Code extends Component {
  componentDidMount () {
    window.prettyPrint(null, findDOMNode(this.code))
  }

  render () {
    let lines = this.props.children.split('\n').filter(l => l.length > 0)
    const length = lines[0] ? /^(\s*)/.exec(lines[0])[1].length : 0
    const reg = new RegExp('^(\\s{' + length + '})')
    lines = lines.map(line => line.replace(reg, ''))

    return (
      <div className="code">
        <pre className="prettyprint linenums">
          {lines.join('\n')}
        </pre>
      </div>
    )
  }
};

Code.defaultProps = {
  children: ''
}

export default Code
