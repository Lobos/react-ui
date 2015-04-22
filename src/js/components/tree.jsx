// tree 可能破坏了react的一个原则，由于tree.state.data是一个array，当data值改变时，不经过setState，data的值也改变了
// 所有的Item的data也因此改变
var React = require('react')
var classnames = require('classnames')
var Icon = require('./icon.jsx')

var Strings = require('../utils/strings')
var Objects = require('../utils/objects')
var Classable = require('../mixins/classable')
var Resourceable = require('../mixins/resourceable')
var ReceiveValue = require('../mixins/receive-value')

var Tree = React.createClass({
  mixins: [Classable, Resourceable, ReceiveValue],

  getInitialState: function () {
    return {
      data: [],
      inited: false
    }
  },

  formatValue: function (value) {
    return Strings.formatValue(value, this.props.flat)
  },

  componentWillUpdate: function (nextProps, nextState) {
    // initValue 和 initData 分开处理
    if (nextState.value !== this.state.value) {
      this.initValue(nextState.value)
    } 
  },

  initValue: function (value) {
    this.init(this.state.data, value)
  },

  initData: function (data) {
    this.init(data, this.state.value)
  },

  // 初始化数据，不在item里面判断，在元数据里加入deep和status，减少判断和item.setState次数
  init: function (data, value) {
    var key = this.props.checkKey || 'id'
    var getStatus = function (d, last, deep) {
      var v = d[key],
          status,
          newDeep,
          nextDeep
      if (deep === undefined) {
        newDeep = []
        nextDeep = []
      } else {
        newDeep = deep.slice()
        newDeep.push(last ? 2 : 1)
        nextDeep = deep.slice()
        nextDeep.push(last ? 0 : 1)
      }
      if (d.children && d.children.length > 0) {
        for (var i=0, count=d.children.length; i<count; i++) {
          var sub = d.children[i],
              subStatus = getStatus(sub, i===(count-1), nextDeep)
          if (status === undefined) {
            status = subStatus
          } else if (status !== subStatus) {
            status = 1
          }
        }
      } else {
        status = value.indexOf(v) >= 0 ? 2 : 0
      }
      d.$status = status
      d.$deep = newDeep
      return status
    }
    for (var i=0, count=data.length; i<count; i++) {
      getStatus(data[i], i===(count-1))
    }
    this.setState({ data:data })
  },

  isInitialed: function () {
    var data = this.state.data
    if (data.length === 0)
      return true
    return !!data[0].$deep
  },

  toggleAll: function (open) {
    Objects.forEach(this.refs, function (ref) {
      ref.toggleAll(open)
    })
  },

  getValue: function (key) {
    // ignore validate raw
    if ('boolean' === typeof key) 
      key = undefined

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
        open = this.props.open,
        readOnly = this.props.readOnly,
        checkKey = this.props.checkKey || 'id',
        value = this.state.value

    var items = this.state.data.map(function (item, i) {
      return <Item ref={i} open={open} readOnly={readOnly} checkKey={checkKey} onStatusChange={self.handleChange} value={value} checkAble={checkAble} key={i} data={item} />
    })

    var className = this.getClasses('tree', 'list-unstyled', {
      readonly: this.props.readOnly
    })

    return (
      <ul className={className}>{items}</ul>
    )
  }
})

var Item = React.createClass({
  getInitialState: function () {
    return {
      open: this.props.open,
      status: this.props.data.$status || 0
    }
  },

  toggle: function () {
    var open = !this.state.open
    this.setState({open: open})
  },

  toggleAll: function (open) {
    this.setState({open: open})
    Objects.forEach(this.refs, function (ref) {
      ref.toggleAll(open)
    })
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({status: this.props.data.$status})
    }
  },

  check: function () {
    if (this.props.readOnly) return

    var status = this.state.status
    status = status < 2 ? 2 : 0
    this.setStatus(status)

    // setTimeout wait state changed
    setTimeout(function () {
      this.props.onStatusChange()
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
    this.props.onStatusChange()
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
        checkKey = this.props.checkKey,
        readOnly = this.props.readOnly,
        open = this.props.open,
        value = this.props.value,
        children,
        handle,
        check,
        checkClass,
        type,
        marks = []

    if (data.children) {
      var items = data.children.map(function (item, i) {
        return (<Item ref={i} key={i} open={open} readOnly={readOnly} value={value} checkKey={checkKey} checkAble={checkAble} data={item} onStatusChange={self.updateStatus} />)
      })
      children = <ul className={classnames("list-unstyled", {open:this.state.open})}>{items}</ul>
      type = this.state.open ? "folder-open-o" : "folder-o"
      handle =  <a onClick={this.toggle} className="handle" href="javascript:;">
                  <Icon icon={this.state.open ? "minus-square-o" : "plus-square-o"} />
                </a>
    } else {
      type = "file-o"
    }

    if (checkAble) {
      check = ["square-o", "check-square-o", "check-square"][this.state.status]
      checkClass = classnames("check-handle", ["", "half-checked", "checked"][this.state.status])
    }

    for (var i=0, count=data.$deep.length; i<count; i++) {
      var d = data.$deep[i]
      var mc = classnames("marks", {
        "marks-h": d >= 1 && (count - 1 === i),
        "marks-v": d === 1,
        "marks-l": d === 2
      })
      marks.push(
        <span key={i} className={mc}>&nbsp;</span>
      )
    }
    return (
      <li>
        <label>
          {marks}
          {handle}
          {checkAble && <a className={checkClass} onClick={this.check} href="javascript:;"><Icon icon={check} /></a>}
          <Icon icon={type} />
          <span>{data.text}</span>
        </label>
        {children}
      </li>
    )
  }
})

module.exports = Tree
