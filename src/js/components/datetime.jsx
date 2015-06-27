"use strict"
// year,month,day 没有单独写成component，因为我认为那样性能可能存在问题，只是猜测，没有证实，有空的时候测试一下
// 所以用了很多匿名函数

require('../../less/form.less')
require('../../less/datetime.less')

let React = require('react')
let classnames = require('classnames')
let DOM = require('../utils/dom')
let datetime = require('../utils/datetime')
let circle = require('../utils/circle')
let lang = require('../lang')

let Classable = require('../mixins/classable')
let ClickAwayable = require('../mixins/click-awayable')

let poslist = circle.getPostions(12, 50, -90)

let Datetime = React.createClass({
  displayName: 'Datetime',

  propTypes: {
    dateOnly: React.PropTypes.bool,
    format: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    timeOnly: React.PropTypes.bool,
    unixtime: React.PropTypes.bool,
    value: React.PropTypes.any
  },

  mixins: [Classable, ClickAwayable],

  getInitialState: function () {
    return {
      active: false,
      popup: false,
      //format: this.props.format,
      stage: this.props.timeOnly ? 'clock' : 'day',
      current: datetime.convert(this.props.value, new Date()),
      value: datetime.convert(this.props.value, null)
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: datetime.convert(nextProps.value) })
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this.bindClickAway()
    } else {
      this.unbindClickAway()
    }
  },

  componentClickAway: function () {
    this.close()
  },

  getValue: function () {
    let value = this.value || this.state.value
    if (!value) {
      return null
    }

    // if dateOnly, remove time
    if (this.props.dateOnly) {
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate())
    }

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
    if (this.props.format) {
      return datetime.format(value, this.props.format)
    }

    let format = datetime.getDatetime
    if (this.props.dateOnly) {
      format = datetime.getDate
    } else if (this.props.timeOnly) {
      format = datetime.getTime
    }
    return format(value)
  },

  open: function () {
    if (this.props.readOnly) {
      return
    }

    let today = new Date()
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    if (!this.state.active) {
      let picker = React.findDOMNode(this.refs.datepicker)
      picker.style.display = 'block'
      let height = DOM.getOuterHeight(picker)

      setTimeout(() => {
        this.setState({
          active: true,
          popup: DOM.overView(React.findDOMNode(this), height),
          current: this.state.value || today,
          stage: this.props.timeOnly ? 'clock' : 'day'
        })

        if (this.props.timeOnly) {
          this.refs.clock.changeTimeStage('hour')
        }
      }, 0)
    }
  },

  close: function () {
    this.setState({ active: false })
    if (this.refs.clock) {
      this.refs.clock.close()
    }
    setTimeout(() => {
      if (this.state.active === false) {
        React.findDOMNode(this.refs.datepicker).style.display = 'none'
      }
    }, 500)
  },

  changeDate: function (obj) {
    let c = this.state.current,
        year = obj.year === undefined ? c.getFullYear() : obj.year,
        month = obj.month === undefined ? c.getMonth() : obj.month,
        day = obj.day === undefined ? c.getDate() : obj.day,
        hour = obj.hour === undefined ? c.getHours() : obj.hour,
        minute = obj.minute === undefined ? c.getMinutes() : obj.minute,
        second = obj.second === undefined ? c.getSeconds() : obj.second

    let d = new Date(year, month, day, hour, minute, second)
    return d
  },

  stateChange: function (state) {
    // setTimeout wait checkClickAway completed
    setTimeout(() => {
      this.setState(state)
      if (this.props.onChange) {
        this.props.onChange(this.getValue())
      }
    }, 0)
  },

  stageChange: function (stage) {
    this.stateChange({ stage: stage })
  },

  yearChange: function (year) {
    //let d = this.state.current
    let d = this.changeDate({ year: year, day: 1 })
    this.stateChange({ stage: 'month', current: d })
  },

  monthChange: function (month) {
    //let d = this.state.current
    let d = this.changeDate({ month: month, day: 1 })
    this.stateChange({ stage: 'day', current: d })
  },

  dayChange: function (day) {
    let d = this.changeDate({
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate()
    })
    this.stateChange({ value: d, current: d })
  },

  timeChange: function (time) {
    let d = this.changeDate(time)
    this.stateChange({ value: d, current: d })
  },

  getYears: function () {
    let year = this.state.current.getFullYear(),
        years = []
    for (let i = year - 12, j = year + 12; i <= j; i++) {
      years.push(i)
    }

    return years.map(function (y, i) {
      return <button type="button" onClick={ function () { this.yearChange(y) }.bind(this) } key={i} className="year">{y}</button>
    }, this)
  },

  getMonths: function () {
    return lang.get('date.fullMonth').map(function (m, i) {
      return <button type="button" onClick={ function () { this.monthChange(i) }.bind(this) } key={i} className="month">{m}</button>
    }, this)
  },

  getDays: function () {
    let value = this.state.value,
        current = this.state.current,
        year = current.getFullYear(),
        month = current.getMonth(),
        first = new Date(year, month, 1),
        end = new Date(year, month + 1, 0),
        min = 1 - first.getDay(),
        max = (Math.ceil((end.getDate() - min + 1) / 7) * 7),
        days = []

    for (let date, i = 0; i < max; i++) {
      date = new Date(year, month, i + min)
      days.push(date)
    }

    let isToday = value ?
      (year === value.getFullYear() && month === value.getMonth()) :
      false

    return days.map(function (d, i) {
      let className = classnames(
        'day',
        {
          gray: d.getMonth() !== month,
          today: isToday && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()
        }
      )
      return <button type="button" onClick={() => {this.dayChange(d)}} key={i} className={className}>{d.getDate()}</button>
    }, this)
  },

  timeStageChange: function (type) {
    this.refs.clock.changeTimeStage(type)
  },

  getTime: function () {
    let current = this.state.current

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
    let d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() + 25, day: 1 })
        break
      case 'month':
        d = this.changeDate({ year: d.getFullYear() + 1, day: 1 })
        break
      case 'day':
        d = this.changeDate({ month: d.getMonth() + 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  },

  pre: function () {
    let d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() - 25, day: 1 })
        break
      case 'month':
        d = this.changeDate({ year: d.getFullYear() - 1, day: 1 })
        break
      case 'day':
        d = this.changeDate({ month: d.getMonth() - 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  },

  render: function () {
    let className = this.getClasses(
      'datetime form-control',
      {
        'active': this.state.active && !this.props.readOnly,
        'popup': this.state.popup,
        'readonly': this.props.readOnly,
        'short': this.props.dateOnly || this.props.timeOnly
      }
    )

    let current = this.state.current,
        stage = this.state.stage,
        header,
        inner,
        text = this.state.value ? this.formatValue(this.state.value) : ""

    let weeks = lang.get('date.weekday').map(function (w, i) {
      return <div key={i} className="week">{w}</div>
    })

    text = text ?
      <span className="date-text">{text}</span> :
      <span className="placeholder">{this.props.placeholder}&nbsp;</span>

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
      header = (
        <div className="date-picker-header">
          <a onClick={this.pre} className="pre">
            <i className="icon arrow-left" />
          </a>
          <a onClick={() => {this.stageChange('year')}} className="year">
            {datetime.getFullYear(current)}
          </a>
          <a onClick={() => {this.stageChange('month')}} className="month">
            {datetime.getFullMonth(current)}
          </a>
          <a onClick={this.next} className="next">
            <i className="icon arrow-right" />
          </a>
        </div>
      )
    }

    return (
      <div onClick={this.open} className={className}>
        {text}
        <i className="icon calendar" />
        <div ref="datepicker" className="date-picker">
          {header}
          {inner}
          {(stage === 'day' || stage === 'clock') && (!this.props.dateOnly) && this.getTime()}
        </div>
        <div className="overlay" onClick={this.close} />
      </div>
    )
  }
})

