import React, { Component } from 'react'
import classnames from 'classnames'
import { getOuterHeight, overView, withoutTransition } from '../utils/dom'
import { objectAssign } from '../utils/objects'
import ClickAway from '../higherOrders/ClickAway'
import { getGrid } from '../utils/grids'
import Transition from '../Transition'
import PropTypes from '../utils/proptypes'
import List from '../List'
import SafeHtml from '../SafeHtml'

import _select from '../styles/_select.scss'
import _input from '../styles/_input.scss'

export default class Select extends Component {
  constructor (props) {
    super(props)

    this.state = {
      filter: ''
    }

    this.showOptions = this.showOptions.bind(this)
    this.handleFilter = this.handleFilter.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    if (!this.props.mult) this.props.registerTarget(this.refs.options)
  }

  showOptions () {
    if (this.props.open || this.props.readOnly) {
      return
    }

    this.props.onOpen()
    this.setState({ filter: '' }, () => {
      let offset = getOuterHeight(this.refs.options) + 5

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
    } else if (!this.props.mult) {
      value = value[0]
    }

    return value
  }

  handleChange (item) {
    let index = item.$index
    if (this.props.readOnly) {
      return
    }

    let data = this.props.data
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
    this.setState({ value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  handleRemove (item) {
    if (!this.props.open) {
      return
    }
    // wait checkClickAway completed
    if (this.props.mult) {
      setTimeout(() => {
        this.handleChange(item)
      }, 0)
    } else {
      this.props.onChange()
    }
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
    let { className, grid, open, readOnly, maxShowCount, data, mult, placeholder, style, hasError, required } = this.props
    let { filter, msg, dropup } = this.state
    let result = []

    className = classnames(
      _select.select,
      className,
      getGrid(grid),
      open && _select.open,
      dropup && _select.dropup,
      !mult && _select.single
    )

    let filterText = filter ? filter.toLowerCase() : null

    let hideRemove = false
    if (!mult && required) hideRemove = true

    let options = data.map((d, i) => {
      d.$index = i

      if (d.$selected) {
        result.push(
          <a key={d.$key} className={_select.result}
            href="javascript:;"
            onClick={hideRemove ? undefined : this.handleRemove.bind(this, d)}>
            <SafeHtml>{d.$result}</SafeHtml>
            {!hideRemove && <span className={_select.remove}>&times;</span>}
          </a>
        )
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
        <div className={classnames(_select.control, _input.input, readOnly && _input.disabled, hasError && _input.hasError)}>
        {
          result.length > 0
            ? result
            : <span className={_input.placeholder}>{msg || placeholder}&nbsp;</span>
        }
        </div>
        <Transition act={open ? 'enter' : 'leave'}
          duration={166}
          enter={_select.enter}
          leave={_select.leave}
          tf="ease-out">
          <div ref="options" className={_select.options}>
            {this.renderFilter()}
            <List data={options} maxShowCount={maxShowCount} onChange={this.handleChange} className={_select.optionsWrap} />
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
  hasError: PropTypes.bool,
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
  optionTpl: '{text}',
  sep: ',',
  valueTpl: '{id}'
}
