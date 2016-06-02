'use strict'

import React from 'react'
import Code from '../Code'
import Example from '../Example'
import Refetch from 'refetch'
const {Form, FormControl, Button, FormSubmit, Icon, Input, InputGroup, Datepicker, DatepickerPair, RadioGroup, FormItem} = global.uiRequire()

const HEARTS = [
  <Icon size={2} icon="favorite-outline" style={{color: 'red'}} />,
  <Icon size={2} icon="favorite" style={{color: 'red'}} />
]

module.exports = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      layout: 'inline'
    }
  }

  render () {
    return (
      <div>
        <div className="header">
          <h1>Form</h1>
          <h2>表单</h2>
        </div>

        <div className="content">
          <Code>
{`<Form
  button='string'       //  只有submit按钮，可以使用button
  buttons={
    submit: 'string',   // submit 按钮文字
    reset: 'string',    // reset 按钮文字
    cancel: 'string'    // cancel 按钮文字
  }                     
  data={object}         // 数据，object
  fetch={object}        // 获取服务端表单数据
  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"
                           layout 为 stacked, aligned 时，默认为 "block"
                           layout 为 inline 时，默认为 "pop"
                           会被 FormControl 的 hintType 覆盖
  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "aligned"
  onSubmit={function}   // 数据验证成功后回调函数
  onCancel={function}   // 点击cancel按钮回调函数
  onReset={function}    // 点击reset按钮回调函数
  >
  {children}
</Form>`}
          </Code>
          <p><a href="#/fetch">fetch 属性参见这里</a></p>
          <p>
            0.6 版更新，data不再支持dataSource，改用fetch<br />
            0.3 版更新，From 不再提供内置 Ajax 提交功能，需要在onSubmit中进行提交
          </p>

          <h2 className="subhead">layout</h2>

          <Example>
<RadioGroup style={{ marginBottom: '2rem', borderBottom: 'solid 1px #ddd' }}
  data={['inline', 'aligned', 'stacked']}
  value={this.state.layout}
  onChange={layout => this.setState({ layout })} />

<Form button="Submit" layout={this.state.layout}>
  <FormControl label="name">
    <Input name="name" style={{width: '10rem'}} type="text" min={2} max={6} />
  </FormControl>
  <FormControl name="email" placeholder="email" type="email" />
  <FormControl name="nationality" label="nationality" type="select"
    data={['China', 'America', 'Russia', 'Japan', 'Franch', 'England', 'Spain']} />
</Form>
          </Example>

          <h2 className="subhead">fetch / post data</h2>

          <Example>
<Form onSubmit={formData => this.setState({ formData })}
  fetch={'json/form.json'}
  buttons={{ submit: 'Submit', reset: 'Reset' }}>
  <FormControl name="text"
    label="text"
    type="text"
    grid={{width:12 / 24}}
    min={2}
    max={6} />

  <FormControl label="email">
    <InputGroup grid={1 / 2}>
      <Icon icon="email" />
      <Input name="email" type="email" />
    </InputGroup>
  </FormControl>

  <FormControl grid={{width:13 / 24}}
    name="alpha"
    label="alpha"
    required
    type="alpha" />

  <FormControl grid={{width:14 / 24}}
    name="alphanum"
    label="alphanum"
    type="alphanum" />

  <FormControl grid={{width:15 / 24}}
    name="integer"
    min={120}
    max={3200}
    label="integer"
    type="integer" />

  <FormControl grid={{width:16 / 24}}
    name="number"
    label="number"
    type="number" />

  <FormControl grid={{width:16 / 24}}
    name="password"
    min={6}
    max={20}
    label="password"
    type="password" />

  <FormControl grid={{width:16 / 24}}
    name="repassword"
    ignore
    label="repeat password"
    type="password"
    tip="same as the password."
    validator={
      {
        func: (value, formData) => {
          let password = formData.password
          if (!value ? !password : value === password) {
            return true
          } else {
            return new Error('This value should be the same as the password.')
          }
        },
        bind: ['password']
      }
    } />

  <FormControl grid={{width:17 / 24}}
    name="url"
    label="url"
    type="url" />

  <FormControl grid={{width:17 / 24}}
    name="readonly"
    readOnly
    label="readonly"
    type="text" />

  <FormControl name="checkbox"
    type="checkbox"
    defaultValue={1}
    text="It's a checkbox" />

  <FormControl name="datetime"
    type="datetime"
    label="datetime" />

  <FormControl label="datetime pair">
    <DatepickerPair type="date" min="2016-03-03" max="2016-08-21"
      names={['startTime', 'endTime']} />
  </FormControl>

  <FormControl label="mult input" tip="each field require 5 alphanumeric characters">
    <Input name="mult1" type="alphanum" min={5} max={5} grid={1 / 6} />
    <span>-</span>
    <Input name="mult2" type="alphanum" min={5} max={5} grid={1 / 6} />
    <span>-</span>
    <Input name="mult3" type="alphanum" min={5} max={5} grid={1 / 6} />
    <span>-</span>
    <Input name="mult4" type="alphanum" min={5} max={5} grid={1 / 6} />
  </FormControl>

  <FormControl name="checkboxgroup"
    required
    min={2}
    fetch={{url: 'json/text-value.json', cache: 3600}}
    label="checkbox group"
    type="checkbox-group" />

  <FormControl name="radiogroup"
    required
    fetch={{url: 'json/text-value.json', cache: 3600}}
    label="radio group"
    inline={false}
    type="radio-group" />

  <FormControl name="rating"
    label="rating"
    required
    icons={HEARTS}
    maxValue={10}
    tip="亲，给个好评吧"
    errorText="必须给一个评分哦"
    type="rating" />

  <FormControl grid={{width:12 / 24}}
    name="select"
    label="select"
    type="select"
    fetch={{url:'json/countries.json', cache:3600}}
    mult
    filterAble
    optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
    valueTpl="{en}" />

  <FormControl name="tree"
    selectAble
    label="tree"
    type="tree"
    fetch={ Refetch.get('json/tree.json') }
    textTpl="{text}({id})"
    valueTpl="{id}" />

  <FormControl label="raw input">
    <FormItem name="formitem" required max={10}>
      <input style={{ padding: '0.5rem 0.75rem' }} type="text" />
    </FormItem>
  </FormControl>

  <FormControl name="upload"
    label="upload file"
    type="upload"
    grid={1 / 2}
    action="http://216.189.159.94:8080/upload"
    accept="image/*"
    fileSize={300}
    limit={3}
    content={<Button><Icon icon="upload" /> 选择文件</Button>} />

  <FormControl grid={{width:18 / 24}}
    name="textarea"
    label="textarea"
    autoHeight
    rows={5}
    max={100}
    type="textarea" />
</Form>

{ this.state.formData && <Code>提交表单数据:<br />{JSON.stringify(this.state.formData, null, 4)}</Code> }
          </Example>

          <h2 className="subhead">json方式使用</h2>
          <div>
            controls属性等于FormControls的props，items属性等于FormItem的props<br />
            默认使用name作为key，如果没有name，为提高性能，建议指定一个唯一的key(不能和name重复)
          </div>
          <Example>
<Form button="确定" fetch={'json/form.json'} controls={[
  { name: 'text', type: 'text', min: 3, max: 12, label: 'text', grid: 1 / 3 },
  { name: 'datetime', required: true, type: 'datetime', label: 'datetime', tip: '自定义tip文字' },
  { label: 'two items', key: 'twoitem', items: [
    { name: 'startTime', type: 'date' },
    '-',
    { name: 'endTime', type: 'date' }
  ] },
  {
    name: 'select', type: 'select', label: 'select', grid: 1 / 2, fetch: {url:'json/countries.json', cache:3600},
    mult: true, filterAble: true, valueTpl: '{en}',
    optionTpl: '<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
  }
]} />
          </Example>
        </div>
      </div>
    )
  }
}
