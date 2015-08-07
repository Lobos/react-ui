'use strict'

import React from 'react'
import prettify from '../prettify'
const { Filter } = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Filter'

  render () {
    let data = [{
      label: '姓名',
      name: 'name',
      ops: ['like', '=']
    }, {
      label: '年龄',
      name: 'age',
      ops: ['>=', '<'],
      type: 'number'
    }]

    return (
      <div>
        <div className="header">
          <h1>Filter</h1>
          <h2>筛选器</h2>
        </div>

        <div className="content">
          <Filter data={data} />
        </div>
      </div>
    )
  }
}
