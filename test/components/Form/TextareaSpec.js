import { shallow, mount } from 'enzyme'
import Textarea from '../../../src/Textarea'
import { gridClassName } from '../../testUtils'

describe('Textarea Spec', () => {
  const defaultWrapper = shallow(<Textarea value='foo' placeholder='bar' />)

  describe('Default', () => {
    it('should generate a textarea tag', () => {
      expect(defaultWrapper).to.have.tagName('textarea')
    })

    it('should generate correct placeholder', () => {
      expect(defaultWrapper).to.have.attr('placeholder', 'bar')
    })
  })

  describe('Custom', () => {
    it('should apply grid class by grid prop', () => {
      const wrapper = mount(<Textarea grid={1 / 4} />)

      expect(wrapper).to.have.className(gridClassName('rctui-grid-md-25-000'))
    })

    it('should apply addition style by style prop', () => {
      const wrapper = mount(<Textarea style={{foo: 'bar'}} />)

      expect(wrapper).to.have.style('foo', 'bar')
    })

    it('should apply addition class by className prop', () => {
      const wrapper = mount(<Textarea className='foo' />)

      expect(wrapper).to.have.className('foo')
    })

    it('should apply resize:none by autoHeight prop ', () => {
      const wrapper = mount(<Textarea autoHeight />)

      expect(wrapper).to.have.style('resize', 'none')
    })
  })

  describe('Behavior', () => {
    it('should call native event callback', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Textarea onBlur={cb} />)

      wrapper.simulate('blur')
    })

    it('should call event callback by trigger prop', (done) => {
      const cb = () => {
        done()
      }

      const wrapper = shallow(<Textarea trigger='change' onChange={cb} />)

      wrapper.simulate('change', {target: {value: 'foo'}, nativeEvent: true})
    })
  })
})
