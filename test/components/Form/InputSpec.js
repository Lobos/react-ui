import { shallow, mount } from 'enzyme'
import Input from '../../../src/Input'
import { gridClassName } from '../../testUtils'

describe('Input Spec', () => {
  const defaultWrapper = mount(<Input placeholder='foo' />)

  describe('Default', () => {
    it('should generate a input tag', () => {
      expect(defaultWrapper).to.have.tagName('input')
    })

    it('should generate correct placeholder', () => {
      expect(defaultWrapper).to.have.attr('placeholder', 'foo')
    })

    it('should apply input class', () => {
      expect(defaultWrapper).to.have.className('input')
    })
  })

  describe('Custom', () => {
    it('should apply grid class by grid prop', () => {
      const wrapper = mount(<Input grid={1 / 4} />)

      expect(wrapper).to.have.className(gridClassName('rctui-grid-md-25-000'))
    })

    it('should be read only bu readOnly prop', () => {
      const wrapper = shallow(<Input readOnly />)

      expect(wrapper).to.have.attr('readonly', 'readonly')
    })

    it('should validate input data by type prop', () => {
      const wrapper = mount(<Input type='integer' trigger='change' />)

      wrapper.simulate('change', {target: {value: 'foo'}, nativeEvent: true})

      expect(wrapper).to.have.value('')
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
