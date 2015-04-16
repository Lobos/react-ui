var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Libs = require('../libs')
var Form = Libs.Form

function getSrc(f) {
  return window.location.pathname + 'json/' + f + '.json'
}

module.exports = React.createClass({
  load: function () {
    this.refs.form.fetchData()
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Form</h2>
        <p>表单，验证。提示、错误信息根据条件、由lang包下面的文字自动生成。<span className="label label-warning">使用RESTful规范</span></p>
        <br />

        <Arguments>
          <Arguments.Example>{'<Form action="url" autoload={bool} type={form|json} onSubmit={function} layout={horizontal|inline} />'}</Arguments.Example>
          <Arguments.Item name="action" type="String" require={true}>服务端地址。get与post使用同一个地址</Arguments.Item>
          <Arguments.Item name="autoload" type="Boolean" def="true">为<code>true</code>时，form加载时自动从服务端get数据，填充表单。</Arguments.Item>
          <Arguments.Item name="type" type="String" def="json">可选值为<code>json</code>，<code>form</code>。值为json时，数据以json格式提交，为form时，以<code>application/x-www-form-urlencoded</code>形式提交</Arguments.Item>
          <Arguments.Item name="layout" type="String" def="null">可选值为<code>null</code>，<code>horizontal</code>，<code>null</code>。对应bootstrap的<code>form-horizontal</code>，<code>form-inline</code></Arguments.Item>
          <Arguments.Item name="onSubmit" type="Function">提交<code>成功</code>后执行回调方法，参数为服务端返回数据</Arguments.Item>
        </Arguments>

        <h3>Methods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>获取当前Form数据，<code>json</code>格式</p>
        </Arguments>

        <Arguments>
          <Arguments.Example>{'fetchData(url)'}</Arguments.Example>
          <p>获取服务端数据</p>
          <Arguments.Item name="url" type="String">服务端地址，不填默认为form的aciton</Arguments.Item>
        </Arguments>
        <Example text={'<Form ref="form" autoload={false} action={getSrc("form")} type="form" layout="horizontal">\n<Form.Control name="text" width={5} placeholder="placeholder text" minlen={2} maxlen={10} required={true} label="text" />\n<Form.Control name="email" type="email" tip="请输入常用邮箱" label="email" />\n<Form.Control name="alpha" type="alpha" label="alpha" />\n<Form.Control name="alphanum" type="alphanum" label="alphanum" />\n<Form.Control name="integer" type="integer" label="integer" />\n<Form.Control name="number" max={10000} min={10} type="number" label="number" />\n<Form.Control name="url" type="url" label="url" />\n<Form.Control name="password" required={true} width={6} minlen={6} maxlen={18} type="password" label="password" />\n<Form.Control name="repeat" ignore={true} type="password" equal="password" width={6} tip="必须和password相同" label="repeat password" />\n<Form.Control name="readonly" label="readonly" readOnly={true} />\n<Form.Control name="checkboxgroup" required minlen={2} maxlen={5} flat={true} type="checkbox-group" label="checkbox group" src={url} />\n<Form.Control name="radiogroup" type="radio-group" label="radio group" inline={true} src={url} />\n<Form.Control name="checkbox" type="checkbox" text="checkbox" />\n<Form.Control name="datetime" unixtime={true} type="datetime" label="datetime" />\n<Form.Control name="select" width={4} required={true} type="select" label="select" src={url} />\n<Form.Control name="multselect" width={6} type="mult-select" src={url} label="mult-select" />\n<Form.Control name="textarea" rows={6} type="textarea" label="textarea" />\n<Form.Control name="tree" type="tree" checkAble={true} src={getSrc("tree")} label="tree" />\n<Form.Submit type="submit" text={["提交","处理中..."]} />\n</Form>'}>
          <Form ref="form" autoload={false} action={getSrc("form")} type="form" layout="horizontal">
            <Form.Control name="text" width={5} placeholder="placeholder text" minlen={2} maxlen={10} required={true} label="text" />
            <Form.Control name="email" type="email" tip="请输入常用邮箱" label="email" />
            <Form.Control name="alpha" type="alpha" label="alpha" />
            <Form.Control name="alphanum" type="alphanum" label="alphanum" />
            <Form.Control name="integer" type="integer" label="integer" />
            <Form.Control name="number" max={10000} min={10} type="number" label="number" />
            <Form.Control name="url" type="url" label="url" />
            <Form.Control name="password" required={true} width={6} minlen={6} maxlen={18} type="password" label="password" />
            <Form.Control name="repeat" ignore={true} type="password" equal="password" width={6} tip="必须和password相同" label="repeat password" />
            <Form.Control name="readonly" label="readonly" readOnly={true} />
            <Form.Control name="checkboxgroup" required minlen={2} maxlen={5} flat={true} type="checkbox-group" label="checkbox group" src={getSrc('select')} />
            <Form.Control name="radiogroup" type="radio-group" label="radio group" inline={true} src={getSrc('select')} />
            <Form.Control name="checkbox" type="checkbox" text="checkbox" />
            <Form.Control name="datetime" type="datetime" unixtime={true} label="datetime" />
            <Form.Control name="select" width={4} required={true} type="select" label="select" src={getSrc('select')} />
            <Form.Control name="multselect" width={6} type="mult-select" src={getSrc('select')} label="mult-select" />
            <Form.Control name="textarea" rows={6} type="textarea" label="textarea" />
            <Form.Control name="tree" type="tree" checkAble={true} src={getSrc("tree")} label="tree" />
            <Form.Submit type="submit" text={["提交","处理中..."]} />
          </Form>

          {<a href="javascript:;" onClick={this.load}>加载数据</a>}
          <div className="alert alert-warning">本文档无服务端程序，所以无法实际提交数据，会返回405错误</div>
        </Example>
      </div>
    )
  }
})
