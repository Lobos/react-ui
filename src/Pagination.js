import React, { Component } from 'react'
import classnames from 'classnames'
import { forEach } from './utils/objects'
import Input from './Input'
import PureRender from './mixins/PureRender'
import PropTypes from './utils/proptypes'
import { ANGLE_LEFT, ANGLE_RIGHT } from './svgs'

import _styles from './styles/_pagination.scss'

class Pagination extends Component {
  constructor (props) {
    super(props)
    this.handleInput = this.handleInput.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleInput (value) {
    value = parseInt(value)
    let page = this.getCurrentPage()

    if (!(isNaN(value) || value < 1) && value !== page) {
      this.handleChange(value)
    }
  }

  handleKeyUp (event) {
    if (event.keyCode === 13) this.handleInput(event.target.value)
  }

  handleChange (value) {
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  getRange () {
    return this.props.range || this.props.pages || 10
  }

  getCurrentPage () {
    return this.props.page || this.props.index || 1
  }

  getPages () {
    let { total = 0, size } = this.props
    let max = Math.ceil(total / size)
    let left
    let right
    let range = this.getRange()
    let pages = []
    let currentPage = this.getCurrentPage()

    if (currentPage > max) {
      currentPage = max
    }

    left = currentPage - Math.floor(range / 2) + 1
    if (left < 1) {
      left = 1
    }
    right = left + range - 2
    if (right >= max) {
      right = max
      left = right - range + 2
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    // push first
    if (left > 1) {
      pages.push(1)
    }
    if (left > 2) {
      pages.push('<..')
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i)
    }
    if (right < max - 1) {
      pages.push('..>')
    }
    // push last
    if (right < max) {
      pages.push(max)
    }

    return {pages, max}
  }

  render () {
    let { mini, large, small } = this.props
    let { pages, max } = this.getPages()
    let items = []
    let currentPage = this.getCurrentPage()

    // Previous
    items.push(
      <li key="previous"
        onClick={currentPage <= 1 ? null : this.handleChange.bind(this, currentPage - 1)}
        className={classnames(_styles.previous, currentPage <= 1 && _styles.disabled)}>
        <a href="javascript:;">&nbsp;{ANGLE_LEFT}</a>
      </li>
    )

    if (mini) {
      items.push(
        <li key="input">
          <Input type="integer"
            value={currentPage}
            onChange={this.handleInput}
            onKeyUp={this.handleKeyUp}
            trigger="blur" />
        </li>
      )
      items.push(<li key="s"> / {max}</li>)
    } else {
      forEach(pages, function (i) {
        if (i === '<..' || i === '..>') {
          items.push(<li key={i} className={_styles.sep}><span>...</span></li>)
        } else {
          items.push(
            <li key={i}
              onClick={this.handleChange.bind(this, i)}
              className={classnames(i === currentPage && _styles.active)}>
              {
                i === currentPage ? <span>{i}</span> : <a href="javascript:;">{i}</a>
              }
            </li>
          )
        }
      }, this)
    }

    // Next
    items.push(
      <li key="next"
        onClick={currentPage >= max ? null : this.handleChange.bind(this, currentPage + 1)}
        className={classnames(_styles.next, currentPage >= max && _styles.disabled)}>
        <a href="javascript:;">&nbsp;{ANGLE_RIGHT}</a>
      </li>
    )

    let className = classnames(
      this.props.className,
      _styles.pagination,
      mini && _styles.mini,
      large && _styles.large,
      small && _styles.small
    )
    return (
      <ul className={className}>
        {items}
      </ul>
    )
  }
}

Pagination.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number,
  large: PropTypes.bool,
  mini: PropTypes.bool,
  onChange: PropTypes.func,
  page: PropTypes.number,
  pages: PropTypes.number,
  range: PropTypes.number,
  size: PropTypes.number,
  small: PropTypes.bool,
  style: PropTypes.object,
  total: PropTypes.number
}

Pagination.defaultProps = {
  size: 20
}

export default PureRender()(Pagination)
