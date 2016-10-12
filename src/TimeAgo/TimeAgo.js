import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import { getLang } from '../lang'
import { format } from '../utils/strings'
import * as Datetime from '../utils/datetime'

export default class TimeAgo extends Component {
  count (current) {
    const marginms = Datetime.convert(this.props.base).getTime() - current.getTime()

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
    const strategy = {
      default: Math.round,
      least: Math.floor,
      most: Math.ceil
    }

    return margin ? strategy[this.props.mode](margin) + format(getLang(category), margin > 1 ? 's' : '') : getLang('now')
  }

  render () {
    const { children, className, onClick } = this.props
    const current = new Date()

    return (
    <label className={classnames({className})}>
      {children}
      {onClick
         ? <a onClick={onClick}>
             {this.count(current)}
           </a>
         : this.count(current)}
    </label>
    )
  }
}

TimeAgo.propTypes = {
  base: PropTypes.datetime.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  mode: PropTypes.string,
  onClick: PropTypes.func
}

TimeAgo.defaultProps = {
  mode: 'default'
}
