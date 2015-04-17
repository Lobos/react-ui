var React = require('react')
var classnames = require('classnames')

var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')

var Pagination = React.createClass({
  mixins: [Classable],

  getInitialState: function () {
    return {
      totalItems: this.props.totalItems || 0,
      itemsPerPage: this.props.itemsPerPage || 20,
      index: this.props.index || 1,
      span: this.props.span || 4
    }
  },

  trySetState: function (key, value) {
    value = parseInt(value)
    if (value) {
      var state = {}
      state[key] = value
      this.setState(state)
    }
  },

  setIndex: function (index) {
    this.trySetState('index', index)
  },

  setTotalItems: function (totalItems) {
    this.trySetState('totalItems', totalItems)
  },

  setPerPageItems: function (itemsPerPage) {
    this.trySetState('itemsPerPage', itemsPerPage)
  },

  setInput: function (event) {
    event.preventDefault() 

    var value = React.findDOMNode(this.refs.input).value
    value = parseInt(value)
    if (!value) return

    this.trySetState('index', value)
    if (this.props.onChange)
      this.props.onChange(value)
  },

  handleClick: function (index) {
    return function () {
      this.setIndex(index)
      if (this.props.onChange)
        this.props.onChange(index)
    }.bind(this)
  },

  render: function () {
    var totalItems = this.state.totalItems,
        itemsPerPage = this.state.itemsPerPage,
        index = this.state.index,
        span = this.state.span,
        max = Math.ceil(totalItems / itemsPerPage),
        pages = [],
        items = [],
        left,
        right

    if (index > max) index = max

    left = index - span
    if (left < 1) left = 1
    right = left + span * 2
    if (right > max) {
      right = max
      left = (right - span * 2) > 0 ? (right - span * 2) : 1
    }

    // add first
    if (left > 1) pages.push(1)
    for (var i=left; i<right+1; i++) {
      pages.push(i)
    }
    // add last
    if (right < max) pages.push(max)

    // Previous
    items.push(
      <li key="previous" onClick={this.handleClick(index-1)} className={classnames({ disabled: index <= 1 })}>
        <a href="javascript:;">&laquo;</a>
      </li>
    )

    Objects.forEach(pages, function (i) {
      items.push(
        <li onClick={this.handleClick(i)} className={classnames({ active: i===index })} key={i}>
          <a href="javascript:;">{i}</a>
        </li>
      ) 
    }, this)

    // Next
    items.push(
      <li key="next" onClick={this.handleClick(index+1)} className={classnames({ disabled: index >= max })}>
        <a href="javascript:;">&raquo;</a>
      </li>
    )

    var className = this.getClasses('pagination')
    return (
      <div className="pagination-wrap">
        <ul className={className}>
          {items}
        </ul>
        { this.props.showGo &&
          <form onSubmit={this.setInput} className="form-inline">
            <div className="input-group">
              <input ref="input" type="text" className="form-control" />
              <div onClick={this.setInput} className="input-group-addon">go</div>
            </div>
          </form>
        }
      </div>
    )
  }
})

module.exports = Pagination
