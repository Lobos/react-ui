var React = require('react')
var Example = require('../components/example.jsx')
var Libs = require('../libs')
var Form = Libs.Form
var FormControl = Libs.FormControl

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Form & Validation</h2>
        <p>表单，验证</p>

        <Example>
          <Form className="form-horizontal">
            <FormControl cols={[2, 5]} required={true} label="text" />
            <FormControl required={true} label="text2" />
          </Form>
        </Example>
      </div>
    )
  }
})
