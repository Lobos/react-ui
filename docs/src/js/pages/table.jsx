import { Component } from 'react'
import Code from '../Code'
import Example from '../Example'
import Refetch from 'refetch'
import { Cn, En } from '../Language'
import { Button, Table, Modal, Filter, Input, Select, DatepickerRange, Checkbox, RadioGroup, ArrayHolder, Lazyload } from 'rctui'

module.exports = class extends Component {
  constructor (props) {
    super(props)
    this.state = {
      bordered: true,
      arrayHolder: true,
      height: 'auto',
      pagination: true,
      position: 'center',
      striped: true,
      size: 'normal',
      width: 'auto'
    }

    this.arrayHolder = new ArrayHolder()
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
    this.setState({ selectedNames: this.arrayHolder.getValue() })
  }

  handleSelectedName (values) {
    this.setState({ selectedNames: values })
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <Cn tag="h2">表格</Cn>
        </div>

        <div className="content">
          <Cn>
            <Code>
{`<Table
  bordered={bool}          // 是否显示边框，默认值 false
  selectAble={bool}        // 已废除，会根据onSelect自动判断是否可筛选
  disableCheck={func(d)}   // 是否禁止单行数据选项，参数为单条数据，返回结果为true，禁止选择
  striped={bool}           // 是否交替显示背景，默认值 false
  width={number}           // 表格宽度，默认值 100%
  height={number}          // 表格高度（body部分），默认值 auto
  data={array}             // 数据
  fetch={object}
  pagination={             // 内置分页选项
    size: int,             // 每页显示数量，默认值 20
    page: int,             // 当前页码
    total: int,            // 总条目数，默认值data.length
    range: int,            // 显示的分页按钮数
    onChange(int),         //
    position: 'string'     // 位置，'left|right|center', 默认值 'center'
  }
  onSelect={func|ArrayHolder} // 如果设置了onSelect，会自动增加checkbox列
  onSort={func(            // 自定义内置排序
    string,                // 字段名
    int                    // 0 - 正序, 1 - 倒序
  )}
  columns={array}
/>

columns = [{
  header:{string|element} // 表头单元格内容
  content:{string|func}   // 表格内容
  hidden:{bool}           // 默认值false
  name:{string}           // 字段名，如果content没有设置，使用data[name]
  sort:{bool|func|array}  // sort === true, 使用内置排序
                             typeof sort === 'method', 使用 data.sort(method)
                             如果sort是由两个函数组成的二维数组, 第一个函数作为正序排序, 第二个函数用于倒序排序
  width:{number}          // 列宽度，如果不设定，会使用第一次render时自动生成的宽度
}]
`}
            </Code>
          </Cn>
          <En>
            <Code>
{`<Table
  bordered={bool}          // default value is false
  striped={bool}           // default value is false
  width={number}           // default value is 100%
  height={number}          // body height, default is 'auto'
  data={array}             //
  fetch={object}
  pagination={             // internal pagination
    size: int,             // how many items per page, default is 20
    page: int,             // current page
    total: int,            // defautl value is data.length
    range: int,            // page buttons number
    onChange(int),         // page change callback
    position: 'string'     // 'left|right|center', default is 'center'
  }
  onSelect={func|ArrayHolder} // if onSelect is not undefined, auto add checkbox column
  onSort={func(            // sort callback
    string,                // column name
    int                    // 0 - asc, 1 - desc
  )}
  columns={array}
/>

columns = [{
  header:{string|element} // th content, string or ReactElement
  content:{string|func}   // td conent
  hidden:{bool}           // if true, this column did not render, default is false
  name:{string}           // field name, if content not set, use data[name] for content
  sort:{bool|func|array}  // if sort is true, use internal sort
                             if sort is a method, use data.sort(method)
                             if sort is an array with 2 motheds, the first method used for asc sort, the second used for desc sort
  width:{number}          // width, if not set, use first render td width
}]
`}
            </Code>
          </En>

          <div><a href="#/fetch">fetch see here</a></div>

          <h2 className="subhead">td content</h2>
          <Cn>
            有三种方式设置 content<br />
            第一种不填，表格内容会根据 name 找到对应的字段<br />
            {'第二种模板字符串，{} 形式，例：{foo}-{bar}'}<br />
            第三种为返回ReactElement的方法，例如：
          </Cn>
          <En>
            <ul>
              <li>Undefined, will use data[name] as content.</li>
              <li>String template, example: {'{foo}-{bar}'}</li>
              <li>Function, use result as content.</li>
            </ul>
          </En>
          <Code className="prettyprint">{`
            content: (data) => {
              return <button onClick={this.removeEntity.bind(this, data.id)}>remove</button>
            }
            `}
          </Code>

          <h2 className="subhead">ArrayHolder</h2>
          <Cn>如果不想在每次选中/清除每个选项后获取值（需要用state维护状态），可以在onSelect中传入一个ArrayHolder的实例，ArrayHolder内部包含了一个add和remove方法维护选项，不过使用者不需要关心这个。只需要在需要数据的时候，调用getValue(sep)就好了</Cn>
          <En>
            There are 2 ways to get selected values.<br />
            One is set onSelect to a function, every time the checkboxes change will receive the values. <br />
            The second is set onSelect to an instance of ArrayHolder, then when you need values, use arrayHolder.getValue(sep)
          </En>
          <Code>
{`let arrayHolder = new ArrayHolder()
...
<Table onSelect={arrayHolder} ... />
...
values = arrayHolder.getValue(',')`}
          </Code>

          <h2 className="subhead">Example</h2>
          <div>
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.bordered} onChange={bordered => this.setState({bordered})} text="bordered" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.striped} onChange={striped => this.setState({striped})} text="striped" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.arrayHolder} onChange={arrayHolder => this.setState({arrayHolder})} text="arrayHolder" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.pagination} onChange={page => this.setState({pagination: page})} text="pagination" />
          </div>
          <div>
            height: <RadioGroup style={{display: 'inline-block'}} onChange={(height) => this.setState({height})} value={this.state.height} data={['auto', '15rem', '370px', '500px']} />
          </div>
          <div>
            width: <RadioGroup style={{display: 'inline-block'}} onChange={(width) => this.setState({width})} value={this.state.width} data={['auto', '1200px', '2000px']} />
          </div>
          <div>
            size: <RadioGroup style={{display: 'inline-block'}} onChange={(size) => this.setState({size})} value={this.state.size} data={['small', 'normal']} />
          </div>

          {
            this.state.pagination &&
            <div>
              pagination position: <RadioGroup style={{display: 'inline-block'}} onChange={(position) => this.setState({position})} value={this.state.position} data={['left', 'center', 'right']} />
            </div>
          }

          {
            this.state.arrayHolder &&
            <div>
              <a onClick={this.getSelectedName}>get selected names</a>
            </div>
          }
          <div style={{marginBottom: 10}}>values: {JSON.stringify(this.state.selectedNames)}</div>

          <Example>
            <Lazyload placeholder={<div style={{height: 200}}>loading table ...</div>}>
              <Button status="danger"
                style={{marginBottom: '1rem', display: this.state.arrayHolder ? 'block' : 'none'}}
                onClick={() => { Modal.confirm('Are you sure to delete "' + this.arrayHolder.getValue(',') + '"?', () => {}, 'Warning') }}>
                Delete selected
              </Button>

              <Table ref="table"
                bordered={this.state.bordered}
                disableCheck={(d) => d.start_date > '2011/01/01'}
                onSelect={this.state.arrayHolder ? this.arrayHolder : this.handleSelectedName}
                striped={this.state.striped}
                width={this.state.width}
                height={this.state.height}
                size={this.state.size}
                fetch={{url: 'json/table.json', catch: 3600}}
                sep={null}
                value={['Ashton Cox', 'Airi Satou']}
                valueTpl="name"
                filter={
                  <Filter
                    columns={2}
                    labelWidth="6rem"
                    onFilter={fs => this.setState({ filterText: JSON.stringify(fs) })}
                    items={[
                      {
                        label: 'Name:',
                        name: 'name',
                        component: <Input />,
                        filter: (value, data) => data.filter((d) => d.name.toLowerCase().indexOf(value) >= 0)
                      }, {
                        label: 'Start Date:',
                        name: 'start_date',
                        component: <DatepickerRange type="date" />,
                        filter: (value, data) => {
                          let min = value[0] ? new Date(value[0].replace('-', '/')).getTime() : 0
                          let max = value[1] ? new Date(value[1].replace('-', '/')).getTime() : Number.MAX_VALUE
                          return data.filter((d) => {
                            let startDate = new Date(d.start_date).getTime()
                            return min <= startDate && startDate <= max
                          })
                        }
                      }, {
                        label: 'Office:',
                        name: 'office',
                        component: <Select data={['Edinburgh', 'Sidney', 'London', 'Tokyo', 'San Francisco', 'New York']} />,
                        filter: (value, data) => data.filter((d) => d.office === value)
                      }
                    ]} />
                }
                columns={[
                  { name: 'name', sort: true, header: 'Name',
                    content: (d) => {
                      return <a onClick={() => { Modal.alert('You clicked "' + d.name + '"') }}>{d.name}</a>
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
                          Modal.confirm('Are you sure to delete "' + d.name + '"?', () => {
                            console.log('just a kidding.')
                          })
                        }}>Delete</a>
                      )
                    }
                  }
                ]}
                pagination={this.state.pagination ? {size: 10, small: this.state.size === 'small', position: this.state.position} : null} />
            </Lazyload>
          </Example>

          <h2 className="subhead">Raw html</h2>
          <Example>
            <Table bordered={this.state.bordered} size={this.state.size} striped={this.state.striped}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Office</th>
                  <th>Start Date</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Ashton Cox</td>
                  <td>San Francisco</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
                <tr>
                  <td>Ashton Cox</td>
                  <td>San Francisco</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
                <tr>
                  <td>Ashton Cox</td>
                  <td>San Francisco</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
                <tr>
                  <td>Ashton Cox</td>
                  <td>San Francisco</td>
                  <td>2009/01/12</td>
                  <td>$86,000</td>
                </tr>
              </tbody>
            </Table>
          </Example>
        </div>
      </div>
    )
  }
}
