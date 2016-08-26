import { Component, PropTypes } from 'react'
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
    const path = this.props.path.slice(0, level).concat(d.$value, '')
    const isEnd = this.props.lazy
      ? (d.children && d.children.length === 0)
      : !d.children
    this.props.onPathChange(path, isEnd)
  }

  renderItems (data, level) {
    const val = this.props.path[level]
    return (
      <ul key={level}>
      {
        data.map(d => (
          <Item key={d.$key}
            active={val === d.$value}
            data={d}
            level={level}
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
  onPathChange: PropTypes.func,
  path: PropTypes.array
}

Container.defaultProps = {
  path: ['']
}
