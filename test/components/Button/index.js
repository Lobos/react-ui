'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../../../src/Button.js'

const TestUtils = React.addons.TestUtils;

describe('components button', () => {
  it('basic', () => {
    const button = TestUtils.renderIntoDocument(<Button type='submit'>123</Button>)
    expect(button.props.type).to.equal('submit');
  });
});


