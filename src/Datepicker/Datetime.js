import React, { Component } from 'react'
import classnames from 'classnames'
import { objectAssign } from '../utils/objects'
import { overView, getOuterHeight } from '../utils/dom'
import * as datetime from '../utils/datetime'
import ClickAway from '../higherOrders/ClickAway'
import TimeSet from './TimeSet'
import Clock from './Clock'
import { ANGLE_LEFT, ANGLE_RIGHT, ANGLE_LEFT_DOUBLE, ANGLE_RIGHT_DOUBLE } from '../svgs'
import Transition from '../Transition'
import PropTypes from '../utils/proptypes'

import _datepickers from '../styles/_datepicker.scss'
import _inputs from '../styles/_input.scss'

import { getLang } from '../lang'

const DATETIME = 'datetime'
const DATE = 'date'
const TIME = 'time'

class Datetime extends Component {
  constructor (props) {
    super(props)

    let value = props.value

    this.state = {
      dropup: false,
      stage: props.type === TIME ? 'clock' : 'day',
      timeStage: null,
      current: datetime.convert(value, new Date()),
      value: datetime.convert(value, null)
    }

    this.timeChange = this.timeChange.bind(this)
    this.timeStageChange = this.timeStageChange.bind(this)
    this.pre = this.pre.bind(this)
    this.next = this.next.bind(this)
    this.open = this.open.bind(this)
    this.handleOpen = this.handleOpen.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  componentWillMount () {
    this.setMinMax(this.props)
    if (this.props.timeOnly || this.props.dateOnly) {
      console.warn('timeOnly and dateOnly is deprecated, use type="date|time" instead.')
    }
  }

  componentDidMount () {
    this.props.registerTarget(this.refs.datepicker)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({ value: datetime.convert(nextProps.value) })
    }
    this.setMinMax(nextProps)
  }

  setMinMax (props) {
    let zero = new Date(0)
    let min = datetime.convert(props.min, zero).getTime()
    let max = datetime.convert(props.max, zero).getTime()
    this.setState({ min, max })
  }

  getValue () {
    let value = this.state.value
    if (!value) {
      return null
    }

    // if dateOnly, remove time
    if (this.props.type === DATE) {
      value = new Date(value.getFullYear(), value.getMonth(), value.getDate())
    }

    if (this.props.unixtime) {
      // cut milliseconds
      return Math.ceil(value.getTime())
    } else {
      return this.formatValue(value)
    }
  }

  formatValue (value) {
    if (this.props.format) {
      return datetime.format(value, this.props.format)
    }

    let format = datetime.getDatetime
    if (this.props.type === DATE) {
      format = datetime.getDate
    } else if (this.props.type === TIME) {
      format = datetime.getTime
    }
    return format(value)
  }

  handleOpen () {
    if (this.props.readOnly || this.props.open) {
      return
    }

    this.props.onOpen(this.open)
  }

  open () {
    let today = new Date()
    // remove time
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    let isTime = this.props.type === TIME
    let height = getOuterHeight(this.refs.datepicker)

    this.setState({
      current: this.state.value || today,
      timeStage: isTime ? 'hour' : '',
      dropup: overView(this.refs.datetime, height)
    })
  }

  handleClear () {
    this.props.onChange()
    this.props.onClear && this.props.onClear()
  }

  changeDate (obj) {
    let c = this.state.current
    let year = obj.year === undefined ? c.getFullYear() : obj.year
    let month = obj.month === undefined ? c.getMonth() : obj.month
    let day = obj.day === undefined ? c.getDate() : obj.day
    let hour = obj.hour === undefined ? c.getHours() : obj.hour
    let minute = obj.minute === undefined ? c.getMinutes() : obj.minute
    let second = obj.second === undefined ? c.getSeconds() : obj.second

    let d = new Date(year, month, day, hour, minute, second)
    return d
  }

  stateChange (state, pop) {
    // setTimeout wait checkClickAway completed
    setTimeout(() => {
      this.setState(state)
      if (pop && this.props.onChange) {
        this.props.onChange(this.getValue())
      }
    }, 0)
  }

  stageChange (stage) {
    this.stateChange({ stage })
  }

