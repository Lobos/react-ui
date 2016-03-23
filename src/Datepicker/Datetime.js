'use strict';

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { overView, getOuterHeight } from '../utils/dom';
import * as datetime from '../utils/datetime';
import ClickAway from '../mixins/ClickAway';
import TimeSet from './TimeSet';
import Clock from './Clock';

import { requireCss } from '../themes';
requireCss('datetime');

import { getLang, setLang } from '../lang';
setLang('datetime');

const DATETIME = 'datetime';
const DATE = 'date';
const TIME = 'time';

class Datetime extends ClickAway(Component) {
  constructor (props) {
    super(props);

    let value = props.value;

    this.state = {
      active: false,
      popup: false,
      stage: props.type === TIME ? 'clock' : 'day',
      current: datetime.convert(value, new Date()),
      value: datetime.convert(value, null)
    };

    this.timeChange = this.timeChange.bind(this);
    this.timeStageChange = this.timeStageChange.bind(this);
    this.pre = this.pre.bind(this);
    this.next = this.next.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentWillMount () {
    this.setMinMax(this.props);
    if (this.props.timeOnly || this.props.dateOnly) {
      console.warn('timeOnly and dateOnly is deprecated, use type="date|time" instead.');
    }
  }

  componentDidMount () {
    this.registerClickAway(this.close, this.refs.datepicker);
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: datetime.convert(nextProps.value) });
    }
    this.setMinMax(nextProps);
  }

  setMinMax (props) {
    let zero = new Date(0),
        min = datetime.convert(props.min, zero).getTime(),
        max = datetime.convert(props.max, zero).getTime();
    this.setState({ min, max });
  }

  getValue () {
    let value = this.state.value;
    if (!value) {
      return null;
    }

    // if dateOnly, remove time
    if (this.props.type === DATE) {
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (this.props.unixtime) {
      // cut milliseconds
      return Math.ceil(value.getTime());
    } else {
      return this.formatValue(value);
    }
  }

  setValue (value) {
    value = datetime.convert(value, null);
    this.setState({ value });
  }

  formatValue (value) {
    if (this.props.format) {
      return datetime.format(value, this.props.format);
    }

    let format = datetime.getDatetime;
    if (this.props.type === DATE) {
      format = datetime.getDate;
    } else if (this.props.type === TIME) {
      format = datetime.getTime;
    }
    return format(value);
  }

  open () {
    if (this.props.readOnly || this.state.active) {
      return;
    }

    let today = new Date();
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let picker = this.refs.datepicker;
    picker.style.display = 'block';
    let height = getOuterHeight(picker);

    setTimeout(() => {
      this.setState({
        active: true,
        popup: overView(this.refs.datetime, height),
        current: this.state.value || today,
        stage: this.props.type === TIME ? 'clock' : 'day'
      });

      this.bindClickAway();

      if (this.props.type === TIME) {
        this.refs.clock.changeTimeStage('hour');
      }
    }, 0);
  }

  close () {
    this.setState({ active: false });
    this.unbindClickAway();
    if (this.refs.clock) {
      this.refs.clock.close();
    }
    setTimeout(() => {
      if (this.state.active === false) {
        this.refs.datepicker.style.display = 'none';
      }
    }, 500);
  }

  changeDate (obj) {
    let c = this.state.current,
        year = obj.year === undefined ? c.getFullYear() : obj.year,
        month = obj.month === undefined ? c.getMonth() : obj.month,
        day = obj.day === undefined ? c.getDate() : obj.day,
        hour = obj.hour === undefined ? c.getHours() : obj.hour,
        minute = obj.minute === undefined ? c.getMinutes() : obj.minute,
        second = obj.second === undefined ? c.getSeconds() : obj.second;

    let d = new Date(year, month, day, hour, minute, second);
    return d;
  }

  stateChange (state, pop) {
    // setTimeout wait checkClickAway completed
    setTimeout(() => {
      this.setState(state);
      if (pop && this.props.onChange) {
        this.props.onChange(this.getValue());
      }
    }, 0);
  }

  stageChange (stage) {
    this.stateChange({ stage });
  }

  yearChange (year) {
    let d = this.changeDate({ year, day: 1 });
    this.stateChange({ stage: 'month', current: d });
  }

  monthChange (month) {
    let d = this.changeDate({ month, day: 1 });
    this.stateChange({ stage: 'day', current: d });
  }

  dayChange (day) {
    let d = this.changeDate({
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate()
    });
    this.stateChange({ value: d, current: d }, true);
    if (this.props.type === DATE) {
      this.close();
    }
  }

  timeChange (time) {
    let d = this.changeDate(time),
        timestamp = d.getTime();
    let { min, max } = this.state;

    let valid = true;
    if (min > 0) {
      valid = timestamp >= min;
    }
    if (valid && max > 0) {
      valid = timestamp <= max;
    }

    if (valid) {
      this.stateChange({ value: d, current: d }, true);
      return true;
    }

    return false;
  }

  getTime () {
    let current = this.state.current;

    return (
      <div className="time-container">
        <Clock current={current} timeOnly={this.props.type === TIME} onTimeChange={this.timeChange} ref="clock" />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="hour" value={current.getHours()} />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="minute" value={current.getMinutes()} />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="second" value={current.getSeconds()} />
      </div>
    );
  }

  next (stage) {
    let d = this.state.current;
    switch (stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() + 18, day: 1 });
        break;
      case 'month':
        d = this.changeDate({ year: d.getFullYear() + 1, day: 1 });
        break;
      case 'day':
        d = this.changeDate({ month: d.getMonth() + 1, day: 1 });
        break;
    }
    this.stateChange({ current: d });
  }

  pre (stage) {
    let d = this.state.current;
    switch (stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() - 18, day: 1 });
        break;
      case 'month':
        d = this.changeDate({ year: d.getFullYear() - 1, day: 1 });
        break;
      case 'day':
        d = this.changeDate({ month: d.getMonth() - 1, day: 1 });
        break;
    }
    this.stateChange({ current: d });
  }

  renderYears () {
    let year = this.state.current.getFullYear(),
        years = [],
        i = year - 8,
        j = year + 9;

    for (; i <= j; i++) {
      years.push(i);
    }

    let buttons = [];
    buttons.push(
      <button type="button" className="year" key={i-1}
        onClick={ () => { this.pre('year'); } }>
        <i className="year-left" />
        <i className="year-left" />
      </button>
    );

    years.forEach((y, i) => {
      buttons.push(
        <button type="button" className="year" key={i}
          onClick={ () => { this.yearChange(y); } }>{y}</button>
      );
    }, this);

    buttons.push(
      <button type="button" className="year" key={i+1}
        onClick={ () => { this.next('year'); } }>
        <i className="year-right" />
        <i className="year-right" />
      </button>
    );

    return buttons;
  }

  renderMonths () {
    return getLang('datetime.fullMonth').map(function (m, i) {
      return <button type="button" onClick={ () => { this.monthChange(i); } } key={i} className="month">{m}</button>;
    }, this);
  }

  renderDays () {
    let { value, current, min, max } = this.state;
    let year = current.getFullYear(),
        month = current.getMonth(),
        hour = current.getHours(),
        minute = current.getMinutes(),
        second = current.getSeconds(),
        monthFirst = new Date(year, month, 1),
        monthEnd = new Date(year, month + 1, 0),
        first = 1 - monthFirst.getDay(),
        end = (Math.ceil((monthEnd.getDate() - first + 1) / 7) * 7),
        today = new Date(),
        days = [];

    for (let date, i = 0; i < end; i++) {
      date = new Date(year, month, i + first, hour, minute, second);
      days.push(date);
    }

    let isCurrent = value ?
      (year === value.getFullYear() && month === value.getMonth()) :
      false;
    let isToday = year === today.getFullYear() && month === today.getMonth();

    return days.map(function (d, i) {
      let className = classnames(
        'day',
        {
          gray: d.getMonth() !== month,
          active: isCurrent && value.getDate() === d.getDate() && value.getMonth() === d.getMonth(),
          today: isToday && today.getDate() === d.getDate() && today.getMonth() === d.getMonth()
        }
      );
      let disabled = false,
          speedTime = d.getTime();
      if (min > 0) {
        disabled = speedTime < min;
      }
      if (!disabled && max > 0) {
        disabled = speedTime > max;
      }
      
      return (
        <button type="button" disabled={disabled}
          onClick={() => { this.dayChange(d); }} key={i}
          className={className}>
          {d.getDate()}
        </button>
      );
    }, this);
  }

  timeStageChange (type) {
    this.refs.clock.changeTimeStage(type);
  }

  renderHeader () {
    if (this.props.type === TIME) {
      return null;
    }

    let { current, stage } = this.state;
    let display = stage === 'day' ? 'block' : 'none';

    return (
      <div style={this.props.style} className="date-picker-header">
        <a style={{float: 'left', display}} onClick={this.pre.bind(this, 'month')}>
          <i className="icon arrow-left" />
          <i className="icon arrow-left" />
        </a>
        <a style={{float: 'left', display}} onClick={this.pre.bind(this, 'day')}>
          <i className="icon arrow-left" />
        </a>
        <a onClick={() => { this.stageChange('year'); }} className="year">
          {datetime.getFullYear(current)}
        </a>
        <a onClick={() => { this.stageChange('month'); }} className="month">
          {datetime.getFullMonth(current)}
        </a>
        <a style={{float: 'right', display}} onClick={this.next.bind(this, 'month')}>
          <i className="icon arrow-right" />
          <i className="icon arrow-right" />
        </a>
        <a style={{float: 'right', display}} onClick={this.next.bind(this, 'day')}>
          <i className="icon arrow-right" />
        </a>
      </div>
    );
  }

  renderInner () {
    switch (this.state.stage) {
      case 'day':
        let weeks = getLang('datetime.weekday').map(function (w, i) {
          return <div key={i} className="week">{w}</div>;
        });
        return <div className="inner">{weeks}{this.renderDays()}</div>;
      case 'month':
        return <div className="inner month-inner">{this.renderMonths()}</div>;
      case 'year':
        return <div className="inner year-inner">{this.renderYears()}</div>;
      case 'clock':
        return <div className="inner empty"></div>;
    }
    return null;
  }

  render () {
    let className = classnames(
      this.props.className,
      'rct-datetime',
      'rct-form-control',
      {
        'active': this.state.active && !this.props.readOnly,
        'popup': this.state.popup,
        'readonly': this.props.readOnly,
        'short': this.props.type !== DATETIME
      }
    );

    let { stage, value } = this.state;
    let text = value ? this.formatValue(value) : '';
    text = text ?
      <span className="date-text">{text}</span> :
      <span className="placeholder">{this.props.placeholder}&nbsp;</span>;

    return (
      <div ref="datetime" onClick={this.open} className={className}>
        {text}
        <i className="icon calendar" />
        <div ref="datepicker" className="date-picker">
          {this.renderHeader()}
          {this.renderInner()}
          {(stage === 'day' || stage === 'clock') && this.props.type !== DATE && this.getTime()}
        </div>
        <div className="overlay" onClick={this.close} />
      </div>
    );
  }
}

Datetime.propTypes = {
  className: PropTypes.string,
  format: PropTypes.string,
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
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  type: PropTypes.oneOf([DATETIME, DATE, TIME]),
  unixtime: PropTypes.bool,
  value: PropTypes.any
};

Datetime.defaultProps = {
  type: DATETIME
}

module.exports = Datetime;

