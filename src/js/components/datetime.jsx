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
      //format: this.props.format,
      stage: this.props.timeOnly ? 'clock' : 'day',
      current: datetime.convert(this.props.value, new Date()),
      value: datetime.convert(this.props.value, null)
    }
  },

  componentClickAway: function () {
    this.close()
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this._bindClickAway()
    } else {
      this._unbindClickAway()
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: datetime.convert(nextProps.value) })
    }
  },

  getValue: function () {
    var value = this.value || this.state.value
    if (!value) 
      return null

    // if dateOnly, remove time
    if (this.props.dateOnly)
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate())

    if (this.props.unixtime) {
      // cut milliseconds
      return Math.ceil(value.getTime() / 1000)
    } else {
      return this.formatValue(value)
    }
  },

  setValue: function (value) {
    value = datetime.convert(value)
    this.setState({ value: value })
  },

  formatValue: function (value) {
    var format = datetime.getDatetime
    if (this.props.dateOnly)
      format = datetime.getDate
    else if (this.props.timeOnly)
      format = datetime.getTime
    return format(value)
  },

  show: function () {
    var today = new Date()
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    if (!this.state.active) {
      this.setState({ 
        active: true, 
        current: this.state.value || today,
        stage: this.props.timeOnly ? 'clock' : 'day'
      })

      if (this.props.timeOnly) {
        this.refs.clock.changeTimeStage('hour')
      }
    }
  },

  close: function () {
    this.setState({ active: false })
    if (this.refs.clock)
      this.refs.clock.close()
  },

  _changeDate: function (obj) {
    var c = this.state.current,
        year    = obj.year   === undefined ? c.getFullYear() : obj.year,
        month   = obj.month  === undefined ? c.getMonth()    : obj.month,
        day     = obj.day    === undefined ? c.getDate()     : obj.day,
        hour    = obj.hour   === undefined ? c.getHours()    : obj.hour,
        minute  = obj.minute === undefined ? c.getMinutes()  : obj.minute,
        second  = obj.second === undefined ? c.getSeconds()  : obj.second

    var d = new Date(year, month, day, hour, minute, second)
    return d
  },

  stateChange: function (state) {
    // 使用value暂存值，解决checkClickAway的问题
    if (state.value) this.value = state.value
    this.setState(state)
    if (this.props.onChange)
      this.props.onChange()

    // setTimeout wait checkClickAway completed
    /*
    setTimeout(function () {
      this.setState(state)
      if (this.props.onChange)
        this.props.onChange()
    }.bind(this), 10)
   */
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
    var year = this.state.current.getFullYear(),
        years = []
    for (var i=year-12, j=year+12; i <= j; i++) {
      years.push(i)
    }
    
    return years.map(function (y, i) {
      return <button type="button" onClick={ function () { this.yearChange(y) } } key={i} className="year">{y}</button>
    }, this)
  },

  getMonths: function () {
    return lang.get('date.fullMonth').map(function (m, i) {
      return <button type="button" onClick={ function () { this.monthChange(i) } } key={i} className="month">{m}</button>
    }, this)
  },

  getDays: function () {
    var self    = this,
        value   = this.state.value,
        current = this.state.current,
        year    = current.getFullYear(),
        month   = current.getMonth(),
        first   = new Date(year, month, 1),
        end     = new Date(year, month + 1, 0),
        min     = 1 - first.getDay(),
        max     = (Math.ceil((end.getDate() - min + 1) / 7) * 7),
        days    = []

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
      return <button type="button" onClick={function () {self.dayChange(d)}} key={i} className={className}>{d.getDate()}</button>
    }, this)
  },

  timeStageChange: function (type) {
    this.refs.clock.changeTimeStage(type)
  },

  getTime: function () {
    var current = this.state.current

    return (
      <div className="time-container">
        <Clock current={current} timeOnly={this.props.timeOnly} onTimeChange={this.timeChange} ref="clock" />
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
      'datetime',
      {
        'active': this.state.active && !this.props.readOnly,
        'readonly': this.props.readOnly,
        'short': this.props.dateOnly || this.props.timeOnly
      }
    )

    var self = this,
        current = this.state.current,
        stage = this.state.stage,
        header,
        inner,
        text = this.state.value ? this.formatValue(this.state.value) : ""

    text = text ? 
      <span className="date-text">{text}</span> : 
      <span className="placeholder">{this.props.placeholder||""}</span>

    switch (stage) {
      case 'day':
        inner = <div className="inner">{weeks}{this.getDays()}</div>
        break
      case 'month':
        inner = <div className="inner">{this.getMonths()}</div>
        break
      case 'year':
        inner = <div className="inner">{this.getYears()}</div>
        break
      case 'clock':
        inner = <div className="inner empty"></div>
        break
    }

    if (!this.props.timeOnly) {
      header = <div className="date-picker-header">
                <a href="javascript:;" onClick={this.pre} className="pre">
                  <Icon icon="arrow-left" />
                </a>
                <a href="javascript:;" onClick={function(){self.stageChange('year')}} className="year">
                  {datetime.getFullYear(current)}
                </a>
                <a href="javascript:;" onClick={function(){self.stageChange('month')}} className="month">
                  {datetime.getFullMonth(current)}
                </a>
                <a href="javascript:;" onClick={this.next} className="next">
                  <Icon icon="arrow-right" />
                </a>
              </div>
    }

    return (
      <div onClick={this.show} className={className}>
        {text}
        <Icon icon="calendar" />
        <div className="date-picker">
          {header}
          {inner}
          {(stage === 'day' || stage === 'clock') && (!this.props.dateOnly) && this.getTime()}
        </div>
        <div className="overlay" onClick={this.close} />
      </div>
    )
  }
})

