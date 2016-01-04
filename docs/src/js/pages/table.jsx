'use strict';

import React from 'react';
import prettify from '../prettify';
const {Table, Filter, Modal, Pagination, Checkbox, RadioGroup, dataSource} = global.uiRequire();

class Page extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      bordered: true,
      selectAble: true,
      data: [],
      filters: [],
      height: 370,
      pagination: false,
      striped: true,
      total: 0,
      width: '100%'
    };
  }

  componentWillMount () {
    let data = dataSource('json/table.json', null, { cache: true });
    data.then(res => {
      this.setState({ total: res.length });
    });
    this.setState({ data });
  }

  getCheckedName () {
    let names = (this.refs.table.getChecked('name')).join(',');
    this.setState({ checkedNames: names });
  }

  render () {
    let pagination = <Pagination size={10} total={this.state.total} />;

    let nameTpl = (d) => {
      return <a onClick={() => { Modal.alert(`点击了:${d.name}`); }}>{d.name}</a>;
    };
    let removeTpl = (d) => {
      return <a onClick={() => { Modal.confirm(`确定要删除${d.name}吗`, () => {}); }}>删除</a>;
    };

    let filterOptions = [{
      label: '姓名',
      name: 'name',
      ops: ['like', '=', 'startWidth'],
      startWidth: function (d, value) {
        return d.name.indexOf(value) === 0;
      }
    }, {
      label: '地区',
      name: 'office',
      ops: ['='],
      type: 'select',
      props: { data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
    }, {
      label: '地区2',
      name: 'office',
      ops: ['in', 'not in'],
      type: 'select',
      props: { mult: true, data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
    }];

    const headers = [
      { name: 'name', sortAble: true, content: nameTpl, header: 'Name' },
      { name: 'position', hidden: true },
      { name: 'office', sortAble: true, header: 'Office' },
      { name: 'start_date', sortAble: true, content: '{start_date}', header: 'Start Date' },
      { name: 'salary', content: '{salary}', header: 'Salary' },
      { name: 'tools', width: 60, content: removeTpl }
    ];

    return (
      <div>
        <div className="header">
          <h1>Table</h1>
          <h2>表格</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Table
  bordered={bool}          // 是否显示边框，默认值 false
  selectAble={bool}        // 是否显示选择，默认值 false
  striped={bool}           // 是否交替显示背景，默认值 false
  width={number}           // 表格宽度，默认值 100%
  height={number}          // 表格高度（body部分），默认值 auto
  data={array|func}        // 数据，object 或者 dataSource
  pagination={Pagination}  // 分页控件
  onSort={func(name, asc)} // TableHeader的sort事件，name为TableHeader的name，asc值为1|0
  headers={array}
/>

headers = [{
  content:{string|func}   // 表格显示内容，{}格式字符串模板或一个返回ReactElement的方法
  hidden:{bool}           // 是否显示，默认为true
  name:{string}           // 必填，字段名称，和data对应，如果不填content，使用name获取数据
  sortAble:{bool}         // 是否可以排序，默认值为false
  width:{number}          // 宽度
  header:{string|element} // 表头内容，string或者ReactElement
}]
`}
          </pre>
          <p><a href="#/dataSource">dataSource 参见这里</a></p>

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

          <h2 className="subhead">getChecked(name)</h2>
          <div>
            <em>实例方法</em>，获取当前选中的数据，返回结果为数组<br />
            <em>name</em>，如果为空，返回为原始data数据，如果指定了name，返回name对应的值。
            <pre className="prettyprint">{`this.refs.table.getChecked('name')`}</pre>
          </div>

          <h2 className="subhead">Example</h2>
          <div>
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.bordered} onChange={bordered => this.setState({bordered})} text="bordered" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.striped} onChange={striped => this.setState({striped})} text="striped" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.selectAble} onChange={selectAble => this.setState({selectAble})} text="selectAble" />
            <Checkbox style={{marginRight: 10, display: 'inline-block'}} checked={this.state.pagination} onChange={page => this.setState({pagination: page})} text="pagination" />
          </div>
          <div>
            height: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={height => this.setState({height})} value={this.state.height} data={['auto', 200, 370, 500]} />
          </div>
          <div>
            width: <RadioGroup style={{display: 'inline-block'}} inline={true} onChange={width=> this.setState({width})} value={this.state.width} data={['100%', 1200, 2000]} />
          </div>
          {
            this.state.selectAble &&
            <div>
              <a onClick={this.getCheckedName.bind(this)}>获取选中 Name</a>
              <p>{this.state.checkedNames}</p>
            </div>
          }
          <div style={{marginTop: 10}}>
            <Filter onFilter={filters => this.setState({ filters })} style={{marginBottom: 20}} local={true} options={filterOptions} />
            <Table ref="table"
              bordered={this.state.bordered}
              filters={this.state.filters}
              selectAble={this.state.selectAble}
              striped={this.state.striped}
              width={this.state.width}
              height={this.state.height}
              data={this.state.data}
              headers={headers}
              pagination={this.state.pagination ? pagination : null} />
          </div>
          <pre className="prettyprint">
{`let pagination = <Pagination size={10} total={this.state.total} />
let nameTpl = (d) => {
  return <a onClick={() => { Modal.alert('点击了:' + d.name) }}>{d.name}</a>
}
let removeTpl = (d) => {
  return <a onClick={() => { Modal.confirm('确定要删除' + d.name + '吗', () => {}) }}>删除</a>
}

let filterOptions = [{
  label: '姓名',
  name: 'name',
  ops: ['like', '=', 'startWidth'],
  startWidth: function (d, value) {
    return d.name.indexOf(value) === 0
  }
}, {
  label: '地区',
  name: 'office',
  ops: ['='],
  type: 'select',
  props: { data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
}, {
  label: '地区2',
  name: 'office',
  ops: ['in', 'not in'],
  type: 'select',
  props: { mult: true, data: ['Tokyo', 'Singapore', 'New York', 'London', 'San Francisco'] }
}]

const headers = [
  { name: 'name', sortAble: true, content: nameTpl, header: 'Name' },
  { name: 'position', hidden: true },
  { name: 'office', sortAble: true, header: 'Office' },
  { name: 'start_date', sortAble: true, content: '{start_date}', header: 'Start Date' },
  { name: 'salary', content: '{salary}', header: 'Salary' },
  { name: 'tools', width: 60, content: removeTpl }
]

<Filter onFilter={filters => this.setState({ filters })} style={{marginBottom: 20}} local={true} options={filterOptions} />

<Table ref="table"
  bordered={this.state.bordered}
  filters={this.state.filters}
  selectAble={this.state.selectAble}
  striped={this.state.striped}
  width={this.state.width}
  height={this.state.height}
  data={this.state.data}
  headers={headers}
  pagination={this.state.pagination ? pagination : null}
/>
`}
          </pre>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
