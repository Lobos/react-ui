'use strict'

let React = require('react')
let Prettify = require('../mixins/prettify')
import {FormControl} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/FormControl',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>FormControl</h1>
          <h2>表单元素</h2>
        </div>

        <div className="content">
          <FormControl label="text" width={2} min={1} max={9} required={true} type="text" />
          <FormControl label="number" width={3} min={1} max={9} required={true} type="number" />
          <FormControl type="select" width={6} min={1} max={9} data={[1, 2, 3, 4]} />
        </div>
      </div>
    )
  }
})
