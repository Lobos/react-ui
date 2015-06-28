'use strict'

require('../../less/input.less')

let React = require('react')
let Classable = require('../mixins/classable')
let ReceiveValue = require('../mixins/receive-value')

let Input = React.createClass({
  displayName: 'Input',

  propTypes: {
    id: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    rows: React.PropTypes.number,
    style: React.PropTypes.object,
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
      onChange: this.handleChange,
      type: type,
      value: this.state.value
    }

    if (this.props.type === 'textarea') {
      return (<textarea {...this.props} {...props} rows={this.props.rows} />)
    } else {
      return (<input {...this.props} {...props} />)
    }
  }
})

module.exports = Input

require('./form-control.jsx').register(

  ['text', 'email', 'alpha', 'alphanum', 'password', 'url', 'textarea'],

  function (props) {
    return <Input {...props} />
  },

  Input

)

require('./form-control.jsx').register(

  ['integer', 'number'],

  function (props) {
    return <Input {...props} />
  },

  Input,

  'number'

)
