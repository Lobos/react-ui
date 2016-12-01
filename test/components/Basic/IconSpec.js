import { shallow, mount } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Icon Spec', () => {
  it('should generate a i tag', () => {
    const wrapper1 = shallow(<Icon/>)

    expect(wrapper1).to.have.tagName('i')
  })

  it('should generate a i tag with default icon prefix', () => {
    const wrapper1 = shallow(<Icon icon='foo' />)

    expect(wrapper1).to.have.className('icon-foo')
  })

  it('should generate correct size-css with default icon prefix by number or string', () => {
    const wrapper1 = shallow(<Icon size='3' icon='home' />)
    const wrapper2 = shallow(<Icon size={4} icon='home' />)

    expect(wrapper1).to.have.className('icon-3x')
    expect(wrapper2).to.have.className('icon-4x')
  })

  it('should generate correct size-css with default icon prefix by multiple', () => {
    const wrapper1 = shallow(<Icon size='3x' icon='foo' />)
    const wrapper2 = shallow(<Icon size='4x' icon='foo' />)

    expect(wrapper1).to.have.className('icon-3x')
    expect(wrapper2).to.have.className('icon-4x')
  })

  it('should generate correct font-size without icon', () => {
    const wrapper1 = shallow(<Icon size={3}>&#xe602;</Icon>)
    const wrapper2 = shallow(<Icon size={4}>&#xe602;</Icon>)

    expect(wrapper1.find({ style: { fontSize: '3rem' } })).to.have.length(1)
    expect(wrapper2.find({ style: { fontSize: '4rem' } })).to.have.length(1)
  })

  it('should append icon-spin class by spin prop', () => {
    const wrapper1 = shallow(<Icon icon='foo' spin />)

    expect(wrapper1).to.have.className('icon-spin')
  })

  it('should use native prefix by setPrefix()', () => {
    Icon.setPrefix('fa')

    const wrapper1 = shallow(<Icon icon='foo' />)

    expect(wrapper1).to.have.className('fa-foo')
  })
})
