// year,month,day 没有单独写成component，因为我认为那样性能可能存在问题，只是猜测，没有证实，有空的时候测试一下
// 所以用了很多onClick={function () {}}的匿名函数
var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')
var datetime = require('../utils/date-time')
var circle = require('../utils/circle')
var lang = require('../lang')

var Classable = require('../mixins/classable')
var ClickAwayable = require('../mixins/click-awayable')
var Validatable = require('../mixins/validatable')


var weeks = lang.get('date.weekday').map(function (w, i) {
  return <div key={i} className="week">{w}</div>
})

var poslist = circle.getPostions(12, 50, -90)

var Datetime = React.createClass({
  mixins: [Classable, ClickAwayable, Validatable],

  getInitialState: function () {
    return {
      active: false,
      format: this.props.format,
      stage: 'day',
      current: this.props.value || new Date(),
      value: this.props.value
    }
  },

  componentClickAway: function () {
    this.setState({ active: false })
    if (this.refs.clock)
      this.refs.clock.close()
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this._bindClickAway()
    } else {
      this._unbindClickAway()
    }
  },

  show: function () {
    var today = new Date()
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (!this.state.active) {
      this.setState({ 
        active: true, 
        current: this.state.value || today,
        stage: 'day'
      })
    }
  },

  _changeDate: function (obj) {
    var c = this.state.current,
        year    = obj.year === undefined ? c.getFullYear() : obj.year,
        month   = obj.month === undefined ? c.getMonth() : obj.month,
        day     = obj.day === undefined ? c.getDate() : obj.day,
        hour    = obj.hour === undefined ? c.getHours() : obj.hour,
        minute  = obj.minute === undefined ? c.getMinutes() : obj.minute,
        second  = obj.second === undefined ? c.getSeconds() : obj.second

    var d = new Date(year, month, day, hour, minute, second)
    return d
  },

  stateChange: function (state) {
    // setTimeout wait checkClickAway completed
    setTimeout(function () {
      this.setState(state)
    }.bind(this), 10)
  },

  stageChange: function (stage) {
    this.stateChange({ stage: stage })
  },

  yearChange: function (year) {
    var d = this.state.current
    d = this._changeDate({ year: year, day: 1 })
    this.stateChange({ stage: 'month', current: d })
  },

  monthChange: function (month) {
    var d = this.state.current
    d = this._changeDate({ month: month, day: 1 })
    this.stateChange({ stage: 'day', current: d })
  },

  dayChange: function (day) {
    var d = this._changeDate({ 
      year: day.getFullYear(), 
      month: day.getMonth(), 
      day: day.getDate()
    })
    this.stateChange({ value: d, current: d })
  },

  timeChange: function (time) {
    var d = this._changeDate(time)
    this.stateChange({ value: d, current: d })
  },

  getYears: function () {
    var self = this,
        year = this.state.current.getFullYear(),
        years = []
    for (var i=year-12, j=year+12; i <= j; i++) {
      years.push(i)
    }
    
    return years.map(function (y, i) {
      return <button onClick={ function () { self.yearChange(y) } } key={i} className="year">{y}</button>
    })
  },

  getMonths: function () {
    var self = this
    return lang.get('date.fullMonth').map(function (m, i) {
      return <button onClick={ function () { self.monthChange(i) } } key={i} className="month">{m}</button>
    })
  },

  getDays: function () {
    var self = this,
        value = this.state.value,
        current = this.state.current,
        year = current.getFullYear(),
        month = current.getMonth(),
        first = new Date(year, month, 1),
        end = new Date(year, month + 1, 0),
        min = 1 - first.getDay(),
        max = (Math.ceil((end.getDate() - min + 1) / 7) * 7),
        days = []

    for (var date, i = 0; i < max; i++) {
      date = new Date(year, month, i+min)
      days.push(date)
    }

    var isToday = value ? 
      (year === value.getFullYear() && month === value.getMonth()) : 
      false

    return days.map(function (d, i) {
      var className = classnames(
        'day', 
        { 
          gray: d.getMonth() !== month,
          today: isToday && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()
        }
      )
      return <button onClick={function () {self.dayChange(d)}} key={i} className={className}>{d.getDate()}</button>
    })
  },

  timeStageChange: function (type) {
    this.refs.clock.changeTimeStage(type)
  },

  getTime: function () {
    var current = this.state.current

    return (
      <div className="time-container">
        <Clock current={current} onTimeChange={this.timeChange} ref="clock" />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="hour" value={current.getHours()} />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="minute" value={current.getMinutes()} />
        <TimeSet onTimeChange={this.timeChange} onStageChange={this.timeStageChange} type="second" value={current.getSeconds()} />
      </div>
    )
  },

  next: function () {
    var d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = this._changeDate({ year: d.getFullYear() + 25, day: 1 })
        break
      case 'month':
        d = this._changeDate({ year: d.getFullYear() + 1, day: 1 })
        break
      case 'day':
        d = this._changeDate({ month: d.getMonth() + 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  },

  pre: function () {
    var d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = this._changeDate({ year: d.getFullYear() - 25, day: 1 })
        break
      case 'month':
        d = this._changeDate({ year: d.getFullYear() - 1, day: 1 })
        break
      case 'day':
        d = this._changeDate({ month: d.getMonth() - 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  },

  render: function () {
    var className = this.getClasses(
      'date',
      {
        'active': this.state.active,
        'datetime': this.props.time
      }
    )

    var self = this,
        current = this.state.current,
        stage = this.state.stage,
        inner,
        format = this.props.time ? datetime.getDatetime : datetime.getDate,
        text = this.state.value ? format(this.state.value) : ""

    text = text ? 
      <span className="date-text">{text}</span> : 
      <span className="placeholder">{this.props.placeholder||""}</span>

    if (stage === 'day') {
      inner = <div className="inner">
        {weeks}
        {this.getDays()}
        {this.props.time && this.getTime()}
      </div>
    } else if (stage === 'month') {
      inner = <div className="inner">{this.getMonths()}</div>
    } else {
      inner = <div className="inner">{this.getYears()}</div>
    }

    return (
      <div onClick={this.show} className={className}>
        {text}
        <Icon icon="calendar" />
        <div className="date-picker">
          <div className="date-picker-header">
            <a href="javascript:;" onClick={this.pre} className="pre">
              <Icon icon="chevron-left" />
            </a>
            <a href="javascript:;" onClick={function(){self.stageChange('year')}} className="year">
              {datetime.getFullYear(current)}
            </a>
            <a href="javascript:;" onClick={function(){self.stageChange('month')}} className="month">
              {datetime.getFullMonth(current)}
            </a>
            <a href="javascript:;" onClick={this.next} className="next">
              <Icon icon="chevron-right" />
            </a>
          </div>
          {inner}
        </div>
      </div>
    )
  }
})

var Clock = React.createClass({
  getInitialState: function () {
    return {
      current: this.props.current,
      stage: this.props.stage || 'hour',
      am: this.props.current.getHours() < 12
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.current !== this.props.current) {
      this.setState({ current: nextProps.current, am: nextProps.current.getHours() < 12 })
    }
  },

  changeTimeStage: function (stage) {
    this.setState({ stage: stage, active: true })
  },
  
  setValue: function (value) {
    var d = {}
    d[this.state.stage] = value
    this.props.onTimeChange(d)
  },

  close: function () {
    this.setState({ active: false })
  },

  render: function () {
    var self = this,
        steps = [],
        current = this.state.current,
        value,
        hourSet,
        step = this.state.stage === 'hour' ? 1 : 5

    switch (this.state.stage) {
      case 'hour':
        value = current.getHours()
      break
      case 'minute':
        value = current.getMinutes()
      break
      default:
        value = current.getSeconds()
      break
    }

    for (var i=0, s; i<12; i++) {
      s = i * step
      if (!this.state.am && this.state.stage === 'hour')
        s += 12
      steps.push(s)
    }

    var sets = steps.map(function (step, i) {
      var pos = poslist[i],
          left = pos[0] + '%',
          top = pos[1] + '%',
          className = classnames('clock-set', { active: value === step})
      return (
        <div onClick={function () { self.setValue(step) }} className={className} key={i} style={{left:left, top:top}}>{step}</div>
      )
    })

    if (this.state.stage === 'hour') {
      hourSet = <div>
        <div onClick={function(){self.setState({ am:true })}} className={classnames("time-am", { active: this.state.am })}>AM</div>
        <div onClick={function(){self.setState({ am:false })}} className={classnames("time-pm", { active: !this.state.am })}>PM</div>
      </div>
    }

    var className = classnames('clock-wrapper', { active: this.state.active })

    return (
      <div className={className}>
        <div onClick={this.close} className="clock-overlay" />
        <div onClick={this.close} className="clock-close">
          <Icon icon="close" />
        </div>
        <div className="clock">
          <div className="clock-inner">
            {sets}
          </div>
          {hourSet}
        </div>
      </div>
    )
  }
})

var TimeSet = React.createClass({
  getInitialState: function () {
    return {
      value: this.props.value || 0,
      type: this.props.type
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value })
    }
  },

  add: function () {
    var value = this.state.value,
        max = this.props.type === 'hour' ? 24 : 60
    value += 1
    if (value >= max)
      value = 0
    this.changeTime(value)
  },

  sub: function () {
    var value = this.state.value,
        max = this.props.type === 'hour' ? 23 : 59 
    value -= 1
    if (value < 0)
      value = max
    this.changeTime(value)
  },

  changeTime: function (value) {
    this.setState({ value: value })
    var d = {}
    d[this.props.type] = value
    this.props.onTimeChange(d)
  },

  setValue: function (value) {
    this.setState({ value: value })
  },

  changeStage: function () {
    this.props.onStageChange(this.props.type)
  },

  render: function () {
    return (
      <div onClick={this.changeStage} className="time-set">
        <div className="text">
          <span>{this.state.value}</span>
          <a href="javascript:;" onClick={this.add} className="add"><Icon icon="angle-up" /></a>
          <a href="javascript:;" onClick={this.sub} className="sub"><Icon icon="angle-down" /></a>
        </div>
      </div>
    )
  }
})

module.exports = Datetime
