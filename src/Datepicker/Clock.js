'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

const poslist = require('../utils/circle').getPositions(12, 50, -90);

class Clock extends Component {
  constructor (props) {
    super(props);
    this.state = {
      current: props.current,
      stage: props.stage || 'clock',
      active: props.active,
      am: props.current.getHours() < 12
    };
    this.close = this.close.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({ current: nextProps.current, am: nextProps.current.getHours() < 12 });
    }
  }

  changeTimeStage (stage) {
    this.setState({ stage, active: true });
  }

  setValue (value) {
    let d = {};
    d[this.state.stage] = value;
    this.props.onTimeChange(d);
  }

  close () {
    if (!this.props.timeOnly) {
      this.setState({ active: false });
    }
  }

  getRotate (type) {
    let current = this.state.current,
        value,
        max = type === 'hour' ? 12 : 60;

    switch (type) {
      case 'hour':
        value = current.getHours() + current.getMinutes() / 60;
        break;
      case 'minute':
        value = current.getMinutes() + current.getSeconds() / 60;
        break;
      case 'second':
        value = current.getSeconds();
        break;
    }

    value = value * 360 / max - 90;
    return 'rotate(' + value + 'deg)';
  }

  renderPointer () {
    let stage = this.state.stage;

    let pointer = function (type, context) {
      let rotate = context.getRotate(type);
      return (
        <div style={{transform: rotate, WebkitTransform: rotate }} className={classnames(type, {active: stage === type})}></div>
      );
    };

    return (
      <div className="pointer">
        {pointer('hour', this)}
        {pointer('minute', this)}
        {pointer('second', this)}
      </div>
    );
  }

  render () {
    let steps = [],
        //current = this.state.current,
        stage = this.state.stage,
        step = (stage === 'hour' || stage === 'clock') ? 1 : 5;

    for (let i = 0, s; i < 12; i++) {
      s = i * step;
      if (!this.state.am && stage === 'hour') {
        s += 12;
      }
      steps.push(s);
    }

    let sets = steps.map(function (s, i) {
      let pos = poslist[i],
          left = pos[0] + '%',
          top = pos[1] + '%';
      return (
        <div onClick={() => { this.setValue(s); }} className={classnames('clock-set')} key={i} style={{left, top}}>{s}</div>
      );
    }, this);

    let className = classnames('clock-wrapper', { active: this.state.active });

    return (
      <div className={className}>
        <div onClick={this.close} className="clock-overlay" />
        {!this.props.timeOnly && <div onClick={this.close} className="clock-close"><i className="icon close" /></div>}
        <div className="clock">
          <div className="clock-inner">
            {sets}
          </div>
          {this.renderPointer()}
          {stage === 'hour' && <div>
            <div onClick={() => { this.setState({ am: true }); }} className={classnames('time-am', { active: this.state.am })}>AM</div>
            <div onClick={() => { this.setState({ am: false }); }} className={classnames('time-pm', { active: !this.state.am })}>PM</div>
          </div>}
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  active: PropTypes.bool,
  current: PropTypes.instanceOf(Date),
  onTimeChange: PropTypes.func,
  stage: PropTypes.string,
  timeOnly: PropTypes.bool
};

export default Clock;
