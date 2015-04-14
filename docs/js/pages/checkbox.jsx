var React = require('react')
var Example = require('../components/example.jsx')
var Arguments = require('../components/arguments.jsx')
var Checkbox = require('../libs').Checkbox

module.exports = React.createClass({
  handleChange: function () {
    React.findDOMNode(this.refs.msg).innerHTML = this.refs.checkbox.getValue()
  },

  render: function () {
    return (
      <div className="content">
        <h2 className="page-header">Checkbox</h2>
        <br />

        <Arguments>
          <Arguments.Example>{'<Checkbox checked={bool} text={string} value={Object} onChange={function} />'}</Arguments.Example>
          <Arguments.Item name="checked" type="Bool" def="false">是否选中</Arguments.Item>
          <Arguments.Item name="text" type="String">label 文字</Arguments.Item>
          <Arguments.Item name="value" type="Object"></Arguments.Item>
        </Arguments>

        <h3>Mehtods</h3>
        <Arguments>
          <Arguments.Example>{'getValue()'}</Arguments.Example>
          <p>如果checkbox选中时，返回<code>value</code>，否则返回<code>null</code></p>
        </Arguments>

        <Example text={'<Checkbox ref="checkbox" onChange={this.handleChange} text="text" value="value" />'}>
          <Checkbox ref="checkbox" onChange={this.handleChange} text="text" value="value" />
          <p ref="msg"></p>
        </Example>
      </div>
    )
  }
})
