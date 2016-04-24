import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Feature', () => {
  it('Should apply icon-spin class', () => {
    const wrapper1 = shallow(<Icon spin={true} />)
    expect(wrapper1).to.have.className('icon-spin')
  })
})
