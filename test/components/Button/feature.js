import React from 'react'
import ReactDOM from 'react-dom'

const Button = require('../../../src/Button.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Feature', ()=> {
  it('Should change to disabled after click when once="true"', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button once={true}>Button</Button>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));

    assert.ok(ReactDOM.findDOMNode(instance).disabled);
  })
});
