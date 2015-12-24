"use strict";

import { Component, PropTypes } from 'react';
import classnames from 'classnames';
import { overView, getOuterHeight } from '../utils/dom';
import * as datetime from '../utils/datetime';
import clickAway from '../higherorder/clickaway';
import TimeSet from './TimeSet';
import Clock from './Clock';

import { requireCss } from '../themes';
requireCss('datetime');

import { getLang, setLang } from '../lang';
setLang('datetime');

class Datetime extends Component {
  constructor (props) {
    super(props);
    this.state = {
      active: false,
      popup: false,
      stage: this.props.timeOnly ? 'clock' : 'day',
      current: datetime.convert(this.props.value, new Date()),
      value: datetime.convert(this.props.value, null)
    };
  }
  
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: datetime.convert(nextProps.value) });
    }
  }

  componentClickAway () {
    this.close();
  }

  getValue () {
    let value = this.value || this.state.value;
    if (!value) {
      return null;
    }

    // if dateOnly, remove time
    if (this.props.dateOnly) {
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate());
    }

    if (this.props.unixtime) {
      // cut milliseconds
      return Math.ceil(value.getTime() / 1000);
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
    if (this.props.dateOnly) {
      format = datetime.getDate;
    } else if (this.props.timeOnly) {
      format = datetime.getTime;
    }
    return format(value);
  }

  open () {
    if (this.props.readOnly) {
      return;
    }

    let today = new Date();
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    if (!this.state.active) {
      let picker = this.refs.datepicker;
      picker.style.display = 'block';
      let height = getOuterHeight(picker);

      setTimeout(() => {
        this.setState({
          active: true,
          popup: overView(this.refs.datetime, height),
          current: this.state.value || today,
          stage: this.props.timeOnly ? 'clock' : 'day'
        });

        this.bindClickAway();

        if (this.props.timeOnly) {
          this.refs.clock.changeTimeStage('hour');
        }
      }, 0);
    }
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

  stateChange (state) {
    // setTimeout wait checkClickAway completed
    setTimeout(() => {
      this.setState(state);
      if (this.props.onChange) {
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
    this.stateChange({ value: d, current: d });
  }

  timeChange (time) {
    let d = this.changeDate(time);
    this.stateChange({ value: d, current: d });
  }

  renderYears () {
    let year = this.state.current.getFullYear(),
        years = [];
    for (let i = year - 12, j = year + 12; i <= j; i++) {
      years.push(i);
    }

    return years.map(function (y, i) {
      return <button type="button" onClick={ function () { this.yearChange(y); }.bind(this) } key={i} className="year">{y}</button>;
    }, this);
  }

  renderMonths () {
    return getLang('datetime.fullMonth').map(function (m, i) {
      return <button type="button" onClick={ function () { this.monthChange(i); }.bind(this) } key={i} className="month">{m}</button>;
    }, this);
  }

  renderDays () {
    let value = this.state.value,
        current = this.state.current,
        year = current.getFullYear(),
        month = current.getMonth(),
        first = new Date(year, month, 1),
        end = new Date(year, month + 1, 0),
        min = 1 - first.getDay(),
        max = (Math.ceil((end.getDate() - min + 1) / 7) * 7),
        days = [];

    for (let date, i = 0; i < max; i++) {
      date = new Date(year, month, i + min);
      days.push(date);
    }

    let isToday = value ?
      (year === value.getFullYear() && month === value.getMonth()) :
      false;

    return days.map(function (d, i) {
      let className = classnames(
        'day',
        {
          gray: d.getMonth() !== month,
          today: isToday && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()
        }
      );
      return <button type="button" onClick={() => { this.dayChange(d); }} key={i} className={className}>{d.getDate()}</button>;
    }, this);
  }

  timeStageChange (type) {
    this.refs.clock.changeTimeStage(type);
  }

  getTime () {
    let current = this.state.current;

    return (
      <div className="time-container">
        <Clock current={current} timeOnly={this.props.timeOnly} onTimeChange={this.timeChange.bind(this)} ref="clock" />
        <TimeSet onTimeChange={this.timeChange.bind(this)} onStageChange={this.timeStageChange.bind(this)} type="hour" value={current.getHours()} />
        <TimeSet onTimeChange={this.timeChange.bind(this)} onStageChange={this.timeStageChange.bind(this)} type="minute" value={current.getMinutes()} />
        <TimeSet onTimeChange={this.timeChange.bind(this)} onStageChange={this.timeStageChange.bind(this)} type="second" value={current.getSeconds()} />
      </div>
    );
  }

  next () {
    let d = this.state.current;
    switch (this.state.stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() + 25, day: 1 });
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

  pre () {
    let d = this.state.current;
    switch (this.state.stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() - 25, day: 1 });
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

  render () {
    let className = classnames(
      this.props.className,
      'rct-datetime',
      'rct-form-control',
      {
        'active': this.state.active && !this.props.readOnly,
        'popup': this.state.popup,
        'readonly': this.props.readOnly,
        'short': this.props.dateOnly || this.props.timeOnly
      }
    );

    let current = this.state.current,
        stage = this.state.stage,
        header,
        inner,
        text = this.state.value ? this.formatValue(this.state.value) : '';

    let weeks = getLang('datetime.weekday').map(function (w, i) {
      return <div key={i} className="week">{w}</div>;
    });

    text = text ?
      <span className="date-text">{text}</span> :
      <span className="placeholder">{this.props.placeholder}&nbsp;</span>;

    switch (stage) {
      case 'day':
        inner = <div className="inner">{weeks}{this.renderDays()}</div>;
        break;
      case 'month':
        inner = <div className="inner">{this.renderMonths()}</div>;
        break;
      case 'year':
        inner = <div className="inner">{this.renderYears()}</div>;
        break;
      case 'clock':
        inner = <div className="inner empty"></div>;
        break;
    }

    if (!this.props.timeOnly) {
      header = (
        <div style={this.props.style} className="date-picker-header">
          <a onClick={this.pre.bind(this)} className="pre">
            <i className="icon arrow-left" />
          </a>
          <a onClick={() => { this.stageChange('year'); }} className="year">
            {datetime.getFullYear(current)}
          </a>
          <a onClick={() => { this.stageChange('month'); }} className="month">
            {datetime.getFullMonth(current)}
          </a>
          <a onClick={this.next.bind(this)} className="next">
            <i className="icon arrow-right" />
          </a>
        </div>
      );
    }

    return (
      <div ref="datetime" onClick={this.open.bind(this)} className={className}>
        {text}
        <i className="icon calendar" />
        <div ref="datepicker" className="date-picker">
          {header}
          {inner}
          {(stage === 'day' || stage === 'clock') && (!this.props.dateOnly) && this.getTime()}
        </div>
        <div className="overlay" onClick={this.close.bind(this)} />
      </div>
    );
  }
}

Datetime.propTypes = {
  bindClickAway: PropTypes.func,
  className: PropTypes.string,
  dateOnly: PropTypes.bool,
  format: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  timeOnly: PropTypes.bool,
  unbindClickAway: PropTypes.func,
  unixtime: PropTypes.bool,
  value: PropTypes.any
};

Datetime = clickAway(Datetime);

import FormControl from '../FormControl';

FormControl.register(

  'datetime',

  function (props) {
    return <Datetime {...props} />;
  },

  Datetime

);

FormControl.register(

  'date',

  function (props) {
    return <Datetime {...props} dateOnly={true} />;
  },

  Datetime

);

FormControl.register(

  'time',

  function (props) {
    return <Datetime {...props} timeOnly={true} />;
  },

  Datetime

);

module.exports = Datetime;
