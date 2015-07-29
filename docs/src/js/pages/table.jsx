'use strict'

import React from 'react'
import prettify from '../prettify'
const {Table, dataSource} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Table'

  render () {
    const headers = [
      { key: 'name' }
    ]

    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <h2>表格</h2>
        </div>

        <div className="content">
          <div>
            <Table data={dataSource('json/table.json', { cache: true })} headers={headers} />
          </div>
        </div>
      </div>
    )
  }
}
