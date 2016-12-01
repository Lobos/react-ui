import React, { Component } from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'
import * as Events from './utils/events'
import SafeHtml from './SafeHtml'

import _lists from './styles/_list.scss'
import { getLang } from './lang'

export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = { scrollTop: 0 }
    this._optionHeight = 0

    this.handleOptionsScroll = this.handleOptionsScroll.bind(this)
  }

  componentDidMount () {
    // get one option height, set option wrapper height
    const wrap = this.refs.wrap
    this.timeout = setTimeout(() => {
      this._optionHeight = wrap.querySelector('ul li').clientHeight
      wrap.querySelector('ul').style.height = (this._optionHeight * (this.props.data.length || 1)) + 'px'
      this.toggleScroll('on')
    }, 0)
  }

  componentWillUnmount () {
    this.timeout && clearTimeout(this.timeout)
    this.toggleScroll('off')
  }

  toggleScroll (sw) {
    Events[sw](this.refs.wrap, 'scroll', this.handleOptionsScroll)
  }

  handleOptionsScroll (e) {
    let lastScroll = this.state.scrollTop
    let scrollTop = e.target.scrollTop
    let minScroll = this._optionHeight * this.props.maxShowCount / 3

    if (Math.abs(scrollTop - lastScroll) < minScroll) return

    this.setState({ scrollTop })
  }

  render () {
    const { className, onChange, maxShowCount, data } = this.props
    let { scrollTop } = this.state

    let options = data

    let scrolledOptCount = this._optionHeight > 0
      ? Math.floor(scrollTop / this._optionHeight - maxShowCount / 3) : 0

    // limit show options
    if (options.length > maxShowCount) {
      let showedCount = 0
      options = options.filter((d, i) => {
        if (showedCount >= maxShowCount || i < scrolledOptCount) {
          return false
        }

        showedCount++
        return true
      })
    }

    if (scrolledOptCount < 0) scrolledOptCount = 0

    if (options.length === 0) {
      options = <li><span className={_lists.group}>{getLang('fetch.noData')}</span></li>
    } else {
      options = options.map((d, i) => {
        let optionClass = classnames(
          _lists.item,
          d.$selected && _lists.active
        )

        let groupClass = _lists.group

        let optionStyle = {}
        if (data.length > maxShowCount && this._optionHeight > 0) {
          optionClass += ' ' + _lists.absolute
          groupClass += ' ' + _lists.absolute
          optionStyle.top = this._optionHeight * (i + scrolledOptCount)
        }

        if (d.$group) {
          return (
            <span key={`g-${d.$group}`} style={optionStyle} className={groupClass}>
              {d.$group}
            </span>
          )
        } else {
          return (
            <li key={d.$key} style={optionStyle}
              onClick={onChange.bind(this, d)}
              className={ optionClass }>
              <SafeHtml>{d.$html}</SafeHtml>
            </li>
          )
        }
      })
    }

    return (
      <div className={classnames(className, _lists.wrap)} ref="wrap">
        <ul style={{height: this._optionHeight * (data.length || 1)}}>{options}</ul>
      </div>
    )
  }
}

List.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array,
  maxShowCount: PropTypes.number,
  onChange: PropTypes.func
}

List.defaultProps = {
  maxShowCount: 60,
  onChange: function () {}
}
