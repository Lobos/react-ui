'use strict';
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react/lib/ReactTestUtils.js'

import Button from '../../../src/Button.js'

describe('components button', () => {
  it('basic', () => {
    const button = TestUtils.renderIntoDocument(<Button type='submit'>123</Button>)
    expect(button.props.type).to.equal('submit');
  });
});