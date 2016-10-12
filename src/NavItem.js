import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import { getGrid } from './utils/grids'

import _styles from './styles/_nav.scss'

class NavItem extends Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    if (this.props.disabled) return
    this.props.onClick && this.props.onClick()
    this.props.onChoose && this.props.onChoose()
  }

  render () {
    const {active, grid, href, children, disabled} = this.props

    const className = classnames(
      _styles.link,
      active && _styles.active,
      grid && _styles.center,
      disabled && _styles.disabled
    )

    return (
      <li className={classnames(_styles.item, getGrid(grid))}>
        <a href={href}
          className={className}
          onClick={this.handleClick}>
          {children}
        </a>
      </li>
    )
  }
}

NavItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  disabled: PropTypes.bool,
  grid: PropTypes.grid,
  href: PropTypes.string,
  onChoose: PropTypes.func,
  onClick: PropTypes.func,
  text: PropTypes.string
}

export default NavItem
