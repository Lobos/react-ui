import React from 'react'
import ReactDOM from 'react-dom'

const Icon = require('../../../src/Icon.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Feature', ()=> {
  it('Should apply icon-spin class', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(<Icon spin={true}/>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/));
  })
});