var Clock = React.createClass({
  getInitialState: function () {
    return {
      current: this.props.current,
      stage: this.props.stage || 'clock',
      active: this.props.active,
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
    if (!this.props.timeOnly)
      this.setState({ active: false })
  },

  getRotate: function (type) {
    var current = this.state.current,
        value,
        max = type === 'hour' ? 12 : 60

    switch (type) {
      case 'hour':
        value = current.getHours() + current.getMinutes() / 60
        break
      case 'minute':
        value = current.getMinutes() + current.getSeconds() / 60
        break
      case 'second':
        value = current.getSeconds()
        break
    }

    value = value * 360 / max - 90
    return 'rotate(' + value + 'deg)'
  },

  getPointer: function () {
    var stage = this.state.stage,
        self = this

    var pointer = function (type) {
      var rotate = self.getRotate(type)
      return (
        <div style={{transform: rotate, WebkitTransform: rotate }} className={classnames(type, {active:stage===type})}></div>
      )
    }

    return  (
      <div className="pointer">
        {pointer('hour')}
        {pointer('minute')}
        {pointer('second')}
      </div>
    )
  },

  render: function () {
    var self = this,
        steps = [],
        current = this.state.current,
        stage = this.state.stage,
        value,
        step = (stage === 'hour' || stage === 'clock') ? 1 : 5

    switch (stage) {
      case 'hour':
        value = current.getHours()
        break
      case 'minute':
        value = current.getMinutes()
        break
      case 'second':
        value = current.getSeconds()
        break
    }

    for (var i=0, s; i<12; i++) {
      s = i * step
      if (!this.state.am && stage === 'hour')
        s += 12
      steps.push(s)
    }

    var sets = steps.map(function (step, i) {
      var pos = poslist[i],
          left = pos[0] + '%',
          top = pos[1] + '%',
          className = classnames('clock-set')
      return (
        <div onClick={function () { self.setValue(step) }} className={className} key={i} style={{left:left, top:top}}>{step}</div>
      )
    }, this)

    var className = classnames('clock-wrapper', { active: this.state.active })

    return (
      <div className={className}>
        <div onClick={this.close} className="clock-overlay" />
        {!this.props.timeOnly && <div onClick={this.close} className="clock-close">
          <Icon icon="close" />
        </div>}
        <div className="clock">
          <div className="clock-inner">
            {sets}
          </div>
          {this.getPointer()}
          {stage === 'hour' && <div>
            <div onClick={function(){self.setState({ am:true })}} className={classnames("time-am", { active: this.state.am })}>AM</div>
            <div onClick={function(){self.setState({ am:false })}} className={classnames("time-pm", { active: !this.state.am })}>PM</div>
          </div>}
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
