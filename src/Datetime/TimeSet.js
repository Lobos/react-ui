"use strict";

import { Component, PropTypes } from 'react';

class TimeSet extends Component {
  constructor (props) {
    super(props);
    this.state = {
      value: this.props.value || 0,
      type: this.props.type
    };
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
    this.setState({ value });
    let d = {};
    d[this.props.type] = value;
    this.props.onTimeChange(d);
  }

  setValue (value) {
    this.setState({ value });
  }

  changeStage () {
    this.props.onStageChange(this.props.type);
  }

  render () {
    return (
      <div onClick={this.changeStage.bind(this)} className="time-set">
        <div className="text">
          <span>{this.state.value}</span>
          <a onClick={this.add.bind(this)} className="add"><i className="icon angle-up" /></a>
          <a onClick={this.sub.bind(this)} className="sub"><i className="icon angle-down" /></a>
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
