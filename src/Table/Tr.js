import React, { Component } from 'react'
import PropTypes from '../utils/proptypes'
import { substitute } from '../utils/strings'
import { Checkbox } from '../Checkbox'
import PureRender from '../mixins/PureRender'

import _tables from '../styles/_tables.scss'

class Tr extends Component {
  render () {
    const { columns, data, checked, onSelect, disableCheck } = this.props

    let disabled
    if (disableCheck) {
      disabled = disableCheck(data)
    }

    let tds = []
    if (onSelect) {
      tds.push(
        <td className={_tables.checkbox} key="checkbox">
          <Checkbox isIndicator
            checked={checked}
            readOnly={disabled}
            onChange={onSelect.bind(this, data)} />
        </td>
      )
    }
    columns.map((h, j) => {
      if (h.hidden) return

      let content = h.content
      if (typeof content === 'string') {
        content = substitute(content, data)
      } else if (typeof content === 'function') {
        content = content(data)
      } else {
        content = data[h.name]
      }
      tds.push(<td key={h.name || j}>{content}</td>)
    })
    return <tr>{tds}</tr>
  }
}

Tr.propTypes = {
  checked: PropTypes.bool,
  columns: PropTypes.array,
  data: PropTypes.object,
  disableCheck: PropTypes.func,
  onSelect: PropTypes.func
}

export default PureRender(true)(Tr)
