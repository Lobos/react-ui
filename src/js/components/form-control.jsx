var React = require('react')

var Classable = require('../mixins/classable')
var Validatable = require('../mixins/validatable')

var FormControl = React.createClass({
  mixins: [Classable, Validatable],

  getInitialState: function () {
    return {
      hasError: false,
      hintText: ''
    }
  },

  getValue: function () {
  },

  render: function () {
    var className = this.getClasses("form-group")
    return (
      <div className={className}>
        <label>{this.props.label}</label>
        <div className="">
          <span className="help-block">{this.state.hintText}</span>
        </div>
      </div>
    )
  }
})

module.exports = FormControl
