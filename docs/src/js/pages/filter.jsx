'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import { Cn, En } from '../Language'
import { Filter, Input, Select, DatepickerRange } from 'rctui'

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      filterText: ''
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Filter</h1>
        </div>

        <div className="content">
          <Cn>
            <Code>
  {`<Filter
    columns={number}              // 如果填写，filter选项会按指定的列数排列，否则无序排列
    labelWidth={number|string}    // label 宽度，未设定columns，不要填写
    className={string}
    style={object}
    onFilter={func(data)}         // 外部回调事件，返回当前filter表单值，如果是内部筛选，不要传入
    items={[{                     // filter选项列表，数组
      label: 'string'             // 显示label文字
      column: {integer}           // 分列后，如果某项比较长，可以手动指定column
      name: 'string'              // required，获取数据的key，component不需要写name
      componenent: {ReactElement} // Input, Datepicker, Select 等Form 元素
      filter: func(               // 如果使用内部筛选，需要传入筛选方法，返回值是array
        value,                    // 第一个参数，component的value
        data                      // 第二个参数，筛选的源数据
      )
    }]}
  />`}
            </Code>
          </Cn>
          <En>
            <Code>
  {`<Filter
    columns={number}              // default is undefined
    labelWidth={number|string}    // if columns not set, ignore
    className={string}
    style={object}
    onFilter={function(
      data                        // object, callback data
    )}
    items={[{                     // array, item list
      label: 'string'             // text
      column: {integer}           // use if item's width over 1 column, default value is 1
      name: 'string'              // required
      componenent: {ReactElement} // Form Component, like Input, Datepicker, Select
      filter: func(               // array result
        value,                    // item value
        data                      // origin data
      )
    }]}
  />`}
            </Code>
          </En>
          <Cn>0.7 彻底重写了Filter组件，原来的组件有点过于理想化，并且稍微有点复杂，改为一个比较常用的实现。</Cn>

          <h2 className="subhead">Example</h2>
          <Example>
<Filter
  columns={3}
  labelWidth="5rem"
  onFilter={fs => this.setState({ filterText: JSON.stringify(fs) })}
  items={[
    {
      label: 'Name:',
      name: 'name',
      component: <Input />,
      filter: (value, data) => data.filter((d) => d.name.indexOf(value) > -1)
    }, {
      label: 'Birthday:',
      name: 'birthday',
      column: 2,
      component: <DatepickerRange type="date" />
    }, {
      label: 'Email:',
      name: 'email',
      component: <Input />
    }, {
      label: 'Nationality:',
      name: 'nationality',
      component: <Select data={['Chinese', 'English', 'American', 'Spanish']} />
    }
  ]} />
<div>{this.state.filterText}</div>
          </Example>

          <h2 className="subhead">Inner Filter</h2>
          <Cn>内部过滤示例见<a href="#table">Table</a></Cn>
          <En>Example see <a href="#table">Table</a></En>
        </div>
      </div>
    )
  }
}
