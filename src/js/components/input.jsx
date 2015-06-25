'use strict'

let React = require('react')
let Classable = require('../mixins/classable')
let ReceiveValue = require('../mixins/receive-value')

let Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    id: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    rows: React.PropTypes.number,
    type: React.PropTypes.string,
    value: React.PropTypes.any
  },

  mixins: [Classable, ReceiveValue],

  handleChange: function (event) {
    if (this.props.readOnly) {
      return
    }

    let value = event.target.value
    this.setState({ value: value })
    if (this.props.onChange) {
      this.props.onChange(value)
    }
  },

  getValue: function () {
    return React.findDOMNode(this).value
  },

  render: function () {
    let type = this.props.type === 'password' ? 'password' : 'text'
    let props = {
      className: this.getClasses('form-control'),
      id: this.props.id,
      onChange: this.handleChange,
      placeholder: this.props.placeholder,
      readOnly: this.props.readOnly,
      type: type,
      value: this.state.value
    }

    if (this.props.type === 'textarea') {
      return (<textarea {...props} rows={this.props.rows} />)
    } else {
      return (<input {...props} />)
    }
  }
})

module.exports = Input

require('./form-control.jsx').register(

  ['text', 'email', 'alpha', 'alphanum', 'url', 'textarea'],

  function (props) {
    return <Input {...props} />
  }

)

require('./form-control.jsx').register(

  ['integer', 'number'],

  function (props) {
    return <Input {...props} />
  },

  'number'

)
