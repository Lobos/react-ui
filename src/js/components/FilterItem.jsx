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
    label: React.PropTypes.string,
    name: React.PropTypes.string,
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
    label: this.props.label,
    name: this.props.name,
    op: this.props.op,
    ops: null,
    value: this.props.value
  }

  initData (data) {
    data = data.map((d, i) => {
      d.id = i
      return d
    })
    this.setState({ data })
  }

  onLabelChange (id) {
    let data = this.state.data[id]
    this.setState({
      index: id,
      label: data.label,
      name: data.name,
      op: null,
      ops: data.ops || DEFAULT_OPS
    })
  }

  onOpChange (op) {
    this.setState({ op })
  }

  getFunc () {
    return function () {
    }
  }

  renderControl () {
    let data = this.state.data[this.state.index],
        props = data.props || {},
        control
    switch (data.type) {
      case 'select':
        control = <Select {...props} />
      break
      case 'datetime':
        control = <Datetime {...props} />
      break
      default:
        control = <Input {...props} type="text" />
      break
    }
    return control
  }

  render () {
    return (
      <div className={styles.filterItem}>
        <Select onChange={this.onLabelChange.bind(this)} optionTpl="{label}" data={this.state.data} />
        {
          this.state.ops &&
          <Select onChange={this.onOpChange.bind(this)} data={this.state.ops} />
        }
        {
          this.state.label &&
          this.renderControl()
        }
      </div>
    )
  }
}

