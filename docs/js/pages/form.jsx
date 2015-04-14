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
          <Form action="none" layout="horizontal">
            <Form.Control name="text" width={5} placeholder="placeholder text" minlen={2} maxlen={10} required={true} label="text" />
            <Form.Control name="email" type="email" label="email" />
            <Form.Control name="readonly" label="readonly" readOnly={true} />
            <Form.Control name="checkboxgroup" minlen={2} maxlen={5} type="checkbox-group" label="checkbox group" src={getSrc('select')} />
            <Form.Control name="radiogroup" type="radio-group" label="radio group" inline={true} src={getSrc('select')} />
            <Form.Control name="checkbox" type="checkbox" text="checkbox" />
            <Form.Control name="datetime" type="datetime" label="datetime" />
            <Form.Control name="select" width={4} required={true} type="select" label="select" src={getSrc('select')} />
            <Form.Control name="multselect" width={6} type="mult-select" src={getSrc('select')} label="mult-select" />
            <Form.Control name="tree" type="tree" checkAble={true} src={getSrc("tree")} label="tree" />
            <Form.Submit type="submit" text={["提交","处理中..."]} />
          </Form>
        </Example>
      </div>
    )
  }
})
