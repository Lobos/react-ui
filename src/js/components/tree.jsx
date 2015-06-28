"use strict"

// 为了提高效率，直接操作了tree.state.data，
// 由于tree.state.data是一个array，当data值改变时，不经过setState，
// 所有的Item的data也因此改变，可能破坏了react的一个原则

require('../../less/tree.less')

let React = require('react')
let classnames = require('classnames')

let Strings = require('../utils/strings')
let Objects = require('../utils/objects')
let Classable = require('../mixins/classable')
let Resource = require('../mixins/resource')
let ReceiveValue = require('../mixins/receive-value')

let Tree = React.createClass({
  displayName: 'Tree',

  propTypes: {
    checkAble: React.PropTypes.bool,
    data: React.PropTypes.object,
    greedy: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    open: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    sep: React.PropTypes.string,
    src: React.PropTypes.string,
    textTpl: React.PropTypes.string,
    value: React.PropTypes.any,
    valueTpl: React.PropTypes.string
  },

  mixins: [Classable, Resource, ReceiveValue],

  getDefaultProps: function () {
    return {
      sep: ',',
      textTpl: '{text}',
      valueTpl: '{id}'
    }
  },

  getInitialState: function () {
    return {
      data: [],
      inited: false
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    // initValue 和 initData 分开处理
    if (nextState.value !== this.state.value) {
      this.initValue(nextState.value)
    }
  },

  formatValue: function (value) {
    return Strings.toArray(value, this.props.sep)
  },

  initValue: function (value) {
    this.init(this.state.data, value)
  },

  initData: function (data) {
    let tt = this.props.textTpl
    let vt = this.props.valueTpl
    let setTpl = function (arr) {
      arr.forEach(d => {
        d.$text = Strings.substitute(tt, d)
        d.$value = Strings.substitute(vt, d)
        if (d.children) {
          setTpl(d.children)
        }
      })
    }
    setTpl(data)
    this.init(data, this.state.value)
  },

  // 初始化数据，不在item里面判断，在元数据里加入deep和status，减少判断和item.setState次数
  init: function (data, values) {
    let getStatus = function (d, last, deep) {
      let val = d.$value,
          status,
          newDeep,
          nextDeep
      if (deep === undefined) {
        newDeep = []
        nextDeep = [last ? 0 : 1]
      } else {
        newDeep = deep.slice()
        if (!d.children || d.children.length === 0) {
          newDeep.push(last ? 2 : 1)
        }
        nextDeep = deep.slice()
        nextDeep.push(last ? 0 : 1)
      }
      if (d.children && d.children.length > 0) {
        let count = d.children.length
        d.children.forEach((sub, i) => {
          let subStatus = getStatus(sub, i === (count - 1), nextDeep)
          if (status === undefined) {
            status = subStatus
          } else if (status !== subStatus) {
            status = 1
          }
        })
      } else {
        status = values.indexOf(val) >= 0 ? 2 : 0
      }
      d.$status = status
      d.$deep = newDeep
      return status
    }
    for (let i = 0, count = data.length; i < count; i++) {
      getStatus(data[i], i === (count - 1))
    }
    this.setState({ data })
  },

  isInitialed: function () {
    let data = this.state.data
    if (data.length === 0) {
      return true
    }
    return !!data[0].$deep
  },

  toggleAll: function (open) {
    Objects.forEach(this.refs, function (ref) {
      ref.toggleAll(open)
    })
  },

  getValue: function (sep) {
    let list = [],
        values = [],
        greedy = this.props.greedy
    Objects.forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy)
    })

    list.forEach(function (d) {
      values.push(d.$value)
    })

    if (sep === undefined) {
      sep = this.props.sep
    }
    if (sep) {
      values = values.join(this.props.sep)
    }
    return values
  },

  handleChange: function () {
    if (this.props.onChange) {
      //setTimeout(() => {
        this.props.onChange(this.getValue())
      //})
    }
  },

  onClick: function (item) {
    if (this.props.onClick) {
      this.props.onClick(item)
    }
  },

  render: function () {
    let value = this.state.value
    let { checkAble, readOnly, open } = this.props

    let items = this.state.data.map(function (item, i) {
      return (
        <Item ref={i}
          open={open}
          readOnly={readOnly}
          onClick={this.onClick}
          onStatusChange={this.handleChange}
          value={value}
          checkAble={checkAble}
          key={i}
          data={item}
        />
      )
    }, this)

    let className = this.getClasses('tree', {
      readonly: this.props.readOnly
    })

    return (
      <ul className={className}>{items}</ul>
    )
  }
})

