'use strict'

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import { toArray, substitute } from './utils/strings'
import { getOuterHeight, overView, withoutTransition } from './utils/dom'
import { hashcode, objectAssign } from './utils/objects'
import ClickAway from './higherOrders/ClickAway'
import { getGrid } from './utils/grids'
import Fetch from './higherOrders/Fetch'
import { register } from './higherOrders/FormItem'
import { compose } from './utils/compose'
import Transition from './Transition'
import PropTypes from './utils/proptypes'
import List from './List'

import _select from './styles/_select.scss'
import _input from './styles/_input.scss'

class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    // cache, store selected status
    this.data = []

    this.showOptions = this.showOptions.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.options = findDOMNode(this.refs.options)
    if (!this.props.mult) this.props.registerTarget(this.options)
  }

  showOptions () {
    if (this.props.open || this.props.readOnly) {
      return
    }

    this.props.onOpen()
    this.setState({ filter: '' }, () => {
      let offset = getOuterHeight(this.options) + 5

      let el = this.refs.container
      let dropup = overView(el, offset)

      withoutTransition(el, () => {
        this.setState({ dropup })
      })
    })
  }

  getValue (sep, data) {
    let values = []
    let raw = []
    data.forEach((d) => {
      if (d.$selected) {
        values.push(d.$value)
        raw.push(d)
      }
    })

    let value = values
    if (sep && typeof sep === 'string') {
      value = values.join(sep)
    } else if (typeof sep === 'function') {
      value = sep(raw)
    }

    return value
  }

  formatData (data) {
    let values = toArray(this.props.value, this.props.mult && this.props.sep)

    if (!Array.isArray(data)) {
      data = Object.keys(data).map((key) => {
        return { text: data[key], id: key }
      })
    }

    const { filterAble, valueTpl, optionTpl, resultTpl, groupBy } = this.props
    let noResultTpl = !resultTpl

    data = data.map((d) => {
      if (typeof d !== 'object') {
        d = typeof d === 'string' ? d : d.toString()
        return {
          $html: d,
          $result: d,
          $value: d,
          $filter: d.toLowerCase(),
          $selected: values.indexOf(d) >= 0,
          $key: hashcode(d)
        }
      }

      // speed filter
      if (filterAble) {
        d.$filter = (Object.keys(d).map((k) => d[k])).join(',').toLowerCase()
      }

      let val = substitute(valueTpl, d)
      d.$html = substitute(optionTpl, d)
      d.$result = noResultTpl ? d.$html : substitute(this.props.resultTpl, d)
      d.$value = val
      d.$selected = values.indexOf(val) >= 0
      d.$key = d.id ? d.id : hashcode(val + d.$html)
      return d
    })

    if (groupBy) {
      let groups = {}
      data.forEach((d) => {
        let key = d[groupBy]
        if (!groups[key]) {
          groups[key] = []
        }
        groups[key].push(d)
      })
      data = []
      Object.keys(groups).forEach((k) => {
        data.push({ $group: k })
        data = data.concat(groups[k])
      })
    }

    this.data = data
    return data
  }

  handleChange (item) {
    let index = item.$index
    if (this.props.readOnly) {
      return
    }

    let data = this.data
    if (this.props.mult) {
      data[index].$selected = !data[index].$selected
    } else {
      data.map((d, i) => {
        if (typeof d === 'object') {
          d.$selected = index === i
        }
      })
      this.props.onClose()
    }

    let value = this.getValue(this.props.sep, data)
    this.setState({ value, data })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleRemove (item) {
    if (!this.props.open) {
      return
    }
    // wait checkClickAway completed
    setTimeout(() => {
      this.handleChange(item)
    }, 0)
  }

  handleFilter (e) {
    this.setState({ filter: e.target.value })
  }

  renderFilter () {
    if (this.props.filterAble) {
      return (
        <div className={_select.filter}>
          <input className={classnames(_input.input)}
            value={this.state.filter}
            onChange={ this.handleFilter }
            type="text" />
        </div>
      )
    }
  }

  render () {
    let { className, grid, open, readOnly, maxShowCount, data, mult, placeholder, style } = this.props
    let { filter, msg, dropup } = this.state
    let result = []

    data = this.formatData(data)

    className = classnames(
      _select.select,
      className,
      getGrid(grid),
      open && _select.open,
      dropup && _select.dropup,
      !mult && _select.single
    )

    let filterText = filter ? filter.toLowerCase() : null

    let options = data.map((d, i) => {
      d.$index = i

      if (d.$selected) {
        if (mult) {
          result.push(
            <div key={d.$key} className={_select.result}
              onClick={this.handleRemove.bind(this, d)}>
              <span dangerouslySetInnerHTML={{__html: d.$result}} />
              <a href="javascript:;">&times;</a>
            </div>
          )
        } else {
          result.push(
            <span key={d.$key} dangerouslySetInnerHTML={{__html: d.$result}} />
          )
        }
      }

      return d
    })

    // filter by search text
    if (filterText) {
      options = options.filter((d) => {
        return !d.$filter || d.$filter.indexOf(filterText) > -1
      })
    }

    return (
      <div ref="container" onClick={this.showOptions} style={style} className={className}>
        <div className={classnames(_select.control, _input.input, readOnly && _input.disabled)}>
        {
          result.length > 0
            ? result
            : <span className={_input.placeholder}>{msg || placeholder}&nbsp;</span>
        }
        </div>
        <Transition ref="options" act={open ? 'enter' : 'leave'} duration={166} tf="ease-out">
          <div className={_select.options}>
            {this.renderFilter()}
            <List data={options} onChange={this.handleChange} className={_select.optionsWrap} />
          </div>
        </Transition>
      </div>
    )
  }
}

Select.displayName = 'Select'

Select.propTypes = objectAssign({
  className: PropTypes.string,
  data: PropTypes.array_object,
  filterAble: PropTypes.bool,
  grid: PropTypes.grid,
  groupBy: PropTypes.string,
  maxShowCount: PropTypes.number,
  mult: PropTypes.bool,
  onChange: PropTypes.func,
  optionTpl: PropTypes.tpl,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  responsive: PropTypes.string,
  resultTpl: PropTypes.tpl,
  sep: PropTypes.string,
  style: PropTypes.object,
  value: PropTypes.any,
  valueTpl: PropTypes.tpl,
  width: PropTypes.number
}, ClickAway.propTypes)

Select.defaultProps = {
  dropup: false,
  maxShowCount: 30,
  sep: ',',
  optionTpl: '{text}',
  valueTpl: '{id}'
}

export default compose(
  register('select', {valueType: 'array'}),
  Fetch,
  ClickAway
)(Select)

