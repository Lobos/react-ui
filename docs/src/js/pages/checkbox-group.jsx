"use strict";

var React = require('react');
var Prettify = require('../mixins/prettify');
var CheckboxGroup = require('../../../../src/js/components/checkbox-group.jsx');

module.exports = React.createClass({
  displayName: 'Pages/Checkbox',

  mixins: [Prettify],

  render: function () {
    return (
      <div>
        <div className="header">
          <h1>Checkbox Group</h1>
          <h2>一组复选框</h2>
        </div>

        <div className="content">

          <pre className="prettyprint">{'<CheckboxGroup data={array} stringify={bool} inline={bool} onChange={function} readOnly={bool}\r  src="string" textKey="string" valueKey="string" value={any} />'}</pre>


        </div>
        <CheckboxGroup />
      </div>
    );
  }
});
