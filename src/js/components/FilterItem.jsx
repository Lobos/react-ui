'use strict'

import React from 'react'
import Datetime from './Datetime.jsx'
import Input from './Input.jsx'
import Select from './Select.jsx'
import styles from '../../less/filter.less'

const DEFAULT_OPS = ['=', 'like', '>', '>=', '<', '<=', 'in', 'not in']

export default class FilterItem extends React.Component {
  static displayName = 'FilterItem'

  static propTypes = {
    data: React.PropTypes.array,
    dataIndex: React.PropTypes.number, // current label
    index: React.PropTypes.number, // for onChange update filters
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    op: React.PropTypes.string,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  }

  static defaultProps = {
    type: 'text'
  }

  componentWillMount () {
    this.initData(this.props.data)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.initData(nextProps.data)
    }
  }

  state = {
    data: [],
    dataIndex: this.props.dataIndex,
    label: this.props.label,
    name: this.props.name,
    op: this.props.op,
    ops: null,
    value: this.props.value
  }

  initData (data) {
    data = data.map((d, i) => {
      d.dataIndex = i
      return d
    })
    this.setState({ data })
  }

  onLabelChange (dataIndex) {
    dataIndex = parseInt(dataIndex)
    let data = this.state.data[dataIndex]
    let filter = {
      dataIndex: dataIndex,
      label: data.label,
      name: data.name,
      op: null,
      ops: data.ops || DEFAULT_OPS
    }
    this.setState(filter)
    //this.onChange({})
  }

  onOpChange (op) {
    this.setState({ op })
    //this.onChange({})
  }

  onValueChange (value) {
    this.setState({ value })
    //this.onChange({ value })
  }

  onChange (opts) {
    let info = this.getFilter()
    Object.keys(opts).forEach(k => {
      info[k] = opts[k]
    })
    this.props.onChange(this.props.index, info)
  }

  getFilter () {
    return {
      dataIndex: this.state.dataIndex,
      label: this.state.label,
      name: this.state.name,
      op: this.state.op,
      value: this.state.value
    }
  }

  getFunc () {
    return function () {
    }
  }

  renderControl () {
    let data = this.state.data[this.state.dataIndex],
        props = data.props || {},
        onChange = this.onValueChange.bind(this),
        control
    switch (data.type) {
      case 'select':
        control = <Select {...props} />
      break
      case 'datetime':
        control = <Datetime {...props} />
      break
      default:
        control = <Input onChange={onChange} {...props} type="text" />
      break
    }
    return control
  }

  render () {
    return (
      <div className={styles.filterItem}>
        <Select value={this.state.dataIndex} onChange={this.onLabelChange.bind(this)} optionTpl="{label}" valueTpl="{dataIndex}" data={this.state.data} />
        {
          this.state.ops &&
          <Select value={this.state.op} onChange={this.onOpChange.bind(this)} data={this.state.ops} />
        }
        {
          this.state.label &&
          this.renderControl()
        }
      </div>
    )
  }
}

