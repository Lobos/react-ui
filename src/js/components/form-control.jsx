"use strict"

let React = require('react')
let components = {}

let FormControl = React.createClass({
  displayName: 'FormControl',

  render: function () {
    // test
    return (
      <div>
        <components.CheckboxGroup data={[1, 2, 3]} />
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
