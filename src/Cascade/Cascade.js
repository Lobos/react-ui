import { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { objectAssign } from '../utils/objects'
import ClickAway from '../higherOrders/ClickAway'
import Transition from '../Transition'
import Container from './Container'

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
      console.log(props.data)
  }

  handlePathChange (path, isEnd) {
    this.setState({ path })
    if (isEnd) {
      this.props.onChange(path)
      this.props.onClose()
    }
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
    const { open } = this.props

    const className = classnames(
      this.props.className,
      _styles.cascade
    )

    return (
      <div className={className}>
        <div onClick={this.showOptions} className={_input.input}>{this.getResult()}</div>
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
  value: PropTypes.array
}, ClickAway.PropTypes)

Cascade.defaultProps = {
  data: [],
  value: ['']
}

export default ClickAway(Cascade)
