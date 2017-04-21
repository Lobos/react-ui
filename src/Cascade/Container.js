import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import Item from './Item'

import _styles from '../styles/_cascade.scss'

export default class Container extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  getData (val, data) {
    if (!data) return

    const items = data.filter(d => d.$value === val)
    return items[0]
  }

  handleClick (level, d) {
    const path = this.props.path.slice(0, level)
    path.push(d.$value)
    this.props.onPathChange(path, d)
  }

  renderItems (data, level, checked) {
    const { path, onLazyClick, maxLevel, onSelect, value } = this.props
    const val = path[level]
    const key = level === 0
      ? 'root'
      : path[level - 1]

    return (
      <ul key={key}>
      {
        data.map(d => (
          <Item key={d.$key}
            active={val === d.$value}
            data={d}
            lazy={!!onLazyClick}
            level={level}
            maxLevel={maxLevel}
            onSelect={onSelect}
            value={value}
            onClick={this.handleClick} />
        ))
      }
      </ul>
    )
  }

  renderList () {
    const { data, path } = this.props
    let currentData = data

    const lists = []

    for (let i = 0; i < path.length; i++) {
      const d = this.getData(path[i], currentData)
      lists.push(this.renderItems(currentData, i))
      if (d && d.children) currentData = d.children
      else break
    }
    return lists
  }

  render () {
    return <div className={_styles['cascade-options']}>{this.renderList()}</div>
  }
}

Container.propTypes = {
  data: PropTypes.array,
  lazy: PropTypes.bool,
  maxLevel: PropTypes.number,
  onLazyClick: PropTypes.func,
  onPathChange: PropTypes.func,
  onSelect: PropTypes.func,
  path: PropTypes.array,
  value: PropTypes.array
}

Container.defaultProps = {
  path: ['']
}
