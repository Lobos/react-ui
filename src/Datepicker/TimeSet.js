import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import Styles from '../styles/_datepicker.scss'

class TimeSet extends Component {
  constructor (props) {
    super(props)
    this.changeStage = this.changeStage.bind(this)
    this.add = this.add.bind(this)
    this.sub = this.sub.bind(this)
  }

  add () {
    let value = this.props.value
    let max = this.props.type === 'hour' ? 24 : 60
    value += 1
    if (value >= max) {
      value = 0
    }
    this.changeTime(value)
  }

  sub () {
    let value = this.props.value
    let max = this.props.type === 'hour' ? 23 : 59
    value -= 1
    if (value < 0) {
      value = max
    }
    this.changeTime(value)
  }

  changeTime (value) {
    let d = {}
    d[this.props.type] = value
    this.props.onTimeChange(d)
  }

  changeStage () {
    this.props.onStageChange(this.props.type)
  }

  render () {
    return (
      <div onClick={this.changeStage} className={Styles.timeSet}>
        <div>
          <span>{this.props.value}</span>
          <a onClick={this.add} className={Styles.add}><i className={Styles.up} /></a>
          <a onClick={this.sub} className={Styles.sub}><i className={Styles.down} /></a>
        </div>
      </div>
    )
  }
}

TimeSet.propTypes = {
  onStageChange: PropTypes.func,
  onTimeChange: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.number
}

TimeSet.defaultProps = {
  value: 0
}

export default TimeSet
