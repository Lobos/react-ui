'use strict'

import React from 'react'
import prettify from '../prettify'
const {Table, TableHeader, Pagination, Checkbox, RadioGroup, dataSource} = global.uiRequire()

@prettify
export default class Page extends React.Component {
  static displayName = 'Pages/Table'

  componentWillMount () {
    let data = dataSource('json/table.json', null, { cache: true })
    data.then(res => {
      this.setState({ total: res.length })
    })
    this.setState({ data })
  }

  state = {
    bordered: true,
    checkAble: true,
    data: [],
    height: 300,
    pagination: false,
    striped: true,
    total: 0,
    width: '100%'
  }

  render () {
    let pagination = <Pagination size={10} total={this.state.total} />

    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <h2>表格</h2>
        </div>

        <div className="content">
          <div>
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.bordered} onChange={bordered => this.setState({bordered})} text="bordered" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.striped} onChange={striped => this.setState({striped})} text="striped" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.checkAble} onChange={checkAble => this.setState({checkAble})} text="checkAble" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.pagination} onChange={page => this.setState({pagination: page})} text="pagination" />
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
              checkAble={this.state.checkAble}
              striped={this.state.striped}
              width={this.state.width}
              height={this.state.height}
              data={this.state.data}
              pagination={this.state.pagination ? pagination : null}>

              <TableHeader name="name" sortAble={true} content="{name}">Name</TableHeader>
              <TableHeader key={2} name="position">Position</TableHeader>
              <TableHeader key={3} name="office" sortAble={true}>Office</TableHeader>
              <TableHeader key={4} name="start_date" sortAble={true} content="{start_date}">Start Date</TableHeader>
              <TableHeader key={5} name="salary" content="{salary}">Salary</TableHeader>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}
