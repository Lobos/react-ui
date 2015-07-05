'use strict'

let React = require('react')
let Prettify = require('../mixins/prettify')
import {Form, FormControl, FormSubmit, Icon, Input, RadioGroup} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/Form',

  mixins: [Prettify],

  getInitialState: function () {
    return {
      layout: 'inline'
    }
  },

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Form</h1>
          <h2>表单</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">
{`<Form
  action={string}       // 服务端地址
  dataType={string}     // 提交数据类型，可选值为 "post", "json", "text", "arraybuffer",
                           "blob", "document", "formdata"，默认为 "post"
  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"
                           layout 为 stacked, aligned 时，默认为 "block"
                           layout 为 inline 时，默认为 "pop"
                           会被 FormControl 的 hintType 覆盖
  autoload={bool}       // 为true时，自动根据 action 从服务端已 get 方法获取数据
  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "inline"
  onSubmit={function}>  // 数据提交后回调事件
  {children}
</Form>`}
          </pre>

          <h2 className="subhead">layout</h2>
          <div>
            <span>layout: </span>
            <RadioGroup
              width={16}
              inline={true}
              data={['inline', 'aligned', 'stacked']}
              value={this.state.layout}
              onChange={layout => this.setState({ layout })} />
          </div>
          <br />
          <Form layout={this.state.layout}>
            <FormControl name="text" label="text" type="text" width={6} responsive="sm" min={2} max={6} />
            <FormControl name="email" label="email" type="email" />
            <FormControl name="select" label="select" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} type="select" />
            <FormSubmit>
              <span>提交</span>
            </FormSubmit>
          </Form>

          <h2 className="subhead">获取 / 提交数据</h2>
          <p>注：本文档使用了一个 <em>json</em> 文件模拟服务端返回数据，提交会提示 <em>500</em> 错误</p>

          <Form layout="aligned" autoload={true} action="json/form.json">
            <FormControl name="text" label="text" type="text" width={12} min={2} max={6} />
            <FormControl name="email" label="email" type="email">
              <span className="input-group pure-u-1">
                <span className="addon"><Icon icon="email" /></span>
                <Input type="email" />
              </span>
            </FormControl>
            <FormControl width={13} name="alpha" label="alpha" type="alpha" />
            <FormControl width={14} name="alphanum" label="alphanum" type="alphanum" />
            <FormControl width={15} name="integer" label="integer" type="integer" />
            <FormControl width={16} name="number" label="number" type="number" />
            <FormControl width={17} name="url" label="url" type="url" />
            <FormControl width={17} name="readonly" readOnly={true} label="readonly" type="text" />
            <FormControl name="checkbox" type="checkbox" text="It's a checkbox" />
            <FormControl name="datetime" type="datetime" label="datetime" />
            <FormControl name="checkboxgroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="checkbox group" type="checkbox-group" />
            <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group" inline={true} type="radio-group" />
            <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating" />
            <FormControl width={12} name="select" label="select" type="select" src="json/countries.json" mult={true} filterAble={true} optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}' valueTpl="{en}" />
            <FormControl name="tree" checkAble={true} label="tree" type="tree" src="json/tree.json" textTpl='{text}({id})' valueTpl="{id}" />
            <FormControl width={18} name="textarea" label="textarea" rows={5} type="textarea" />

            <FormSubmit>
              <span>提交</span>
              <span>处理中</span>
            </FormSubmit>
          </Form>

          <pre className="prettyprint">
{`<Form layout="aligned" autoload={true} action="json/form.json">
  <FormControl name="text" label="text" type="text" width={12} min={2} max={6} />
  <FormControl name="email" label="email" type="email">
    <span className="input-group">
      <span className="addon"><Icon icon="email" /></span>
      <Input type="email" />
    </span>
  </FormControl>
  <FormControl width={13} name="alpha" label="alpha" type="alpha" />
  <FormControl width={14} name="alphanum" label="alphanum" type="alphanum" />
  <FormControl width={15} name="integer" label="integer" type="integer" />
  <FormControl width={16} name="number" label="number" type="number" />
  <FormControl width={17} name="url" label="url" type="url" />
  <FormControl width={17} name="readonly" readOnly={true} label="readonly" type="text" />
  <FormControl name="checkbox" type="checkbox" text="It's a checkbox" />
  <FormControl name="datetime" type="datetime" label="datetime" />
  <FormControl name="checkboxgroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="checkbox group" type="checkbox-group" />
  <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group" inline={true} type="radio-group" />
  <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating" />
  <FormControl width={12} name="select" label="select" type="select" src="json/countries.json" mult={true} filterAble={true} optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}' valueTpl="{en}" />
  <FormControl name="tree" checkAble={true} label="tree" type="tree" src="json/tree.json" textTpl='{text}({id})' valueTpl="{id}" />
  <FormControl width={18} name="textarea" label="textarea" rows={5} type="textarea" />

  <FormSubmit>
    <span>提交</span>
    <span>处理中</span>
  </FormSubmit>
</Form>
`}
          </pre>

          <h2 className="subhead">Methods</h2>
          <h2 className="subhead">getReference(name)</h2>
          <p><em>Form</em> 下不能使用 <em>ref</em> 获取引用，需要引用时使用 <em>getReference</em> 方法。<em>name</em> 为 FormControl 的 <em>name</em></p>
        </div>
      </div>
    )
  }
})
