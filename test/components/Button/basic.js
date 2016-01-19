import React from 'react'
import ReactDOM from 'react-dom'

const Button = require('../../../src/Button.js');
const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Basic', ()=> {
  const defaultBtn = ReactTestUtils.renderIntoDocument(<Button>Default</Button>);

  describe('For default one', ()=> {
    it('Should generate a button tag', () => {
      assert.equal(ReactDOM.findDOMNode(defaultBtn).nodeName, 'BUTTON');
    });

    it('Should have type=button by default', () => {
      assert.equal(ReactDOM.findDOMNode(defaultBtn).getAttribute('type'), 'button');
    });

    it('Should exist as a React Component', ()=> {
      assert.ok(ReactTestUtils.isCompositeComponent(defaultBtn, Button));
    });
  });

  describe('For customize one', ()=> {
    it('Should show the type if passed button or submit', () => {
      const instance1 = ReactTestUtils.renderIntoDocument(
          <Button type='button'>Button1</Button>
        ),
        instance2 = ReactTestUtils.renderIntoDocument(
          <Button type='submit'>Button2</Button>
        );
      assert.equal(ReactDOM.findDOMNode(instance1).getAttribute('type'), 'button');
      assert.equal(ReactDOM.findDOMNode(instance2).getAttribute('type'), 'submit');
    });

    it('Should be disabled', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Button disabled>Button</Button>
      );
      assert.ok(ReactDOM.findDOMNode(instance).disabled);
    });

    it('Should apply pure-button-[status] class', () => {
      const instance1 = ReactTestUtils.renderIntoDocument(
          <Button status='danger'>Button1</Button>
        ),
        instance2 = ReactTestUtils.renderIntoDocument(
          <Button status='primary'>Button2</Button>
        );

      assert.ok(ReactDOM.findDOMNode(instance1).className.match(/\brct-button-danger\b/));
      assert.ok(ReactDOM.findDOMNode(instance2).className.match(/\brct-button-primary\b/));
    });

    it('Should ensure additional classes passed in, adding but not overriding', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Button className="foo" status="danger">Button</Button>
      );
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bfoo\b/));
      assert.ok(ReactDOM.findDOMNode(instance).className.match(/\brct-button-danger\b/));
    });

    it('Should default to status="default"', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Button status='default'>Button</Button>
      );
      assert.equal(instance.props.status, 'default');
    });
  })
});