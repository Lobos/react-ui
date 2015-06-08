"use strict";

var React = require('react');
var Prettify = require('../mixins/prettify');
var Button = require('../../../../src/js/components/button.jsx');

module.exports = React.createClass({
  displayName: 'Pages/Button',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Button</h1>
          <h2>按钮</h2>
        </div>

        <div className="content">
          <pre className="prettyprint">{'<Button type="submit|button" status="string" onClick={function}>{string|element}</Button>'}</pre>
          <p><b>type:</b> 按钮类型，可选值为 <em>submit|button</em> ，不填默认值为 <em>button</em></p>
          <p><b>status:</b> 按钮类别，会为按钮添加 <em>pure-button-[status]</em> 的className，purecss包含 <em>primary</em> 这个值，可自行扩展 <em>success|error</em> 等</p>

          <h2 className="subhead">Example</h2>
          <p>
            <Button status="primary">Primary Button</Button>{' '}
            <Button>Button</Button>
          </p>
        </div>
      </div>
    );
  }
});
