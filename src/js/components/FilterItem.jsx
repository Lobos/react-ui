'use strict'

import React from 'react'
import Select from './Select.jsx'
import styles from '../../less/filter.less'

export default class FilterItem extends React.Component {
  static displayName = 'FilterItem'

  static propTypes = {
    data: React.PropTypes.array
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
    fn: this.props.fn
  }

  initData (data) {
    data = data.map((d, i) => {
      d.id = i
      return d
    })
    this.setState({ data })
  }

  getFunc () {
    return function () {
    }
  }

  render () {
    return (
      <div className={styles.filterItem}>
        <Select optionTpl="{label}" data={this.state.data} />
      </div>
    )
  }
}
