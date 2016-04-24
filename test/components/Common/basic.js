import React from 'react/lib/ReactWithAddons'
import ReactTestUtils from 'react-addons-test-utils'
import { shallow } from 'enzyme'
import Button from '../../../src/Button.js'

describe('Basic', () => {
  it('Should exist as a React Component', () => {
    const button1 = shallow(<Button>
                              Button
                            </Button>)
    assert.ok(ReactTestUtils.isCompositeComponent(button1, Button))
  // TODO the rest of components
  })
})
