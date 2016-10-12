import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import classnames from 'classnames'
import { objectAssign } from '../utils/objects'
import ClickAway from '../higherOrders/ClickAway'
import Transition from '../Transition'
import Container from './Container'
import { getGrid } from '../utils/grids'
import { deepEqual } from '../utils/objects'

import _styles from '../styles/_cascade.scss'
import _input from '../styles/_input.scss'

class Cascade extends Component {
  constructor (props) {
    super(props)

    this.state = {
      path: props.value
    }

    this.handlePathChange = this.handlePathChange.bind(this)
    this.showOptions = this.showOptions.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(this.props.value, nextProps.value)) {
      this.setState({ path: [...nextProps.value] })
    }
  }

  handlePathChange (path, node) {
    const { hastily, maxLevel, onLazyClick } = this.props

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

    if (isEnd) {
      this.props.onClose()
      !hastily && this.props.onChange(path)
    } else if (onLazyClick && !node.children) {
      onLazyClick(node, (data) => {
        if (!data || data.length === 0) {
          this.props.onClose()
          !hastily && this.props.onChange(path)
        } else {
          path.push('')
          this.setState({ path })
        }
      })
    } else {
      path.push('')
    }
    hastily && this.props.onChange(path)
    this.setState({ path })
  }

  showOptions () {
    this.props.onOpen()
  }

  getResult () {
    const { data, value } = this.props
    const result = []
    let ds = data
    for (let i = 0; i < value.length; i++) {
      let item = ds.filter(d => d.$value === value[i])[0]
      if (!item) break

      result.push(item.$result)
      if (!item.children) break
      ds = item.children
    }

    return result.join(' ')
  }

  render () {
    const { open, grid, placeholder, readOnly } = this.props

    const className = classnames(
      this.props.className,
      getGrid(grid),
      _styles.cascade,
      _input.input,
      readOnly && _input.disabled
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
            path={this.state.path} />
        </Transition>
      </div>
    )
  }
}

Cascade.propTypes = objectAssign({
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

Cascade.defaultProps = {
  data: [],
  value: [''],
  maxLevel: 999
}

export default ClickAway(Cascade)