let Clock = React.createClass({
  displayName: 'Datetime.Clock',

  propTypes: {
    active: React.PropTypes.bool,
    current: React.PropTypes.instanceOf(Date),
    onTimeChange: React.PropTypes.func,
    stage: React.PropTypes.string,
    timeOnly: React.PropTypes.bool
  },

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
    let d = {}
    d[this.state.stage] = value
    this.props.onTimeChange(d)
  },

  close: function () {
    if (!this.props.timeOnly) {
      this.setState({ active: false })
    }
  },

  getRotate: function (type) {
    let current = this.state.current,
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
    let stage = this.state.stage

    let pointer = function (type, context) {
      let rotate = context.getRotate(type)
      return (
        <div style={{transform: rotate, WebkitTransform: rotate }} className={classnames(type, {active: stage === type})}></div>
      )
    }

    return (
      <div className="pointer">
        {pointer('hour', this)}
        {pointer('minute', this)}
        {pointer('second', this)}
      </div>
    )
  },

  render: function () {
    let steps = [],
        //current = this.state.current,
        stage = this.state.stage,
        step = (stage === 'hour' || stage === 'clock') ? 1 : 5

    /*
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
    */

    for (let i = 0, s; i < 12; i++) {
      s = i * step
      if (!this.state.am && stage === 'hour') {
        s += 12
      }
      steps.push(s)
    }

    let sets = steps.map(function (s, i) {
      let pos = poslist[i],
          left = pos[0] + '%',
          top = pos[1] + '%'
      return (
        <div onClick={() => { this.setValue(s) }} className={classnames('clock-set')} key={i} style={{left: left, top: top}}>{s}</div>
      )
    }, this)

    let className = classnames('clock-wrapper', { active: this.state.active })

    return (
      <div className={className}>
        <div onClick={this.close} className="clock-overlay" />
        {!this.props.timeOnly && <div onClick={this.close} className="clock-close"><i className="icon close" /></div>}
        <div className="clock">
          <div className="clock-inner">
            {sets}
          </div>
          {this.getPointer()}
          {stage === 'hour' && <div>
            <div onClick={() => {this.setState({ am: true })}} className={classnames("time-am", { active: this.state.am })}>AM</div>
            <div onClick={() => {this.setState({ am: false })}} className={classnames("time-pm", { active: !this.state.am })}>PM</div>
          </div>}
        </div>
      </div>
    )
  }
})

