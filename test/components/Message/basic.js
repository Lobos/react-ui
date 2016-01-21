import React from 'react'
import ReactDOM from 'react-dom'

const Message = require('../../../src/Message.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Basic', ()=> {
  it('Should generate a div container tag', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(<Message messages={[]}/>);
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  })
});
