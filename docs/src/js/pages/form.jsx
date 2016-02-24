'use strict';

import React from 'react';
import Code from '../Code';
import Example from '../Example';
const {Form, FormControl, Button, FormSubmit, Icon, Input, Datetime, RadioGroup} = global.uiRequire();

module.exports = class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      layout: 'inline'
    };
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
  data={object}         // 数据，object
  fetch={object}        // 远程数据获取配置 @1
  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"
                           layout 为 stacked, aligned 时，默认为 "block"
                           layout 为 inline 时，默认为 "pop"
                           会被 FormControl 的 hintType 覆盖
  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "inline"
  onSubmit={function}>  // 数据验证成功后回调事件
  {children}
</Form>`}
          </Code>
          <p>@1 <a href="#/fetch">fetch 属性参见这里</a></p>
          <p>
            0.6 版更新，data不再支持dataSource，改用fetch<br />
            0.3 版更新，From 不再提供内置 Ajax 提交功能，需要在onSubmit中进行提交
          </p>

          <h2 className="subhead">layout</h2>
          <div>
            <span>layout: </span>
            <RadioGroup
              grid={{width:16/24}}
              inline={true}
              data={['inline', 'aligned', 'stacked']}
              value={this.state.layout}
              onChange={layout => this.setState({ layout })} />
          </div>
          <br />
          <Example>
<Form layout={this.state.layout}>
  <FormControl name="text" label="text" type="text" grid={{width:6/24}} responsive="sm" min={2} max={6} />
  <FormControl name="email" label="email" type="email" />
  <FormControl name="select" label="select" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} type="select" />
  <FormSubmit>
    <span>提交</span>
  </FormSubmit>
</Form>
          </Example>

          <h2 className="subhead">获取 / 提交数据</h2>
          <p>注：本文档提交后只在下方显示json格式，不提交到服务端。</p>

          <Example>
<Form layout="aligned" onSubmit={formData => this.setState({ formData })} fetch={'json/form.json'}>
  <FormControl name="text"
    label="text"
    type="text"
    grid={{width:12/24}}
    min={2}
    max={6} />

  <FormControl label="email">
    <span className="rct-input-group">
      <span className="addon"><Icon icon="email" /></span>
      <Input name="email" type="email" />
    </span>
  </FormControl>

  <FormControl grid={{width:13/24}}
    name="alpha"
    label="alpha"
    required
    type="alpha" />

  <FormControl grid={{width:14/24}}
    name="alphanum"
    label="alphanum"
    type="alphanum" />

  <FormControl grid={{width:15/24}}
    name="integer"
    label="integer"
    type="integer" />

  <FormControl grid={{width:16/24}}
    name="number"
    label="number"
    type="number" />

  <FormControl grid={{width:16/24}}
    name="password"
    min={6}
    max={20}
    label="password"
    type="password" />

  <FormControl grid={{width:16/24}}
    name="repassword"
    ignore={true}
    label="repeat password"
    type="password"
    tip="必须与password相同"
    validator={
      { func: (value, formData) => {
        let password = formData.password;
        if (!value ? !password : value === password) {
          return true;
        } else {
          return new Error('两次输入密码不一致');
        }
      },
      bind: ['password'] }
    } />

  <FormControl grid={{width:17/24}}
    name="url"
    label="url"
    type="url" />

  <FormControl grid={{width:17/24}}
    name="readonly"
    readOnly={true}
    label="readonly"
    type="text" />

  <FormControl name="checkbox"
    type="checkbox"
    checkValue={1}
    text="It's a checkbox" />

  <FormControl name="datetime"
    type="datetime"
    label="datetime" />

  <FormControl label="two item">
    <Datetime type="date"
      min="2016-1-22"
      required
      onChange={(startTime) => this.setState({ startTime })}
      max={this.state.endTime}
      placeholder="startTime"
      name="startTime" />
    至
    <Datetime type="date"
      max="2017-1-22"
      onChange={(endTime) => this.setState({ endTime })}
      min={this.state.startTime}
      placeholder="endTime"
      name="endTime" />
  </FormControl>

  <FormControl label="mult input" tip="每个输入框可以输入数字和字符，长度为5">
    <Input name="mult1" type="alphanum" min={5} max={5} grid={1/6} />-
    <Input name="mult2" type="alphanum" min={5} max={5} grid={1/6} />-
    <Input name="mult3" type="alphanum" min={5} max={5} grid={1/6} />-
    <Input name="mult4" type="alphanum" min={5} max={5} grid={1/6} />
  </FormControl>

  <FormControl name="checkboxgroup"
    required
    fetch={{url: "json/text-value.json", cache: 3600}}
    label="checkbox group"
    type="checkbox-group" />

  <FormControl name="radiogroup"
    required
    fetch={{url: "json/text-value.json", cache: 3600}}
    label="radio group"
    inline={false}
    type="radio-group" />

  <FormControl name="rating"
    label="rating"
    required
    maxValue={10}
    tip="亲，给个好评吧"
    errorText="必须给一个评分哦"
    type="rating" />

  <FormControl grid={{width:12/24}}
    name="select"
    label="select"
    type="select"
    fetch={{url:"json/countries.json", cache:3600}}
    mult={true}
    filterAble={true}
    optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}'
    valueTpl="{en}" />

  <FormControl name="tree"
    selectAble={true}
    label="tree"
    type="tree"
    fetch={{url:"json/tree.json", cache:3600}}
    textTpl='{text}({id})'
    valueTpl="{id}" />

  <FormControl grid={{width:18/24}}
    name="textarea"
    label="textarea"
    rows={5}
    type="textarea" />
  
  <FormSubmit>
    <span>提交</span>
    <span>处理中</span>
  </FormSubmit>
</Form>

{ this.state.formData && <Code>提交表单数据:<br />{JSON.stringify(this.state.formData, null, 4)}</Code> }
          </Example>

        </div>
      </div>
    );
  }
}
