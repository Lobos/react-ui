import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Basic', () => {
  it('Should generate a i tag', () => {
    const wrapper1 = shallow(<Icon/>)
    expect(wrapper1).to.have.tagName('i')
  })

  it('Should generate a i tag with default icon prefix', () => {
    const wrapper1 = shallow(<Icon icon='foo' />)
    expect(wrapper1).to.have.className('icon-foo')
  })

  it('Should generate correct size-css with default icon prefix by number', () => {
    const wrapper1 = shallow(<Icon size='3' />)
    const wrapper2 = shallow(<Icon size={4} />)
    expect(wrapper1).to.have.className('icon-3x')
    expect(wrapper2).to.have.className('icon-4x')
  })

  it('Should generate correct size-css with default icon prefix by multiple', () => {
    const wrapper1 = shallow(<Icon size='lg' />)
    const wrapper2 = shallow(<Icon size='2x' />)
    expect(wrapper1).to.have.className('icon-lg')
    expect(wrapper2).to.have.className('icon-2x')
  })
})
