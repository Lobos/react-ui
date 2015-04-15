var React = require('react')
var Example = require('../components/example.jsx')
var Libs = require('../libs')
var Form = Libs.Form

function getSrc(f) {
  return window.location.pathname + 'json/' + f + '.json'
}

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Form & Validation</h2>
        <p>表单，验证</p>

        <Example>
          <Form layout="horizontal">
            <Form.Control name="text" width={5} placeholder="placeholder text" minlen={2} maxlen={10} required={true} label="text" />
            <Form.Control name="email" type="email" tip="请输入常用邮箱" label="email" />
            <Form.Control name="alpha" type="alpha" label="alpha" />
            <Form.Control name="alphanum" type="alphanum" label="alphanum" />
            <Form.Control name="integer" type="integer" label="integer" />
            <Form.Control name="number" type="number" label="number" />
            <Form.Control name="url" type="url" label="url" />
            <Form.Control name="readonly" label="readonly" readOnly={true} />
            <Form.Control name="checkboxgroup" required minlen={2} maxlen={5} type="checkbox-group" label="checkbox group" src={getSrc('select')} />
            <Form.Control name="radiogroup" type="radio-group" label="radio group" inline={true} src={getSrc('select')} />
            <Form.Control name="checkbox" type="checkbox" text="checkbox" />
            <Form.Control name="datetime" type="datetime" label="datetime" />
            <Form.Control name="select" width={4} required={true} type="select" label="select" src={getSrc('select')} />
            <Form.Control name="multselect" width={6} type="mult-select" src={getSrc('select')} label="mult-select" />
            <Form.Control name="textarea" rows={6} type="textarea" label="textarea" />
            <Form.Control name="tree" type="tree" checkAble={true} src={getSrc("tree")} label="tree" />
            <Form.Submit type="submit" text={["提交","处理中..."]} />
          </Form>
        </Example>

        <Example>
          <Form action={getSrc("form")} layout="horizontal">
            <Form.Control name="text" width={5} placeholder="placeholder text" minlen={2} maxlen={10} required={true} label="text" />
            <Form.Control name="email" type="email" tip="请输入常用邮箱" label="email" />
            <Form.Control name="alpha" type="alpha" label="alpha" />
            <Form.Control name="alphanum" type="alphanum" label="alphanum" />
            <Form.Control name="integer" type="integer" label="integer" />
            <Form.Control name="number" type="number" label="number" />
            <Form.Control name="url" type="url" label="url" />
            <Form.Control name="readonly" label="readonly" readOnly={true} />
            <Form.Control name="checkboxgroup" minlen={2} maxlen={5} flat={true} type="checkbox-group" label="checkbox group" src={getSrc('select')} />
            <Form.Control name="radiogroup" type="radio-group" label="radio group" inline={true} src={getSrc('select')} />
            <Form.Control name="checkbox" type="checkbox" text="checkbox" />
            <Form.Control name="datetime" type="datetime" label="datetime" />
            <Form.Control name="select" width={4} required={true} type="select" label="select" src={getSrc('select')} />
            <Form.Control name="multselect" width={6} type="mult-select" src={getSrc('select')} label="mult-select" />
            <Form.Control name="textarea" rows={6} type="textarea" label="textarea" />
            <Form.Control name="tree" type="tree" checkAble={true} src={getSrc("tree")} label="tree" />
            <Form.Submit type="submit" text={["提交","处理中..."]} />
          </Form>
        </Example>
      </div>
    )
  }
})
