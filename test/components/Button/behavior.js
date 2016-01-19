import React from 'react'
import ReactDOM from 'react-dom'

const Button = require('../../../src/Button.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Behavior', ()=> {
  it('Should call onClick callback', (done) => {
    const cb = () => {
        done();
      },
      instance = ReactTestUtils.renderIntoDocument(
        <Button onClick={cb}>Button</Button>
      );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('Should call enable(elem) to enable disabled Button', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button disabled>Button</Button>
    );

    instance.enable();

    assert.notOk(ReactDOM.findDOMNode(instance).disabled)
  });

  it('Should call disable(elem) to disable enabled Button', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button>Button</Button>
    );

    instance.disable();

    assert.ok(ReactDOM.findDOMNode(instance).disabled)
  });
});