let TimeSet = React.createClass({
  displayName: 'Datetime/TimeSet',

  propTypes: {
    onStageChange: React.PropTypes.func,
    onTimeChange: React.PropTypes.func,
    type: React.PropTypes.string,
    value: React.PropTypes.number
  },

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
    let value = this.state.value,
        max = this.props.type === 'hour' ? 24 : 60
    value += 1
    if (value >= max) {
      value = 0
    }
    this.changeTime(value)
  },

  sub: function () {
    let value = this.state.value,
        max = this.props.type === 'hour' ? 23 : 59
    value -= 1
    if (value < 0) {
      value = max
    }
    this.changeTime(value)
  },

  changeTime: function (value) {
    this.setState({ value: value })
    let d = {}
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
          <a onClick={this.add} className="add"><i className="icon angle-up" /></a>
          <a onClick={this.sub} className="sub"><i className="icon angle-down" /></a>
        </div>
      </div>
    )
  }
})

module.exports = Datetime

require('./form-control.jsx').register(

  'datetime',

  function (props) {
    return <Datetime {...props} />
  }

)

require('./form-control.jsx').register(

  'date',

  function (props) {
    return <Datetime {...props} dateOnly={true} />
  }

)

require('./form-control.jsx').register(

  'time',

  function (props) {
    return <Datetime {...props} timeOnly={true} />
  }

)
