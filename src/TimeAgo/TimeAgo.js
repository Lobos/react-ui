'use strict'

import React, { Component, PropTypes } from 'react'
import { getLang, setLang } from '../lang'

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
    const SECOND = 1000
    const MINUTE = SECOND * 60
    const HOUR = MINUTE * 60
    const DAY = HOUR * 24
    const WEEK = DAY * 7
    const MONTH = DAY * 30
    const YEAR = DAY * 365

    const basems = this.props.base.getTime()
    const currentms = current.getTime()

    let marginms = currentms - basems
    const suffix = getLang(marginms > 0 ? 'ago' : 'in')

    marginms = Math.abs(marginms)

    const marginHuman = marginms > YEAR
      ? this.template(marginms / YEAR, 'year') : marginms > MONTH
        ? this.template(marginms / MONTH, 'month') : marginms > WEEK
          ? this.template(marginms / WEEK, 'week') : marginms > DAY
            ? this.template(marginms / DAY, 'day') : marginms > HOUR
              ? this.template(marginms / HOUR, 'hour') : marginms > MINUTE
                ? this.template(marginms / MINUTE, 'minute') : marginms > SECOND
                  ? this.template(marginms / SECOND, 'second') : this.template(0)

    return marginHuman ? `${(marginHuman)}${suffix}` : 'right now'
  }

  template (margin, category) {
    return margin ? Math.round(margin) + getLang(category) : getLang('now')
  }

  handleClick () {
    this.props.onClick && this.props.onClick.call(this)
  }

  render () {
    const { children, className } = this.props
    const current = new Date()
    // const { dismissed } = this.state

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
