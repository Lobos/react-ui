import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import classnames from 'classnames'
import { objectAssign } from '../utils/objects'
import ClickAway from '../higherOrders/ClickAway'
import Transition from '../Transition'
import Container from './Container'
import { getGrid } from '../utils/grids'
// import { deepEqual } from '../utils/objects'

import _styles from '../styles/_cascade.scss'
import _input from '../styles/_input.scss'

class MultCascade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      path: ['']
    }

    this.handlePathChange = this.handlePathChange.bind(this)
    this.showOptions = this.showOptions.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  componentWillReceiveProps () {
  }

  handlePathChange (path, node) {
    const { maxLevel, onLazyClick } = this.props

    let isEnd
    if (typeof node.isEnd === 'boolean') {
      isEnd = node.isEnd
    } else if (maxLevel <= path.length) {
      isEnd = true
    } else {
      isEnd = onLazyClick
        ? (node.children && node.children.length === 0)
        : (!node.children || node.children.length === 0)
    }

    if (isEnd) return

    if (onLazyClick && !node.children) {
      onLazyClick(node, (data) => {
        if (data && data.length > 0) {
          path.push('')
          this.setState({ path })
        }
      })
    } else {
      path.push('')
      this.setState({ path })
    }
  }

  handleSelect (d, checked) {
    const value = [...this.props.value]
    if (checked) {
      value.push({ text: d.$result, value: d.$value })
    } else {
      let index = value.findIndex(v => v.value === d.$value)
      value.splice(index, 1)
    }
    this.props.onChange(value)
  }

  showOptions () {
    this.props.onOpen()
  }

  handleRemove (index) {
    if (!this.props.open) return

    setTimeout(() => {
      const value = [...this.props.value]
      value.splice(index, 1)
      this.props.onChange(value)
    }, 0)
  }

  getResult () {
    const { value } = this.props
    if (!value || value.length === 0) return

    return value.map((val, i) => (
      <a key={i} onClick={this.handleRemove.bind(this, i)} href="Javascript:;">
        {val.text}
        <span className={_styles.remove}>&times;</span>
      </a>
    ))
  }

  render () {
    const { open, grid, placeholder, readOnly } = this.props

    const className = classnames(
      this.props.className,
      getGrid(grid),
      _styles.cascade,
      _styles['cascade-mult'],
      _input.input,
      readOnly && _input.disabled,
      open && _styles['cascade-open']
    )

    return (
      <div className={className}>
        <div onClick={readOnly ? undefined : this.showOptions}
          className={classnames(_styles['cascade-result'])}>
          {this.getResult() || <span className={_input.placeholder}>{placeholder}</span>}&nbsp;
        </div>
        <Transition act={open ? 'enter' : 'leave'}
          duration={166}
          enter={_styles.enter}
          leave={_styles.leave}
          tf="ease-out">
          <Container {...this.props}
            onPathChange={this.handlePathChange}
            onSelect={this.handleSelect}
            path={this.state.path} />
        </Transition>
      </div>
    )
  }
}

MultCascade.propTypes = objectAssign({
  className: PropTypes.string,
  data: PropTypes.array,
  grid: PropTypes.grid,
  hastily: PropTypes.bool,
  maxLevel: PropTypes.number,
  onLazyClick: PropTypes.func,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  value: PropTypes.array
}, ClickAway.PropTypes)

MultCascade.defaultProps = {
  data: [],
  value: [],
  maxLevel: 999
}

export default ClickAway(MultCascade)

