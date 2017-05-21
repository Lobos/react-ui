import React, { Component, Children, cloneElement } from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'
import { getGrid } from './utils/grids'
import NavItem from './NavItem'

import _styles from './styles/_nav.scss'

class Nav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeId: props.active
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.active !== this.props.active) {
      this.setState({ activeId: nextProps.active })
    }
  }

  handleChoose (id) {
    const {onSelect} = this.props

    this.setState({activeId: id}, () => {
      onSelect && onSelect.call(this, id)
    })
  }

  renderItems () {
    const { active, stateLess, children } = this.props
    const { activeId } = this.state
    const items = Children.map(children, (child, i) => {
      if (!child) return
      const id = child.props.id || i.toString()
      const props = {
        active: stateLess ? active === id : activeId === id,
        id,
        onChoose: this.handleChoose.bind(this, id)
      }
      return cloneElement(child, props)
    })

    return items
  }

  render () {
    const {grid, type, inline, ...other} = this.props

    const className = classnames(
      other.className,
      _styles.nav,
      type === 'pill' ? _styles.pills : _styles.tabs,
      (inline || type === 'tab') ? _styles.inline : _styles.stacked,
      getGrid(grid)
    )

    return (
      <ul className={className}>
        {this.renderItems()}
      </ul>
    )
  }
}

Nav.propTypes = {
  active: PropTypes.string,
  children: PropTypes.array_element,
  className: PropTypes.string,
  grid: PropTypes.grid,
  inline: PropTypes.bool,
  onSelect: PropTypes.func,
  stateLess: PropTypes.bool,
  type: PropTypes.string
}

Nav.defaultProps = {
  type: 'pill'
}

Nav.Item = NavItem

export default Nav
