import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import { toArray, substitute } from '../utils/strings'
import clone from '../utils/clone'
import { forEach, deepEqual, hashcode } from '../utils/objects'
import { removeClass } from '../utils/dom'
import PropTypes from '../utils/proptypes'

import TreeStyles from '../styles/_tree.scss'

import Item from './Item'

let defaultIcons = []

export class Tree extends Component {
  constructor (props) {
    super(props)

    this.state = {
      data: []
    }

    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)

    if (props.greedy !== undefined) {
      console.warn('greedy is deprecated, use capture instead.')
    }
  }

  componentWillMount () {
    this.formatData(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if (!deepEqual(nextProps.data, this.props.data) || !deepEqual(nextProps.value, this.props.value)) {
      this.formatData(nextProps)
    }

    if (nextProps.sep !== this.props.sep ||
        nextProps.capture !== this.props.capture) {
      setTimeout(() => {
        this.handleChange()
      }, 0)
    }
  }

  getValue (sep) {
    let list = []

    let capture = this.props.capture
    if (this.props.greedy === true) {
      capture = 1
    }

    forEach(this.refs, (ref) => {
      ref.getChecked(list, capture)
    })

    let values = list.map((d) => {
      return d.$value
    })

    if (sep === undefined) {
      sep = this.props.sep
    }
    if (sep) {
      values = values.join(this.props.sep)
    }
    return values
  }

  setTpl (data, tt, vt) {
    data.forEach((d) => {
      d.$text = substitute(tt, d)
      d.$value = substitute(vt, d)
      d.$key = d.id || d.key || hashcode(`${d.$value}-${d.$text}`)
      if (d.children) {
        this.setTpl(d.children, tt, vt)
      }
    })
  }

  formatData (props) {
    const data = clone(props.data)
    const values = toArray(props.value, props.sep)

    if (data.length === 0) {
      return
    }

    this.setTpl(data, props.textTpl, props.valueTpl)

    let getStatus = function (d, last, deep) {
      let val = d.$value
      let status,
          newDeep,
          nextDeep
      if (deep === undefined) {
        newDeep = []
        nextDeep = [last ? 0 : 1]
      } else {
        newDeep = deep.slice()
        if (!d.children || d.children.length === 0) {
          newDeep.push(last ? 2 : 1)
        }
        nextDeep = deep.slice()
        nextDeep.push(last ? 0 : 1)
      }
      if (d.children && d.children.length > 0) {
        let count = d.children.length
        d.children.forEach((sub, i) => {
          let subStatus = getStatus(sub, i === (count - 1), nextDeep)
          if (status === undefined) {
            status = subStatus
          } else if (status !== subStatus) {
            status = 1
          }
        })
      } else {
        status = values.indexOf(val) >= 0 ? 2 : 0
      }
      d.$status = status
      d.$deep = newDeep
      return status
    }
    for (let i = 0, count = data.length; i < count; i++) {
      getStatus(data[i], i === (count - 1))
    }

    this.setState({ data })
  }

  toggleAll (open) {
    forEach(this.refs, function (ref) {
      ref.toggleAll(open)
    })
  }

  handleChange () {
    if (this.props.onChange) {
      this.props.onChange(this.getValue())
    }
  }

  handleClick (item) {
    let active = TreeStyles.active
    removeClass([].slice.call(findDOMNode(this).querySelectorAll('.' + active)), active)
    if (this.props.onClick) {
      this.props.onClick(item)
    }
  }

  render () {
    const { selectAble, className, onToggle, readOnly, open, icons } = this.props

    const { value, data } = this.state

    // console.log(JSON.stringify(data, null, 2))
    let items = data.map(function (item, i) {
      return (
        <Item ref={i}
          icons={icons || defaultIcons}
          open={open}
          readOnly={readOnly}
          onClick={this.handleClick}
          onStatusChange={this.handleChange}
          onToggle={onToggle}
          value={value}
          selectAble={selectAble}
          key={item.$key}
          data={item}
        />
      )
    }, this)

    let rootClassName = classnames(
      className,
      TreeStyles.tree,
      readOnly && TreeStyles.readonly
    )

    return (
      <ul className={rootClassName}>{items}</ul>
    )
  }
}

Tree.propTypes = {
  capture: PropTypes.oneOf([0, 1, 2, 3]),
  className: PropTypes.string,
  data: PropTypes.array,
  greedy: PropTypes.bool,
  icons: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  onToggle: PropTypes.func,
  open: PropTypes.bool,
  readOnly: PropTypes.bool,
  selectAble: PropTypes.bool,
  sep: PropTypes.string,
  src: PropTypes.string,
  textTpl: PropTypes.tpl,
  value: PropTypes.any,
  valueTpl: PropTypes.tpl
}

Tree.defaultProps = {
  capture: 0,
  sep: ',',
  data: [],
  textTpl: '{text}',
  valueTpl: '{id}'
}

export const setDefaultIcons = function (icons) {
  defaultIcons = icons
}
