var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')

var Strings = require('../utils/strings')
var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')
var Resourceable = require('../mixins/resourceable')

var Tree = React.createClass({
  mixins: [Classable, Resourceable],

  getInitialState: function () {
    return {
      data: [],
      value: Strings.formatValue(this.props.value, this.props.flat)
    }
  },

  getValue: function (key) {
    key = key || this.props.checkKey || 'id'
    var list = [],
        value = [],
        greedy = this.props.greedy
    Objects.forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy)
    })

    list.forEach(function (d) {
      value.push(d[key])
    })

    if (this.props.flat) {
      value = value.join(',')
    }
    return value
  },

  handleChange: function () {
    if (this.props.onChange)
      this.props.onChange()
  },

  render: function () {
    var self = this,
        checkAble = this.props.checkAble,
        value = this.state.value

    var items = this.state.data.map(function (item, i) {
      return <Item ref={i} onStatusChange={self.handleChange} value={value} checkAble={checkAble} key={i} data={item} />
    })

    var className = this.getClasses('tree', 'list-unstyled')

    return (
      <ul className={className}>{items}</ul>
    )
  }
})

var Item = React.createClass({
  getInitialState: function () {
    return {
      open: this.props.open,
      status: 0
    }
  },

  toggle: function () {
    var open = !this.state.open
    this.setState({ open: open })
  },

  check: function () {
    var status = this.state.status
    status = status < 2 ? 2 : 0
    this.setStatus(status)

    // setTimeout wait state changed
    setTimeout(function () {
      if (this.props.onStatusChange) {
        this.props.onStatusChange()
      }
    }.bind(this), 0)
  },

  setStatus: function (status) {
    this.setState({ status: status })

    Objects.forEach(this.refs, function (ref) {
      ref.setStatus(status)
    })
  },

  getStatus: function () {
    return this.state.status
  },

  updateStatus: function () {
    var status
    for (var k in this.refs) {
      if (this.refs.hasOwnProperty(k)) {
        var s = this.refs[k].getStatus()
        if (status === undefined) {
          status = s
          if (status === 1)
            break
        } else if (s === 1 || s !== status) {
          status = 1
          break
        }
      }
    }
    this.setState({ status: status })
    if (this.props.onStatusChange) {
      this.props.onStatusChange()
    }
  },

  getChecked: function (list, greedy) {
    var checked = greedy ? 1 : 2
    if (this.state.status >= checked) {
      list.push(this.props.data)
    }
    Objects.forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy)
    })
  },

  render: function () {
    var self = this,
        data = this.props.data,
        checkAble = this.props.checkAble,
        value = this.props.value,
        children,
        handle,
        check,
        type

    if (data.children) {
      var items = data.children.map(function (item, i) {
        return (<Item ref={i} key={i} value={value} checkAble={checkAble} data={item} onStatusChange={self.updateStatus} />)
      })
      children = <ul className={classnames("list-unstyled", {open:this.state.open})}>{items}</ul>
      type = "folder-o"
      var hi = this.state.open ? "minus-square-o" : "plus-square-o"
      handle =  <a onClick={this.toggle} href="javascript:;">
                  <Icon icon={hi} />
                </a>
    } else {
      type = "file-o"
    }

    if (checkAble) {
      check = ["square-o", "check-square-o", "check-square"][this.state.status]
    }

    return (
      <li>
        <label>
          {handle}
          {checkAble && <a onClick={this.check} href="javascript:;"><Icon icon={check} /></a>}
          <Icon icon={type} />
          <span>{data.text}</span>
        </label>
        {children}
      </li>
    )
  }
})

module.exports = Tree
