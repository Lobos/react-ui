import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
// import { compClass, compData, compSelector } from '../../mock/input.js'
import Input from '../../../src/Input'

describe('Input Spec', () => {
  const defaultWrapper = mount(<Input placeholder='foo' />)

  describe('Default', () => {
    it('should generate a input tag', () => {
      expect(defaultWrapper).to.have.tagName('input')
    })

    it('should generate correct placeholder', () => {
      expect(defaultWrapper).to.have.attr('placeholder', 'foo')
    })

    it('should apply rct-form-control class', () => {
      expect(defaultWrapper).to.have.className('rct-form-control')
    })
  })

  describe('Custom', () => {
    it('should apply grid class by grid prop', () => {
      const wrapper = mount(<Input grid={1 / 4} />)

      expect(wrapper).to.have.className('rct-grid-md-25-000')
    })

    it('should be read only bu readOnly prop', () => {
      const wrapper = shallow(<Input readOnly />)

      expect(wrapper).to.have.attr('readonly', 'readonly')
    })

    it('should validate input data by type prop', () => {
      const wrapper = shallow(<Input type='integer' trigger='change' />)

      wrapper.simulate('change', {target: {value: 'foo'}, nativeEvent: true})

      expect(wrapper).to.have.className('has-error')
    })
  })

  describe('Behavior', () => {
    it('should call native onChange callback', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Input onBlur={cb} />)

      wrapper.simulate('blur')
    })

    it('should call event callback by trigger prop', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Input trigger='change' onChange={cb} />)

      wrapper.simulate('change', {target: {value: 'foo'}, nativeEvent: true})

      expect(wrapper.instance().getValue()).to.equal('foo')
    })
  })
})
