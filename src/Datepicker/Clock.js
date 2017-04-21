import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import classnames from 'classnames'
import Styles from '../styles/_datepicker.scss'
import { CLOSE } from '../svgs'

const poslist = require('../utils/circle').getPositions(12, 50, -90)

class Clock extends Component {
  constructor (props) {
    super(props)
    this.state = {
      am: props.current.getHours() < 12
    }
  }

  setValue (value) {
    this.props.onTimeChange({[this.props.stage]: value})
  }

  getRotate (type) {
    let current = this.props.current
    let value
    let max = type === 'hour' ? 12 : 60

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
  }

  renderPointer () {
    const stage = this.props.stage

    const pointer = (type) => {
      let rotate = this.getRotate(type)
      let className = classnames(
        Styles[type],
        stage === type && Styles.active
      )
      return (
        <div className={className}
          style={{
            transform: rotate,
            WebkitTransform: rotate
          }}
        />
      )
    }

    return (
      <div className={Styles.pointer}>
        {pointer('hour')}
        {pointer('minute')}
        {pointer('second')}
      </div>
    )
  }

  renderIndicator () {
    return (
      <div onClick={() => { this.setState({ am: !this.state.am }) }}
        className={Styles.am}>
        <small className={this.state.am ? Styles.active : ''}>AM</small>
        <small className={!this.state.am ? Styles.active : ''}>PM</small>
      </div>
    )
  }

  render () {
    const { stage, onClose } = this.props
    let steps = []
    let step = (stage === 'hour' || stage === 'clock') ? 1 : 5

    for (let i = 0, s; i < 12; i++) {
      s = i * step
      if (!this.state.am && stage === 'hour') {
        s += 12
      }
      steps.push(s)
    }

    let sets = steps.map((s, i) => {
      let pos = poslist[i]
      let left = pos[0] + '%'
      let top = pos[1] + '%'
      return (
        <div key={i}
          className={Styles.clockSet}
          onClick={this.setValue.bind(this, s)}
          style={{left, top}}>{s}</div>
      )
    })

    let className = classnames(
      Styles.clockWrapper,
      this.props.active && Styles.active
    )

    return (
      <div className={className}>
        <div onClick={onClose} className={Styles.overlay} />
        {onClose && <div onClick={onClose} className={Styles.close}>{CLOSE}</div>}
        <div className={Styles.clock}>
          <div className={Styles.clockInner}>
            {sets}
          </div>
          {this.renderPointer()}

          {stage === 'hour' && this.renderIndicator()}
        </div>
      </div>
    )
  }
}

Clock.propTypes = {
  active: PropTypes.bool,
  current: PropTypes.instanceOf(Date),
  onClose: PropTypes.func,
  onTimeChange: PropTypes.func,
  stage: PropTypes.string,
  timeOnly: PropTypes.bool
}

Clock.defaultProps = {
  stage: 'clock'
}

export default Clock
