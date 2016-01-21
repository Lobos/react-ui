import React from 'react'
import ReactDOM from 'react-dom'

const ReactUI = require('../../../src');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Basic', ()=> {
  it('Should exist as a React Component', ()=> {
    const button = ReactTestUtils.renderIntoDocument(<ReactUI.Button>Button</ReactUI.Button>);
    assert.ok(ReactTestUtils.isCompositeComponent(button, ReactUI.Button));
    //TODO the rest of components
  });
});
