import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Button from '../../../src/Button.js'

describe('Behavior', () => {
  it('Should call onClick callback', (done) => {
    const cb = () => {
        done()
      },
      wrapper1 = shallow(
        <Button onClick={cb}>
          Button
        </Button>
    )

    wrapper1.find('button').simulate('click')
  })

  it('Should call enable(elem) to enable disabled Button', () => {
    const wrapper1 = shallow(
      <Button disabled>
        Button
      </Button>
    )

    wrapper1.instance().enable()

    assert.ok(wrapper1.props('disabled'))
  })

  it('Should call disable(elem) to disable enabled Button', () => {
    const wrapper1 = shallow(
      <Button>
        Button
      </Button>
    )

    wrapper1.instance().disable()

    assert.ok(wrapper1.props('disabled'))
  })
})
