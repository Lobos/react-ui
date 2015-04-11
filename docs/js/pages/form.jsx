var React = require('react')
var Example = require('../components/example.jsx')
var Libs = require('../libs')
var Form = Libs.Form
var FormControl = Libs.FormControl

module.exports = React.createClass({
  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Form & Validatable</h2>
        <p>表单，验证</p>

        <Example>
          <Form>
            <FormControl required={true} label="text" />
          </Form>
        </Example>
      </div>
    )
  }
})
