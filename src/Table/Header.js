import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from '../utils/proptypes'
import PureRender from '../mixins/PureRender'

import _tables from '../styles/_tables.scss'

function getClassName (base, name, asc, status) {
  return classnames(
    base,
    name === status.key && asc === status.asc && _tables.active
  )
}

class Header extends Component {
  render () {
    const { className, onSort, sortStatus, onPageChange, name, sort, header, children } = this.props

    const handleSort = (asc, fn) => {
      if (name === sortStatus.key && asc === sortStatus.asc) return
      return function () {
        onSort(name, asc, fn)
        onPageChange && onPageChange(1)
      }
    }

    let icons

    if (sort === true || Array.isArray(sort)) {
      let fns = sort === true ? [] : sort
      icons = [
        <a key="up" onClick={handleSort(0, fns[0])} className={getClassName(_tables['sort-up'], name, 0, sortStatus)} />,
        <a key="down" onClick={handleSort(1, fns[1])} className={getClassName(_tables['sort-down'], name, 1, sortStatus)} />
      ]
    } else if (typeof sort === 'function') {
      icons = <a onClick={handleSort(0, sort)} className={getClassName(_tables['sort-one'], name, 0, sortStatus)} />
    }

    return <th className={className}>{header}{children}{icons}</th>
  }
}

Header.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  content: PropTypes.any,
  header: PropTypes.any,
  hidden: PropTypes.bool,
  name: PropTypes.string,
  onPageChange: PropTypes.func,
  onSort: PropTypes.func,
  sort: PropTypes.array_bool_func,
  sortStatus: PropTypes.object,
  width: PropTypes.number_string
}

Header.defaultProps = {
  hidden: false,
  sortStatus: {}
}

export default PureRender(true)(Header)