  yearChange (year) {
    let d = this.changeDate({ year, day: 1 })
    this.stateChange({ stage: 'month', current: d })
  }

  monthChange (month) {
    let d = this.changeDate({ month, day: 1 })
    this.stateChange({ stage: 'day', current: d })
  }

  dayChange (day) {
    let d = this.changeDate({
      year: day.getFullYear(),
      month: day.getMonth(),
      day: day.getDate()
    })
    this.stateChange({ value: d, current: d }, true)
    if (this.props.type === DATE) {
      this.props.onClose()
    }
  }

  timeChange (time) {
    let d = this.changeDate(time)
    let timestamp = d.getTime()
    let { min, max } = this.state

    let valid = true
    if (min > 0) {
      valid = timestamp >= min
    }
    if (valid && max > 0) {
      valid = timestamp <= max
    }

    if (valid) {
      this.stateChange({ value: d, current: d }, true)
      return true
    }

    return false
  }

  renderTime () {
    const { current, timeStage } = this.state

    return (
      <div className={_datepickers.timeContainer}>
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
    )
  }

  next (stage) {
    let d = this.state.current
    switch (stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() + 18, day: 1 })
        break
      case 'month':
        d = this.changeDate({ year: d.getFullYear() + 1, day: 1 })
        break
      case 'day':
        d = this.changeDate({ month: d.getMonth() + 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  }

  pre (stage) {
    let d = this.state.current
    switch (stage) {
      case 'year':
        d = this.changeDate({ year: d.getFullYear() - 18, day: 1 })
        break
      case 'month':
        d = this.changeDate({ year: d.getFullYear() - 1, day: 1 })
        break
      case 'day':
        d = this.changeDate({ month: d.getMonth() - 1, day: 1 })
        break
    }
    this.stateChange({ current: d })
  }

  renderYears () {
    let year = this.state.current.getFullYear()
    let years = []
    let i = year - 8
    let j = year + 9

    for (; i <= j; i++) {
      years.push(i)
    }

    let buttons = []
    const className = _datepickers.year

    buttons.push(
      <a href="javascript:;" className={className} key={'prev'}
        onClick={this.pre.bind(this, 'year')}>
        {getLang('datetime.prev')}
      </a>
    )

    years.forEach((y, i) => {
      buttons.push(
        <a href="javascript:;" className={className} key={y}
          onClick={this.yearChange.bind(this, y)}>{y}</a>
      )
    }, this)

    buttons.push(
      <a href="javascript:;" className={className} key={'next'}
        onClick={this.next.bind(this, 'year')}>
        {getLang('datetime.next')}
      </a>
    )

    return buttons
  }

  renderMonths () {
    return getLang('datetime.fullMonth', []).map(function (m, i) {
      return (
        <a type="button" href="javascript:;"
          onClick={this.monthChange.bind(this, i)}
          key={i} className={_datepickers.month}>{m}</a>
      )
    }, this)
  }

  renderDays () {
    let { value, current, min, max } = this.state
    let year = current.getFullYear()
    let month = current.getMonth()
    let hour = current.getHours()
    let minute = current.getMinutes()
    let second = current.getSeconds()
    let monthFirst = new Date(year, month, 1)
    let monthEnd = new Date(year, month + 1, 0)
    let first = 1 - monthFirst.getDay()
    let end = (Math.ceil((monthEnd.getDate() - first + 1) / 7) * 7)
    let today = new Date()
    let days = []

    for (let date, i = 0; i < end; i++) {
      date = new Date(year, month, i + first, hour, minute, second)
      days.push(date)
    }

    let isCurrent = value
      ? (year === value.getFullYear() && month === value.getMonth())
      : false
    let isToday = year === today.getFullYear() && month === today.getMonth()

    return days.map(function (d, i) {
      let disabled = false
      let speedTime = d.getTime()
      if (min > 0) {
        disabled = speedTime < min
      }
      if (!disabled && max > 0) {
        disabled = speedTime > max
      }

      let className = classnames(
        _datepickers.day,
        d.getMonth() !== month && _datepickers.gray,
        disabled && _datepickers.disabled,
        (isToday && today.getDate() === d.getDate() && today.getMonth() === d.getMonth()) && _datepickers.today,
        (isCurrent && value.getDate() === d.getDate() && value.getMonth() === d.getMonth()) && _datepickers.active
      )

      return (
        <a href="javascript:;" key={i}
          onClick={disabled ? undefined : this.dayChange.bind(this, d)}
          className={className}>
          {d.getDate()}
        </a>
      )
    }, this)
  }

  timeStageChange (type) {
    if (typeof type !== 'string') {
      type = ''
    }
    this.setState({ timeStage: type })
  }

  renderHeader () {
    if (this.props.type === TIME) {
      return null
    }

    let { current, stage } = this.state
    let display = stage === 'day' ? 'inline-block' : 'none'

    return (
      <div style={this.props.style} className={_datepickers.header}>
        <i style={{float: 'left', display}} onClick={this.pre.bind(this, 'month')}>
          {ANGLE_LEFT_DOUBLE}
        </i>
        <i style={{float: 'left', display}} onClick={this.pre.bind(this, 'day')}>
          {ANGLE_LEFT}
        </i>
        <a href="javascript:;" onClick={() => { this.stageChange('year') }}>
          {datetime.getFullYear(current)}
        </a>
        <a href="javascript:;" onClick={() => { this.stageChange('month') }}>
          {datetime.getFullMonth(current)}
        </a>
        <i style={{float: 'right', display}} onClick={this.next.bind(this, 'month')}>
          {ANGLE_RIGHT_DOUBLE}
        </i>
        <i style={{float: 'right', display}} onClick={this.next.bind(this, 'day')}>
          {ANGLE_RIGHT}
        </i>
      </div>
    )
  }

  renderInner () {
    switch (this.state.stage) {
      case 'day':
        let weeks = getLang('datetime.weekday', []).map(function (w, i) {
          return <div key={i} className={_datepickers.week}>{w}</div>
        })
        return <div className={_datepickers.dayInner}>{weeks}{this.renderDays()}</div>
      case 'month':
        return <div className={_datepickers.monthInner}>{this.renderMonths()}</div>
      case 'year':
        return <div className={_datepickers.yearInner}>{this.renderYears()}</div>
      case 'clock':
        return <div className={_datepickers.inner}></div>
    }
    return null
  }

  render () {
    const { type, readOnly, open, placeholder, hasError } = this.props
    let { stage, value, dropup } = this.state

    let className = classnames(
      this.props.className,
      _datepickers.datepicker,
      type !== DATETIME && _datepickers.short,
      readOnly ? _datepickers.disabled : (open && _datepickers.open),
      type === TIME && _datepickers.timepicker,
      dropup && _datepickers.dropup
    )

    let text = value ? this.formatValue(value) : ''

    return (
      <div ref="datetime" onClick={this.handleOpen} className={className}>
        <div className={classnames(_datepickers.control, _inputs.input, hasError && _inputs.dangerInput)}>
          {
            text ? <span>{text}</span>
              : <span className={_inputs.placeholder}>{placeholder}&nbsp;</span>
          }
          {
            open &&
            <a className={_datepickers.clear} onClick={this.handleClear} href="javascript:;" />
          }
        </div>
        <Transition duration={333} enter={_datepickers.enter} leave={_datepickers.leave} tf="ease-out" act={open ? 'enter' : 'leave'}>
          <div ref="datepicker" className={_datepickers.picker}>
            {this.renderHeader()}
            {this.renderInner()}
            {(stage === 'day' || stage === 'clock') && type !== DATE && this.renderTime()}
          </div>
        </Transition>
      </div>
    )
  }
}

Datetime.propTypes = objectAssign({
  className: PropTypes.string,
  dateOnly: PropTypes.bool,
  format: PropTypes.string,
  hasError: PropTypes.bool,
  max: PropTypes.datetime,
  min: PropTypes.datetime,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  style: PropTypes.object,
  timeOnly: PropTypes.bool,
  type: PropTypes.oneOf([DATETIME, DATE, TIME]),
  unixtime: PropTypes.bool,
  value: PropTypes.any
}, ClickAway.propTypes)

Datetime.defaultProps = {
  type: DATETIME
}

export default ClickAway(Datetime)

