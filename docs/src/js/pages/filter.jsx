'use strict'

import React from 'react'
import prettify from '../prettify'
const { Filter, dataSource } = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Filter'

  state = {
    filterText: ''
  }

  render () {
    let data = [{
      label: '姓名',
      name: 'name',
      ops: ['like', '=', 'startWidth']
    }, {
      label: '年龄',
      name: 'age',
      ops: ['>=', '<'],
      type: 'number'
    }, {
      label: '国籍',
      name: 'country',
      ops: ['='],
      type: 'select',
      props: { data: dataSource('json/countries.json'), optionTpl: '{country}', valueTpl: '{en}' }
    }]

    return (
      <div>
        <div className="header">
          <h1>Filter</h1>
          <h2>筛选器</h2>
        </div>

        <div className="content">
          <Filter onFilter={fs => this.setState({ filterText: JSON.stringify(fs) })} data={data} />
          <div>{this.state.filterText}</div>
        </div>
      </div>
    )
  }
}
