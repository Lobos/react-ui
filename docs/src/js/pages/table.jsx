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
    data: [],
    striped: true,
    height: 300,
    total: 0,
    width: '100%'
  }

  render () {
    let headers = []
    headers.push(<TableHeader key={1} name="name" sortAble={true} content="{name}">Name</TableHeader>)
    headers.push(<TableHeader key={2} name="position">Position</TableHeader>)
    headers.push(<TableHeader key={3} name="office" sortAble={true}>Office</TableHeader>)
    headers.push(<TableHeader key={4} name="start_date" sortAble={true} content="{start_date}">Start Date</TableHeader>)
    headers.push(<TableHeader key={5} name="salary" content="{salary}">Salary</TableHeader>)

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
              data={this.state.data}
              headers={headers}
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    )
  }
}
