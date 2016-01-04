'use strict';

import React from 'react';
import prettify from '../prettify';
const {Form, FormControl, Button, FormSubmit, Icon, Input, RadioGroup, dataSource} = global.uiRequire();

class Page extends React.Component {
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
          <pre className="prettyprint">
{`<Form
  data={object|func}    // 数据，object 或者 dataSource
  hintType={string}     // 信息提示方式，可选值为 "block", "pop", "inline"，"none"
                           layout 为 stacked, aligned 时，默认为 "block"
                           layout 为 inline 时，默认为 "pop"
                           会被 FormControl 的 hintType 覆盖
  layout={string}       // 布局，可选值为 "aligned", "stacked", "inline"，默认为 "inline"
  onSubmit={function}>  // 数据验证成功后回调事件
  {children}
</Form>`}
          </pre>
          <p><a href="#/dataSource">dataSource 参见这里</a></p>
          <p>0.3 版更新，From 不再提供内置 Ajax 提交功能，需要在onSubmit中进行提交</p>

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
          <Form layout={this.state.layout}>
            <FormControl name="text" label="text" type="text" grid={{width:6/24}} responsive="sm" min={2} max={6} />
            <FormControl name="email" label="email" type="email" />
            <FormControl name="select" label="select" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} type="select" />
            <FormSubmit>
              <span>提交</span>
            </FormSubmit>
          </Form>

          <h2 className="subhead">获取 / 提交数据</h2>
          <p>注：本文档使用了一个 <em>json</em> 文件模拟服务端返回数据，提交会提示 <em>500</em> 错误</p>

          <Form layout="aligned" onSubmit={data => console.log(data)} data={dataSource("json/form.json")}>
            <FormControl name="text" label="text" type="text" grid={{width:12/24}} min={2} max={6} />
            <FormControl name="email" label="email" type="email">
              <span className="rct-input-group pure-u-1">
                <span className="addon"><Icon icon="email" /></span>
                <Input type="email" />
              </span>
            </FormControl>
            <FormControl grid={{width:13/24}} name="alpha" label="alpha" type="alpha" />
            <FormControl grid={{width:14/24}} name="alphanum" label="alphanum" type="alphanum" />
            <FormControl grid={{width:15/24}} name="integer" label="integer" type="integer" />
            <FormControl grid={{width:16/24}} name="number" label="number" type="number" />
            <FormControl grid={{width:16/24}} name="password" min={6} max={20} label="password" type="password" />
            <FormControl grid={{width:16/24}} name="repassword" ignore={true} label="repeat password" type="password" equal="password" tip="必须与password相同" />
            <FormControl grid={{width:17/24}} name="url" label="url" type="url" />
            <FormControl grid={{width:17/24}} name="readonly" readOnly={true} label="readonly" type="text" />
            <FormControl name="checkbox" type="checkbox" text="It's a checkbox" />
            <FormControl name="datetime" type="datetime" label="datetime" />
            <FormControl name="checkboxgroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="checkbox group" type="checkbox-group" />
            <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group" inline={true} type="radio-group" />
            <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating" />
            <FormControl grid={{width:12/24}} name="select" label="select" type="select" data={dataSource("json/countries.json")} mult={true} filterAble={true} optionTpl='<img src="//lobos.github.io/react-ui/images/flags/{code}.png" /> {country}-{en}' valueTpl="{en}" />
            <FormControl name="tree" selectAble={true} label="tree" type="tree" data={dataSource("json/tree.json")} textTpl='{text}({id})' valueTpl="{id}" />
            <FormControl grid={{width:18/24}} name="textarea" label="textarea" rows={5} type="textarea" />
            <FormControl label="upload" type="upload" autoUpload={true} grid={{width:12/24}} name="upload" action="http://216.189.159.94:8080/upload" accept="image/*" limit={3} content={<Button><Icon icon="upload" /> 选择文件</Button>} />

            <FormSubmit>
              <span>提交</span>
              <span>处理中</span>
            </FormSubmit>
          </Form>

          <pre className="prettyprint">
{`<Form layout="aligned" onSubmit={data => console.log(data)} data={dataSource("json/form.json")}>
  <FormControl name="text" label="text" type="text" grid={{width:12/24}} min={2} max={6} />
  <FormControl name="email" label="email" type="email">
    <span className="rct-input-group">
      <span className="addon"><Icon icon="email" /></span>
      <Input type="email" />
    </span>
  </FormControl>
  <FormControl grid={{width:13/24}} name="alpha" label="alpha" type="alpha" />
  <FormControl grid={{width:14/24}} name="alphanum" label="alphanum" type="alphanum" />
  <FormControl grid={{width:15/24}} name="integer" label="integer" type="integer" />
  <FormControl grid={{width:16/24}} name="number" label="number" type="number" />
  <FormControl grid={{width:17/24}} name="url" label="url" type="url" />
  <FormControl grid={{width:17/24}} name="readonly" readOnly={true} label="readonly" type="text" />
  <FormControl name="checkbox" type="checkbox" text="It's a checkbox" />
  <FormControl name="datetime" type="datetime" label="datetime" />
  <FormControl name="checkboxgroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="checkbox group" type="checkbox-group" />
  <FormControl name="radiogroup" data={["中国", "美国", "俄罗斯", "德国", "日本", "法国", "英格兰"]} label="radio group" inline={true} type="radio-group" />
  <FormControl name="rating" label="rating" required={true} maxValue={10} tip="亲，给个好评吧" type="rating" />
  <FormControl grid={{width:12/24}} name="select" label="select" type="select" data={dataSource("json/countries.json")} mult={true} filterAble={true} optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}' valueTpl="{en}" />
  <FormControl name="tree" selectAble={true} label="tree" type="tree" data={dataSource("json/tree.json")} textTpl='{text}({id})' valueTpl="{id}" />
  <FormControl grid={{width:18/24}} name="textarea" label="textarea" rows={5} type="textarea" />
  <FormControl label="upload" type="upload" autoUpload={true} grid={{width:12/24}} name="upload" action="http://216.189.159.94:8080/upload" accept="image/*" limit={3} content={<Button><Icon icon="upload" /> 选择文件</Button>} />

  <FormSubmit>
    <span>提交</span>
    <span>处理中</span>
  </FormSubmit>
</Form>
`}
          </pre>

          <h2 className="subhead">Methods</h2>
          <h2 className="subhead">getValue()</h2>
          <p>获取当前所有注册FormControl的value，结果为json</p>

          <h2 className="subhead">getReference(name)</h2>
          <p><em>Form</em> 下不能使用 <em>ref</em> 获取引用，需要引用时使用 <em>getReference</em> 方法。<em>name</em> 为 FormControl 的 <em>name</em></p>
        </div>
      </div>
    );
  }
}

module.exports = prettify(Page);
