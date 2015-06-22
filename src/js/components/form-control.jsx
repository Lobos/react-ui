"use strict"

let React = require('react')
let Strings = require('../utils/strings')
let Classable = require('../mixins/classable')
let Validatable = require('../mixins/validatable')

let components = {}

let FormControl = React.createClass({
  displayName: 'FormControl',

  propTypes: {
    value: React.PropTypes.any
  },

  mixins: [Classable, Validatable],

  getInitialState: function () {
    return {
      id: this.props.id || Strings.nextUid(),
      hasError: false,
      hasValue: this.props.value,
      value: this.props.value,
      hintText: ''
    }
  },

  render: function () {
    let className = this.getClasses('pure-control-group', {
      hasError: this.state.hasError
    })

    // test
    return (
      <div className={className}>
        <label for={this.state.id}></label>
      </div>
    )
  }
})

// register component
FormControl.register = function (key, control) {
  if (!components[key]) {
    components[key] = control
  }
}

module.exports = FormControl
