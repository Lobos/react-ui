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
    height: 370,
    pagination: false,
    striped: true,
    total: 0,
    width: '100%'
  }

  getCheckedName () {
    let names = (this.refs.table.getChecked('name')).join(',')
    this.setState({ checkedNames: names })
  }

  render () {
    let pagination = <Pagination size={10} total={this.state.total} />

    let nameTpl = (d) => {
      return <a onClick={() => { window.alert(d.name) }}>{d.name}</a>
    }
    let removeTpl = (d) => {
      return <a onClick={() => { window.alert(`确定要删除${d.name}吗`) }}>删除</a>
    }

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
            height: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={height => this.setState({height})} value={this.state.height} data={['auto', 200, 370, 500]} />
          </div>
          <div>
            width: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={width=> this.setState({width})} value={this.state.width} data={['100%', 1200, 2000]} />
          </div>
          {
            this.state.checkAble &&
            <div>
              <a onClick={this.getCheckedName.bind(this)}>获取选中 Name</a>
              <p>{this.state.checkedNames}</p>
            </div>
          }
          <div style={{marginTop: 10}}>
            <Table ref="table"
              bordered={this.state.bordered}
              checkAble={this.state.checkAble}
              striped={this.state.striped}
              width={this.state.width}
              height={this.state.height}
              data={this.state.data}
              pagination={this.state.pagination ? pagination : null}>

              <TableHeader name="name" sortAble={true} content={nameTpl}>Name</TableHeader>
              <TableHeader name="position" hidden={true}>Position</TableHeader>
              <TableHeader name="office" sortAble={true}>Office</TableHeader>
              <TableHeader name="start_date" sortAble={true} content="{start_date}">Start Date</TableHeader>
              <TableHeader name="salary" content="{salary}">Salary</TableHeader>
              <TableHeader name="tools" content={removeTpl} />
            </Table>
          </div>
        </div>
      </div>
    )
  }
}
