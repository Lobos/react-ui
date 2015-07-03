'use strict'

require('../../less/pagination.less')

let React = require('react')
let classnames = require('classnames')
let Objects = require('../utils/objects')
let Classable = require('../mixins/classable')

let Pagination = React.createClass({
  displayName: 'Pagination',

  propTypes: {
    index: React.PropTypes.number,
    onChange: React.PropTypes.func,
    pages: React.PropTypes.number,
    showGo: React.PropTypes.bool,
    size: React.PropTypes.number,
    total: React.PropTypes.number
  },

  mixins: [Classable],

  getDefaultProps: function () {
    return {
      total: 0,
      size: 20,
      index: 1,
      pages: 10
    }
  },

  getInitialState: function () {
    return {
      index: this.props.index
    }
  },

  setIndex: function (index) {
    index = parseInt(index)
    this.setState({'index': index})
  },

  setInput: function (event) {
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
  },

  handleChange: function (index) {
    this.setIndex(index)
    if (this.props.onChange) {
      this.props.onChange(index)
    }
  },

  getPages: function () {
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

    return [pages, max]
  },

  render: function () {
    let index = this.state.index,
        [pages, max] = this.getPages(),
        items = []

    // Previous
    items.push(
      <li key="previous" onClick={this.handleChange.bind(this, index - 1)} className={classnames({ disabled: index <= 1 })}>
        <a>&laquo;</a>
      </li>
    )

    Objects.forEach(pages, function (i) {
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

    let className = this.getClasses('pagination')
    return (
      <div className="pagination-wrap">
        <ul className={className}>
          {items}
        </ul>
        {
          this.props.showGo &&
          <form onSubmit={this.setInput}>
            <div className="input-group">
              <input ref="input" type="text" className="form-control" />
              <span onClick={this.setInput} className="addon">go</span>
            </div>
          </form>
        }
      </div>
    )
  }
})

module.exports = Pagination
