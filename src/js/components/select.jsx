'use strict'

require('../../less/form.less')
require('../../less/select.less')

let React = require('react')
let classnames = require('classnames')
let Strings = require('../utils/strings')
let clone = require('../utils/clone')
let Classable = require('../mixins/classable')
let Resource = require('../mixins/resource')
let ReceiveValue = require('../mixins/receive-value')
let ClickAwayable = require('../mixins/click-awayable')

let Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    cache: React.PropTypes.bool,
    data: React.PropTypes.array,
    dropup: React.PropTypes.bool,
    filterAble: React.PropTypes.bool,
    groupBy: React.PropTypes.string,
    mult: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    optionTpl: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    resultTpl: React.PropTypes.string,
    sep: React.PropTypes.string,
    src: React.PropTypes.src,
    value: React.PropTypes.any,
    valueTpl: React.PropTypes.string
  },

  mixins: [Classable, ReceiveValue, Resource, ClickAwayable],

  getDefaultProps: function () {
    return {
      sep: ',',
      optionTpl: '{text}',
      valueTpl: '{id}'
    }
  },

  getInitialState: function () {
    return {
      active: false,
      data: [],
      filter: ''
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    if (nextState.active) {
      this.bindClickAway()
    } else {
      this.unbindClickAway()
    }
  },

  componentClickAway: function () {
    this.close()
  },

  open: function () {
    if (!this.state.active && !this.props.readOnly) {
      React.findDOMNode(this.refs.options).style.display = 'block'
      setTimeout(() => {
        this.setState({ filter: '', active: true })
      }, 0)
    }
  },

  close: function () {
    this.setState({ active: false })
    // use setTimeout instead of transitionEnd
    setTimeout(() => {
      if (this.state.active === false) {
        React.findDOMNode(this.refs.options).style.display = 'none'
      }
    }, 500)
  },

  formatValue: function (value) {
    value = Strings.toArray(value, this.props.sep)
    if (this.state) {
      let data = clone(this.state.data).map(d => {
        d.$checked = value.indexOf(d.$value)
        return d
      })
      this.setState({ data: data })
    }
    return value
  },

  initData: function (data) {
    let value = this.state.value
    data = data.map(d => {
      if (typeof d !== 'object') {
        return {
          $option: d,
          $result: d,
          $value: d,
          $filter: d,
          $checked: value.indexOf(d) >= 0
        }
      }

      // speed filter
      if (this.props.filterAble) {
        d.$filter = (Object.keys(d).map(k => d[k])).join(',').toLowerCase()
      }

      let val = Strings.substitute(this.props.valueTpl, d)
      d.$option = Strings.substitute(this.props.optionTpl, d)
      d.$result = Strings.substitute(this.props.resultTpl || this.props.optionTpl, d)
      d.$value = val
      d.$checked = value.indexOf(val) >= 0
      return d
    })

    if (this.props.groupBy) {
      let groups = {},
          groupBy = this.props.groupBy
      data.forEach(d => {
        let key = d[groupBy]
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(d)
      })
      data = []
      Object.keys(groups).forEach(k => {
        data.push(k)
        data = data.concat(groups[k])
      })
    }

    this.setState({ data: data })
  },

  getValue: function (sep = this.props.sep, data = this.state.data) {
    let value = []
    data.forEach(d => {
      if (d.$checked) {
        value.push(d.$value)
      }
    })

    if (sep) {
      value = value.join(sep)
    }

    return value
  },

  handleChange: function (i) {
    if (this.props.readOnly) {
      return
    }

    let data = clone(this.state.data)
    if (this.props.mult) {
      data[i].$checked = !data[i].$checked
      this.setState({ data })
    } else {
      data.map(d => {
        if (typeof d !== 'string') {
          d.$checked = false
        }
      })
      data[i].$checked = true
      this.setState({ data })
      this.close()
    }
    if (this.props.onChange) {
      let value = this.getValue(this.props.sep, data)
      this.props.onChange(value)
    }
  },

  render: function () {
    let active = this.state.active
    let result = []

    let className = this.getClasses('select form-control', {
      active: active,
      readonly: this.props.readOnly,
      dropup: this.props.dropup,
      single: !this.props.mult
    })

    let placeholder = this.state.msg || this.props.placeholder

    let filter = this.props.filterAble ?
                 (<div className="filter">
                    <i className="search" />
                    <input value={this.state.filter}
                      onChange={ e=>this.setState({ filter: e.target.value }) }
                      type="text" />
                  </div>) :
                 null

    let filterText = this.state.filter ?
                     this.state.filter.toLowerCase() :
                     null

    let options = this.state.data.map(function (d, i) {
      if (typeof d === 'string') {
        return <span key={i} className="show group">{d}</span>
      }

      if (d.$checked) {
        if (this.props.mult) {
          result.push(
            <div className="result"
              onClick={this.handleChange.bind(this, i)}
              dangerouslySetInnerHTML={{__html: d.$result}}
            />
          )
        } else {
          result.push(<span dangerouslySetInnerHTML={{__html: d.$result}} />)
        }
      }
      let optionClassName = classnames({
        active: d.$checked,
        show: filterText ? d.$filter.indexOf(filterText) >= 0 : true
      })
      return (
        <li key={i}
          onClick={this.handleChange.bind(this, i)}
          className={ optionClassName }
          dangerouslySetInnerHTML={{__html: d.$option}}
        />
      )
    }, this)

    return (
      <div onClick={this.open} className={className}>
        { result.length > 0 ? result : <span className="placeholder">{placeholder}&nbsp;</span> }
        <div className="options-wrap">
          <hr />
          <div ref="options" className="options">
            {filter}
            <ul>{options}</ul>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Select

require('./form-control.jsx').register(

  'select',

  function (props) {
    return <Select {...props} />
  },

  'array'
)
