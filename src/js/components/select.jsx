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

let Select = React.createClass({
  displayName: 'Select',

  propTypes: {
    cache: React.PropTypes.bool,
    data: React.PropTypes.array,
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
    valueKey: React.PropTypes.string
  },

  mixins: [Classable, ReceiveValue, Resource],

  getDefaultProps: function () {
    return {
      sep: ',',
      option: '{text}',
      valueKey: 'value'
    }
  },

  getInitialState: function () {
    return {
      active: true,
      data: [],
      filter: ''
    }
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
        d.$filter = (Object.keys(d).map(k => d[k])).join(',')
      }

      let val = d[this.props.valueKey]
      d.$option = Strings.substitute(this.props.optionTpl, d)
      d.$result = Strings.substitute(this.props.resultTpl || this.props.optionTpl, d)
      d.$value = val
      d.$checked = value.indexOf(val) >= 0
      return d
    })
    this.setState({ data: data })
  },

  handleChange: function (i) {
    let data = clone(this.state.data)
    if (this.props.mult) {
      data[i].$checked = !data[i].$checked
    } else {
      data.map(d => {
        d.$checked = false
      })
      data[i].$checked = true
    }
    this.setState({ data })
    if (this.props.onChange) {
      this.props.onChange()
    }
  },

  render: function () {
    let active = this.state.active
    let show = []

    let className = this.getClasses('select form-control', {
      active: active,
      single: !this.props.mult
    })

    let placeholder = this.state.msg || this.props.placeholder

    let filter = this.props.filterAble ?
                 <div className="filter"><input onChange={ e=>this.setState({ filter: e.target.value }) } type="text" /></div> :
                 null
    let filterText = this.state.filter

    let options = this.state.data.map(function (d, i) {
      if (d.$checked) {
        if (this.props.mult) {
          show.push(
            <div className="result"
              onClick={this.handleChange.bind(this, i)}
              dangerouslySetInnerHTML={{__html: d.$result}}
            />
          )
        } else {
          show.push(<span dangerouslySetInnerHTML={{__html: d.$result}} />)
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
      <div className={className}>
        { show.length > 0 ? show : <span className="placeholder">{placeholder}&nbsp;</span> }
        <div className="options">
          {filter}
          <ul>{options}</ul>
        </div>
      </div>
    )
  }
})

module.exports = Select
