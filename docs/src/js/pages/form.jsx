'use strict'

let React = require('react')
let Prettify = require('../mixins/prettify')
//import {Form} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/Form',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Form</h1>
          <h2>表单</h2>
        </div>

        <div className="content">
          <p></p>
        </div>
      </div>
    )
  }
})
