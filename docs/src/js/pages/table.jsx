'use strict'

import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import Refetch from 'refetch'
import { Cn } from '../Language'
const {Button, Table, Modal, Checkbox, RadioGroup, ValuesHolder} = global.uiRequire()

class TableDemo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bordered: true,
      valuesHolder: true,
      height: 'auto',
      pagination: true,
      position: 'center',
      striped: true,
      width: 'auto'
    }

    this.valuesHolder = new ValuesHolder()
    this.getSelectedName = this.getSelectedName.bind(this)
    this.handleSelectedName = this.handleSelectedName.bind(this)
  }

  componentWillMount () {
    let fetch = Refetch.get('json/table.json', null, {catch: 3600})
    fetch.then(res => {
      return res
    })
    this.setState({ fetch })
  }

  getSelectedName () {
    this.setState({ selectedNames: this.valuesHolder.getValue() })
  }

  handleSelectedName (values) {
    this.setState({ selectedNames: values })
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <h2>表格</h2>
        </div>

        <div className="content">
          <Code>
{`<Table
  bordered={bool}          // 是否显示边框，默认值 false
  selectAble={bool}        // is deprecated, use onSelect instead
  striped={bool}           // 是否交替显示背景，默认值 false
  width={number}           // 表格宽度，默认值 100%
  height={number}          // 表格高度（body部分），默认值 auto
  data={array}             // 数据
  fetch={object}
  pagination={Pagination}  // 分页控件
  onSelect={func|ValuesHolder} // if onSelect is not null, show checkbox
  onSort={func(name, asc)} // TableHeader的sort事件，name为TableHeader的name，asc值为1|0
  columns={array}
/>

columns = [{
  header:{string|element} // 表头内容，string或者ReactElement
  content:{string|func}   // 表格显示内容，{}格式字符串模板或一个返回ReactElement的方法
  hidden:{bool}           // 是否显示，默认为true
  name:{string}           // 必填，字段名称，和data对应，如果不填content，使用name获取数据
  sort:{bool}             // 是否可以排序，默认值为false
  width:{number}          // 宽度
}]
`}
          </Code>
          <div><a href="#/fetch">fetch 参见这里</a></div>

          <h2 className="subhead">pagination</h2>
          <div>
            如果大量数据为非服务端分页，需要在前端分页时，创建一个Pagination控件，作为参数传入。
          </div>

          <h2 className="subhead">content</h2>
          <div>
            content 有三种情况<br />
            第一种不填，表格内容会根据 name 找到对应的字段<br />
            {'第二种模板字符串，{} 形式，例：{foo}-{bar}'}<br />
            第三种为返回ReactElement的方法，例如：<br />
            <pre className="prettyprint">
{`function (data) {
  return <button onClick={this.removeEntity.bind(this, data.id)}>remove</button>
}`}
            </pre>
          </div>

          <h2 className="subhead">ValuesHolder</h2>
          <Cn>如果不想在每次选中/清除每个选项后获取值（需要用state维护状态），可以在onSelect中传入一个ValuesHolder的实例，ValuesHolder内部包含了一个add和remove方法维护选项，不过使用者不需要关心这个。只需要在需要数据的时候，调用getValue(sep)就好了</Cn>
          <Code>
{`let valuesHolder = new ValuesHolder()
...
<Table onSelect={valuesHolder} ... />
...
values = valuesHolder.get(',')`}
          </Code>

          <h2 className="subhead">Example</h2>
          <div>
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.bordered} onChange={bordered => this.setState({bordered})} text="bordered" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.striped} onChange={striped => this.setState({striped})} text="striped" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.valuesHolder} onChange={valuesHolder => this.setState({valuesHolder})} text="valuesHolder" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.pagination} onChange={page => this.setState({pagination: page})} text="pagination" />
          </div>
          <div>
            height: <RadioGroup style={{display: 'inline-block'}} onChange={(height) => this.setState({height})} value={this.state.height} data={['auto', '15rem', '370px', '500px']} />
          </div>
          <div>
            width: <RadioGroup style={{display: 'inline-block'}} onChange={(width) => this.setState({width})} value={this.state.width} data={['auto', '1200px', '2000px']} />
          </div>

          {
            this.state.pagination &&
            <div>
              pagination position: <RadioGroup style={{display: 'inline-block'}} onChange={(position) => this.setState({position})} value={this.state.position} data={['left', 'center', 'right']} />
            </div>
          }

          {
            this.state.valuesHolder &&
            <div>
              <a onClick={this.getSelectedName}>get selected names</a>
            </div>
          }
          <div style={{marginBottom: 10}}>values: {JSON.stringify(this.state.selectedNames)}</div>

          <Example>
<Button status="danger"
  style={{marginBottom: '1rem', display: this.state.valuesHolder ? 'block' : 'none'}}
  onClick={() => { Modal.confirm('Are you sure to delete "' + this.valuesHolder.getValue(',') + '"?', () => {}, 'Warning') }}>
  Delete selected
</Button>
<Table ref="table"
  bordered={this.state.bordered}
  filters={this.state.filters}
  onSelect={this.state.valuesHolder ? this.valuesHolder : this.handleSelectedName}
  striped={this.state.striped}
  width={this.state.width}
  height={this.state.height}
  fetch={{url: 'json/table.json', catch: 3600}}
  sep={null}
  value={['Ashton Cox', 'Airi Satou']}
  valueTpl="name"
  columns={[
    { name: 'name', sort: true, header: 'Name',
      content: (d) => {
        return <a onClick={() => { Modal.alert('点击了:' + d.name) }}>{d.name}</a>
      }
    },
    { name: 'position', hidden: true },
    { name: 'office', sort: true, header: 'Office' },
    { name: 'start_date', content: '{start_date}', header: 'Start Date', sort: [
      (a, b) => a.start_date > b.start_date ? 1 : -1,
      (a, b) => a.start_date < b.start_date ? 1 : -1
    ] },
    { name: 'salary', content: '{salary}', header: 'Salary',
      sort: (a, b) => {
        return parseInt(a.salary.replace(/[\$,]/g, '')) > parseInt(b.salary.replace(/[\$,]/g, '')) ? 1 : -1
      }
    },
    { name: 'tools', width: 60,
      content: (d) => {
        return (
          <a onClick={() => {
            Modal.confirm('确定要删除' + d.name + '吗', () => {
              console.log('just a kidding.')
            })
          }}>删除</a>
        )
      }
    }
  ]}
  pagination={this.state.pagination ? {size: 10, position: this.state.position} : null} />
          </Example>
        </div>
      </div>
    )
  }
}

module.exports = TableDemo
