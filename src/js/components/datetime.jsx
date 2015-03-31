// year,month,day 没有单独写成component，因为我认为那样性能可能存在问题，只是猜测，没有证实，有空的时候测试一下
// 所以用了很多onClick={function () {}}的匿名函数
var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')
var datetime = require('../utils/date-time')
var lang = require('../lang')

var Classable = require('../mixins/classable')
var ClickAwayable = require('../mixins/click-awayable')
var Validatable = require('../mixins/validatable')


var weeks = lang.get('date.weekday').map(function (w, i) {
  return <div key={i} className="week">{w}</div>
})


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
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this._bindClickAway()
    } else {
      this._unbindClickAway()
    }
  },

  show: function () {
    if (!this.state.active)
      this.setState({ 
        active: true, 
        current: this.state.value || new Date(),
        stage: 'day'
      })
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
    d = new Date(year, d.getMonth(), 1)
    this.stateChange({ stage: 'month', current: d })
  },

  monthChange: function (month) {
    var d = this.state.current
    d = new Date(d.getFullYear(), month, 1)
    this.stateChange({ stage: 'day', current: d })
  },

  dayChange: function (day) {
    this.stateChange({ value: day, current: day })
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

  next: function () {
    var d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = new Date(d.getFullYear() + 25, d.getMonth(), 1)
        break
      case 'month':
        d = new Date(d.getFullYear() + 1, d.getMonth(), 1)
        break
      case 'day':
        d = new Date(d.getFullYear(), d.getMonth() + 1, 1)
        break
    }
    this.stateChange({ current: d })
  },

  pre: function () {
    var d = this.state.current
    switch (this.state.stage) {
      case 'year':
        d = new Date(d.getFullYear() - 25, d.getMonth(), 1)
        break
      case 'month':
        d = new Date(d.getFullYear() - 1, d.getMonth(), 1)
        break
      case 'day':
        d = new Date(d.getFullYear(), d.getMonth() - 1, 1)
        break
    }
    this.stateChange({ current: d })
  },

  render: function () {
    var className = this.getClasses(
      'date',
      { 'active': this.state.active }
    )

    var self = this,
        current = this.state.current,
        inner,
        format = this.props.time ? datetime.getDatetime : datetime.getDate,
        text = this.state.value ? format(this.state.value) : ""

    text = text ? 
      <span className="date-text">{text}</span> : 
      <span className="placeholder">{this.props.placeholder||""}</span>

    if (this.state.stage === 'day') {
      inner = <div className="inner">
        {weeks}
        {this.getDays()}
      </div>
    } else if (this.state.stage === 'month') {
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

module.exports = Datetime
