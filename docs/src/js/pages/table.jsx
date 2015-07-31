'use strict'

import React from 'react'
import prettify from '../prettify'
const {Table, TableHeader, Checkbox, RadioGroup, dataSource} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Table'

  state = {
    bordered: true,
    striped: true,
    height: 300,
    width: '100%'
  }

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
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.bordered} onChange={bordered => this.setState({bordered})} text="bordered" />
            <Checkbox style={{display: 'inline-block'}} checked={this.state.striped} onChange={striped => this.setState({striped})} text="striped" />
          </div>
          <div>
            height: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={height => this.setState({height})} value={this.state.height} data={['auto', 200, 300, 500]} />
          </div>
          <div>
            width: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={width=> this.setState({width})} value={this.state.width} data={['100%', 1200, 2000]} />
          </div>
          <div style={{marginTop: 10}}>
            <Table
              bordered={this.state.bordered}
              striped={this.state.striped}
              width={this.state.width}
              height={this.state.height}
              data={dataSource('json/table.json', { cache: true })}
              header={header}
            />
          </div>
        </div>
      </div>
    )
  }
}
