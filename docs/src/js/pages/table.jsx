'use strict'

import React from 'react'
import prettify from '../prettify'
const {Table, TableHeader, dataSource} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Table'

  render () {
    let header = []
    header.push(<TableHeader key="name" content="{name}">Name</TableHeader>)
    header.push(<TableHeader key="position" content="{position}">Position</TableHeader>)
    header.push(<TableHeader key="office" content="{office}">Office</TableHeader>)
    header.push(<TableHeader key="start_date" content="{start_date}">Start Date</TableHeader>)
    header.push(<TableHeader key="salary" content="{salary}">Salary</TableHeader>)

    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <h2>表格</h2>
        </div>

        <div className="content">
          <div>
            <Table className="bordered" height={300} data={dataSource('json/table.json', { cache: true })} header={header} />
          </div>
        </div>
      </div>
    )
  }
}
