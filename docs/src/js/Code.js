'use strict';

import { Component, PropTypes } from 'react';

const Code = class extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    window.prettyPrint(null, this.code);
  }

  render () {
    return (<div className="code" ref={(c) => this.code = c}><pre className="prettyprint">{this.props.children}</pre></div>);
  }
}

Code.propTypes = {
  children: PropTypes.any
};

module.exports = Code;
