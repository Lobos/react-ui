'use strict';

import { Component } from 'react';

module.exports = class extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    window.prettyPrint(null, this.refs.code);
  }

  render () {
    return (<div ref="code"><pre className="prettyprint">{this.props.children}</pre></div>);
  }
}
