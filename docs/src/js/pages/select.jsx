"use strict"

let React = require('react')
let Prettify = require('../mixins/prettify')
import {Select} from '../../../../src/js'

module.exports = React.createClass({
  displayName: 'Pages/Select',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Select</h1>
          <h2>选择器</h2>
        </div>

        <div className="content">
          <Select className="pure-u-1-2" placeholder="单选" data={["中国", "美国", "俄罗斯", "德国"]} />

          <Select className="pure-u-1-2" mult={true} placeholder="多选" optionTpl='<img src="images/flags/{code}.png" /> {country}-{en}' resultTpl='{country}' valueKey="en" src="json/countries.json" />
        </div>
      </div>
    )
  }
})