let Item = React.createClass({
  displayName: 'Tree/Item',

  propTypes: {
    checkAble: React.PropTypes.bool,
    data: React.PropTypes.object,
    onClick: React.PropTypes.func,
    onStatusChange: React.PropTypes.func,
    open: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.any
  },

  getInitialState: function () {
    return {
      open: this.props.open,
      status: this.props.data.$status || 0
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({status: this.props.data.$status})
    }
  },

  toggle: function () {
    let open = !this.state.open
    this.setState({open: open})
  },

  toggleAll: function (open) {
    this.setState({open: open})
    Objects.forEach(this.refs, function (ref) {
      ref.toggleAll(open)
    })
  },

  check: function () {
    if (this.props.readOnly) {
      return
    }

    let status = this.state.status
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

  onClick: function (data) {
    // check if event
    data = data.hasOwnProperty('_dispatchListeners') ? this.props.data : data
    if (this.props.onClick) {
      this.props.onClick(data)
    }
  },

  updateStatus: function () {
    let status
    for (let k in this.refs) {
      if (this.refs.hasOwnProperty(k)) {
        let s = this.refs[k].getStatus()
        if (status === undefined) {
          status = s
          if (status === 1) {
            break
          }
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
    let checked = greedy ? 1 : 2
    if (this.state.status >= checked) {
      list.push(this.props.data)
    }
    Objects.forEach(this.refs, function (ref) {
      ref.getChecked(list, greedy)
    })
  },

  render: function () {
    let children,
        handle,
        check,
        checkClass,
        type,
        marks = []

    let { data, checkAble, readOnly, open, value } = this.props

    if (data.children) {
      let items = data.children.map(function (item, i) {
        return (
          <Item ref={i}
            key={i}
            open={open}
            readOnly={readOnly}
            value={value}
            checkAble={checkAble}
            data={item}
            onClick={this.onClick}
            onStatusChange={this.updateStatus}
          />
        )
      }, this)

      children = <ul className={classnames({open: this.state.open})}>{items}</ul>
      type = this.state.open ? "folder-open" : "folder"
      handle = (
        <a onClick={this.toggle} className="handle">
          <i className={'tree-icon ' + (this.state.open ? "minus" : "plus")} />
        </a>
      )
    } else {
      type = "file"
    }

    if (checkAble) {
      check = ["square", "half-check", "check"][this.state.status]
      checkClass = classnames("check-handle", ["", "half-checked", "checked"][this.state.status])
    }

    for (let i = 0, count = data.$deep.length; i < count; i++) {
      let d = data.$deep[i]
      let mc = classnames("marks", {
        "marks-h": d > 1 || (Objects.isEmpty(data.children) && count - 1 === i),
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
          <i className={'tree-icon ' + type} />
          {
            checkAble &&
            <a className={checkClass} onClick={this.check}><i className={'tree-icon ' + check} /></a>
          }
          <span onClick={this.onClick} className="text">{data.$text}</span>
        </label>
        {children}
      </li>
    )
  }
})

module.exports = Tree

require('./form-control.jsx').register(

  'tree',

  function (props) {
    return <Tree {...props} />
  },

  Tree,

  'array'
)
