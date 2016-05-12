'use strict';

import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import { overView, getOuterHeight } from '../utils/dom';
import * as datetime from '../utils/datetime';
import ClickAway from '../mixins/ClickAway';
import TimeSet from './TimeSet';
import Clock from './Clock';
import { ANGLE_LEFT, ANGLE_RIGHT, ANGLE_LEFT_DOUBLE, ANGLE_RIGHT_DOUBLE } from '../svgs';
import Transition from '../Transition';

import Styles from '../styles/_datepicker.scss';
import InputStyles from '../styles/_input.scss';

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
      open: false,
      popup: false,
      stage: props.type === TIME ? 'clock' : 'day',
      timeStage: null,
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
    this.registerClickAway(this.close, findDOMNode(this.refs.datepicker));
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
    if (this.props.readOnly || this.state.open) {
      return;
    }

    this.bindClickAway();

    let today = new Date();
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    let isTime = this.props.type === TIME;

    this.setState({
      open: true,
      current: this.state.value || today,
      //stage: isTime ? 'clock' : 'day',
      timeStage: isTime ? 'hour' : ''
    }, () => {
      let height = getOuterHeight(findDOMNode(this.refs.datepicker));
      this.setState({
        popup: overView(this.refs.datetime, height)
      });
    });
  }

  close () {
    this.setState({ open: false });
    this.unbindClickAway();
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

  renderTime () {
    const { current, timeStage } = this.state;

    return (
      <div className={Styles.timeContainer}>
        <Clock current={current} active={!!timeStage}
          stage={timeStage}
          onClose={this.props.type === TIME ? undefined : this.timeStageChange}
          onTimeChange={this.timeChange} />

        <TimeSet type="hour"
          onTimeChange={this.timeChange}
          onStageChange={this.timeStageChange}
          value={current.getHours()} />

        <TimeSet type="minute"
          onTimeChange={this.timeChange}
          onStageChange={this.timeStageChange}
          value={current.getMinutes()} />

        <TimeSet type="second"
          onTimeChange={this.timeChange}
          onStageChange={this.timeStageChange}
          value={current.getSeconds()} />
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
    const className = Styles.year;

    buttons.push(
      <a className={className} key={i-1}
        onClick={this.pre.bind(this, 'year')}>
        {getLang('datetime.prev')}
      </a>
    );

    years.forEach((y, i) => {
      buttons.push(
        <a className={className} key={i}
          onClick={this.yearChange.bind(this, y)}>{y}</a>
      );
    }, this);

    buttons.push(
      <a className={className} key={i+1}
        onClick={this.next.bind(this, 'year')}>
        {getLang('datetime.next')}
      </a>
    );

    return buttons;
  }

  renderMonths () {
    return getLang('datetime.fullMonth').map(function (m, i) {
      return (
        <a type="button"
          onClick={this.monthChange.bind(this, i)}
          key={i} className={Styles.month}>{m}</a>
      );
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
      let disabled = false,
          speedTime = d.getTime();
      if (min > 0) {
        disabled = speedTime < min;
      }
      if (!disabled && max > 0) {
        disabled = speedTime > max;
      }

      let className = classnames(
        Styles.day,
        d.getMonth() !== month && Styles.gray,
        disabled && Styles.disabled,
        (isToday && today.getDate() === d.getDate() && today.getMonth() === d.getMonth()) && Styles.today,
        (isCurrent && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()) && Styles.active
      );
      
      return (
        <a href="javascript:;" key={i}
          onClick={disabled ? undefined : this.dayChange.bind(this, d)}
          className={className}>
          {d.getDate()}
        </a>
      );
    }, this);
  }

  timeStageChange (type) {
    if (typeof type !== 'string') {
      type = '';
    }
    this.setState({ timeStage: type });
  }

  renderHeader () {
    if (this.props.type === TIME) {
      return null;
    }

    let { current, stage } = this.state;
    let display = stage === 'day' ? 'inline-block' : 'none';

    return (
      <div style={this.props.style} className={Styles.header}>
        <i style={{float: 'left', display}} onClick={this.pre.bind(this, 'month')}>
          {ANGLE_LEFT_DOUBLE}
        </i>
        <i style={{float: 'left', display}} onClick={this.pre.bind(this, 'day')}>
          {ANGLE_LEFT}
        </i>
        <a onClick={() => { this.stageChange('year'); }}>
          {datetime.getFullYear(current)}
        </a>
        <a onClick={() => { this.stageChange('month'); }}>
          {datetime.getFullMonth(current)}
        </a>
        <i style={{float: 'right', display}} onClick={this.next.bind(this, 'month')}>
          {ANGLE_RIGHT_DOUBLE}
        </i>
        <i style={{float: 'right', display}} onClick={this.next.bind(this, 'day')}>
          {ANGLE_RIGHT}
        </i>
      </div>
    );
  }

  renderInner () {
    switch (this.state.stage) {
      case 'day':
        let weeks = getLang('datetime.weekday').map(function (w, i) {
          return <div key={i} className={Styles.week}>{w}</div>;
        });
        return <div className={Styles.dayInner}>{weeks}{this.renderDays()}</div>;
      case 'month':
        return <div className={Styles.monthInner}>{this.renderMonths()}</div>;
      case 'year':
        return <div className={Styles.yearInner}>{this.renderYears()}</div>;
      case 'clock':
        return <div className={Styles.inner}></div>;
    }
    return null;
  }

  render () {
    const { type, readOnly, placeholder } = this.props;
    let { stage, value, open, popup } = this.state;

    let className = classnames(
      this.props.className,
      Styles.datepicker,
      type !== DATETIME && Styles.short,
      readOnly ? InputStyles.disabled : (open && Styles.open),
      type === TIME && Styles.timepicker,
      popup && Styles.popup
    );

    let text = value ? this.formatValue(value) : '';

    return (
      <div ref="datetime" onClick={this.open} className={className}>
        <div className={classnames(Styles.control, InputStyles.input)}>
          {
            text ?
            <span>{text}</span> :
            <span className={InputStyles.placeholder}>{placeholder}&nbsp;</span>
          }
        </div>
        <Transition ref="datepicker" duration={333} tf="ease-out" act={open ? 'enter' : 'leave'}>
          <div style={{display: 'none'}} className={Styles.picker}>
            {this.renderHeader()}
            {this.renderInner()}
            {(stage === 'day' || stage === 'clock') && type !== DATE && this.renderTime()}
          </div>
        </Transition>
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

export default Datetime;

