'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

module.exports = function prettify (Component) {
  class Prettify extends React.Component {
    constructor (props) {
      super(props);
    }

    componentDidMount () {
      window.prettyPrint(null, ReactDOM.findDOMNode(this.refs.component));
    }

    render () {
      return (
        <Component ref="component">
          {this.props.children}
        </Component>
      );
    }
  }

  Prettify.propTypes = {
    children: React.PropTypes.any
  };

  return Prettify;
};
