'use strict';

import React, { PropTypes } from 'react';
import { shallowEqual } from '../utils/objects';
import Datepicker from './index';

class Pair extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(nextProps, this.props) || !shallowEqual(this.state, nextState);
  }

  render () {
    const { names, min, max, con, ...other } = this.props;
    return (
      <div>
        <Datepicker min={min} name={names[0]} {...other}
          max={this.state.second}
          onChange={(first) => this.setState({ first })}
        />
        {con}
        <Datepicker max={max} name={names[1]} {...other}
          min={this.state.first}
          onChange={(second) => this.setState({ second })}
        />
      </div>
    );
  }
};

Pair.isFormItem = true;

Pair.propTypes = {
  con: PropTypes.any,
  max: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  min: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  names: PropTypes.array
};

Pair.defaultProps = {
  con: '-',
  names: []
}

module.exports = Pair;
