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
    op: React.PropTypes.string,
    removeFilter: React.PropTypes.func,
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
  }

  onOpChange (op) {
    this.setState({ op })
  }

  onValueChange (value) {
    this.setState({ value })
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

  remove () {
    // setTimeout wait parent clickaway completed
    setTimeout(() => {
      this.props.removeFilter(this.props.index)
    }, 0)
  }

  renderOp () {
    if (this.state.ops) {
      return <Select style={{width: 120}} value={this.state.op} onChange={this.onOpChange.bind(this)} data={this.state.ops} />
    } else {
      return null
    }
  }

  renderControl () {
    if (!this.state.label) {
      return null
    }
    let data = this.state.data[this.state.dataIndex],
        props = data.props || {},
        onChange = this.onValueChange.bind(this),
        style = { width: 240 },
        control
    switch (data.type) {
      case 'select':
        control = <Select value={this.props.value} onChange={onChange} style={style} {...props} />
      break
      case 'datetime':
        control = <Datetime value={this.props.value} onChange={onChange} {...props} />
      break
      default:
        control = <Input value={this.props.value} type={data.type} style={style} onChange={onChange} {...props} type="text" />
      break
    }
    return control
  }

  render () {
    return (
      <div className={styles.filterItem}>
        <Select style={{width: 140}}
          value={this.state.dataIndex}
          onChange={this.onLabelChange.bind(this)}
          optionTpl="{label}"
          valueTpl="{dataIndex}"
          data={this.state.data} />

        { this.renderOp() }

        { this.renderControl() }

        <button onClick={this.remove.bind(this)} className="remove">&times;</button>
      </div>
    )
  }
}

