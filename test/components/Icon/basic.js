import React from 'react'
import ReactDOM from 'react-dom'

const Icon = require('../../../src/Icon.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Basic', ()=> {
  it('Should generate a i tag', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(<Icon/>);
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'I');
  });

  it('Should generate a i tag with default icon prefix', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(<Icon icon='foo'/>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bicon-foo\b/));
  });

  it('Should generate correct size-css with default icon prefix by number', ()=> {
    const instance1 = ReactTestUtils.renderIntoDocument(<Icon size='3'/>);
    const instance2 = ReactTestUtils.renderIntoDocument(<Icon size={4}/>);
    assert.ok(ReactDOM.findDOMNode(instance1).className.match(/\bicon-3x\b/));
    assert.ok(ReactDOM.findDOMNode(instance2).className.match(/\bicon-4x\b/));
  });

  it('Should generate correct size-css with default icon prefix by multiple', ()=> {
    const instance1 = ReactTestUtils.renderIntoDocument(<Icon size='lg'/>);
    const instance2 = ReactTestUtils.renderIntoDocument(<Icon size='2x'/>);
    assert.ok(ReactDOM.findDOMNode(instance1).className.match(/\bicon-lg\b/));
    assert.ok(ReactDOM.findDOMNode(instance2).className.match(/\bicon-2x\b/));
  });
});