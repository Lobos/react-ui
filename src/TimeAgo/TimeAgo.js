'use strict'

import React, { Component, PropTypes } from 'react'
import { getLang, setLang } from '../lang'
import { format } from '../utils/strings'

setLang('timeago')
// import classnames from 'classnames'

// import Styles from './styles/_alert.scss'

export default class TimeAgo extends Component {
  constructor (props) {
    super(props)
    this.tpl = {}
  // this.state = { dismissed: false }
  }

  count (current) {
    const marginms = this.props.base.getTime() - current.getTime()

    const marginHuman = this.toReadable(marginms)

    return marginHuman ? format(getLang(marginms > 0 ? 'in' : 'ago'), marginHuman) : 'right now'
  }

  toReadable (marginms) {
    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    marginms = Math.abs(marginms)

    return marginms > YEAR
      ? this.template(marginms / YEAR, 'year') : marginms > MONTH
        ? this.template(marginms / MONTH, 'month') : marginms > WEEK
          ? this.template(marginms / WEEK, 'week') : marginms > DAY
            ? this.template(marginms / DAY, 'day') : marginms > HOUR
              ? this.template(marginms / HOUR, 'hour') : marginms > MINUTE
                ? this.template(marginms / MINUTE, 'minute') : marginms > SECOND
                  ? this.template(marginms / SECOND, 'second') : this.template(0)
  }

  template (margin, category) {
    return margin ? Math.round(margin) + format(getLang(category), margin > 1 ? 's' : '') : getLang('now')
  }

  handleClick () {
    this.props.onClick && this.props.onClick.call(this)
  }

  render () {
    const { children, className } = this.props
    const current = new Date()

    return (
    <div className={className}>
      {children}
      <a onClick={this.handleClick.bind(this)}>
        {this.count(current)}
      </a>
    </div>
    )
  }
}

TimeAgo.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.any,
  className: PropTypes.string,
  base: PropTypes.object.isRequired
}
