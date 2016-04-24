'use strict';

import React, { Component, PropTypes } from 'react';

class TimeSet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: props.value || 0,
      type: props.type
    };
    this.changeStage = this.changeStage.bind(this);
    this.add = this.add.bind(this);
    this.sub = this.sub.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
  }

  add () {
    let value = this.state.value,
        max = this.props.type === 'hour' ? 24 : 60;
    value += 1;
    if (value >= max) {
      value = 0;
    }
    this.changeTime(value);
  }

  sub () {
    let value = this.state.value,
        max = this.props.type === 'hour' ? 23 : 59;
    value -= 1;
    if (value < 0) {
      value = max;
    }
    this.changeTime(value);
  }

  changeTime (value) {
    let d = {};
    d[this.props.type] = value;
    let success = this.props.onTimeChange(d);
    if (!success) {
      return;
    }
    this.setState({ value });
  }

  setValue (value) {
    this.setState({ value });
  }

  changeStage () {
    this.props.onStageChange(this.props.type);
  }

  render () {
    return (
      <div onClick={this.changeStage} className="time-set">
        <div className="text">
          <span>{this.state.value}</span>
          <a onClick={this.add} className="add"><i className="icon angle-up" /></a>
          <a onClick={this.sub} className="sub"><i className="icon angle-down" /></a>
        </div>
      </div>
    );
  }
}

TimeSet.propTypes = {
  onStageChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.number
};

export default TimeSet;
