'use strict'

require('../../less/pagination.less')

import React from 'react'
import classnames from 'classnames'
import { forEach } from '../utils/objects'

export default class Pagination extends React.Component {
  static displayName = 'Pagination'

  static propTypes = {
    className: React.PropTypes.string,
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    pages: React.PropTypes.number,
    showGo: React.PropTypes.bool,
    size: React.PropTypes.number,
    style: React.PropTypes.object,
    total: React.PropTypes.number
  }

  static defaultProps = {
    index: 1,
    pages: 10,
    size: 20,
    total: 0
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.index !== this.props.index) {
      this.setState({ index: nextProps.index })
    }
  }

  state = {
    index: this.props.index
  }

  getIndex () {
    return this.state.index
  }

  setIndex (index) {
    index = parseInt(index)
    this.setState({index})
  }

  setInput (event) {
    event.preventDefault()

    let value = React.findDOMNode(this.refs.input).value
    value = parseInt(value)
    if (!value) {
      return
    }

    this.setIndex(value)
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleChange (index) {
    this.setIndex(index)
    if (this.props.onChange) {
      this.props.onChange(index)
    }
  }

  getPages () {
    let total = this.props.total,
        size = this.props.size,
        index = this.state.index,
        span = this.props.pages,
        max = Math.ceil(total / size),
        pages = [],
        left,
        right

    if (index > max) {
      index = max
    }

    left = index - Math.floor(span / 2) + 1
    if (left < 1) {
      left = 1
    }
    right = left + span - 2
    if (right >= max) {
      right = max
      left = right - span + 2
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    // add first
    if (left > 1) {
      pages.push(1)
    }
    for (let i = left; i < right + 1; i++) {
      pages.push(i)
    }
    // add last
    if (right < max) {
      pages.push(max)
    }

    return {pages, max}
  }

  render () {
    let index = this.state.index,
        {pages, max} = this.getPages(),
        items = []

    // Previous
    items.push(
      <li key="previous" onClick={this.handleChange.bind(this, index - 1)} className={classnames({ disabled: index <= 1 })}>
        <a>&laquo;</a>
      </li>
    )

    forEach(pages, function (i) {
      items.push(
        <li onClick={this.handleChange.bind(this, i)} className={classnames({ active: i === index })} key={i}>
          <a>{i}</a>
        </li>
      )
    }, this)

    // Next
    items.push(
      <li key="next" onClick={this.handleChange.bind(this, index + 1)} className={classnames({ disabled: index >= max })}>
        <a>&raquo;</a>
      </li>
    )

    let className = classnames(
      this.props.className,
      "pagination-wrap"
    )
    return (
      <div style={this.props.style} className={className}>
        <ul className="pagination">
          {items}
        </ul>
        {
          this.props.showGo &&
          <form onSubmit={this.setInput.bind(this)}>
            <div className="input-group">
              <input ref="input" type="text" className="form-control" />
              <span onClick={this.setInput.bind(this)} className="addon">go</span>
            </div>
          </form>
        }
      </div>
    )
  }
}
