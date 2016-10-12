import React, { Component, Children, cloneElement } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import Transition from './Transition'
import Button from './Button'
import ButtonGroup from './ButtonGroup'
import PureRender from './mixins/PureRender'
import ClickAway from './higherOrders/ClickAway'
import { compose } from './utils/compose'
import { objectAssign } from './utils/objects'

import _styles from './styles/_dropdown.scss'

class Dropdown extends Component {
  constructor (props) {
    super(props)

    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle () {
    this.props.open ? this.props.onClose() : this.props.onOpen()
  }

  renderChildren (children) {
    return Children.toArray(children).map((child, i) => {
      if (!child || !child.props) return child

      // divider
      if (child.type === 'hr') {
        return <div key={i} className={_styles['dropdown-divider']} />
      }

      // handle link only
      if (child.type !== 'a') return child

      const onClick = (e) => {
        this.props.onClose()
        child.props.onClick && child.props.onClick(e)
      }
      return cloneElement(child, {
        className: classnames(child.className, _styles['dropdown-item']),
        onClick
      })
    })
  }

  renderButton (onClick) {
    const { text, status, size } = this.props
    if (!onClick) {
      return (
        <Button status={status}
          size={size}
          onClick={this.handleToggle}
          className={_styles['dropdown-toggle']}>
          {text}
        </Button>
      )
    } else {
      return (
        <ButtonGroup size={size}>
          <Button status={status}
            onClick={onClick}>
            {text}
          </Button>
          <Button status={status}
            onClick={this.handleToggle}
            className={classnames(_styles['dropdown-toggle'], _styles['dropdown-toggle-split'])} />
        </ButtonGroup>
      )
    }
  }

  render () {
    const { children, onClick, open, right, style } = this.props

    const className = classnames(
      this.props.className,
      _styles.dropdown
    )

    return (
      <div className={className} style={style}>
        { this.renderButton(onClick) }
        <Transition act={open ? 'enter' : 'leave'}
          duration={166}
          enter={_styles.enter}
          leave={_styles.leave}
          tf="ease-out">
          <div className={classnames(_styles['dropdown-menu'], right && _styles['dropdown-menu-right'])}>
            {this.renderChildren(children)}
          </div>
        </Transition>
      </div>
    )
  }
}

Dropdown.propTypes = objectAssign({
  children: PropTypes.array_element,
  className: PropTypes.string,
  data: PropTypes.array,
  onClick: PropTypes.func,
  right: PropTypes.bool,
  text: PropTypes.string
}, ClickAway.propTypes)

export default compose(
  PureRender(false),
  ClickAway
)(Dropdown)
