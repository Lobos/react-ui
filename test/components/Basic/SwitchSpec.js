import { shallow, mount } from 'enzyme'

import Switch from '../../../src/Switch.js'

describe('SwitchSpec', () => {
  const defaultWrapper = mount(<Switch />)

  describe('Default', function () {
    it('should generate a div container tag', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should apply "OFF/ON" as default text', () => {
      const spans = defaultWrapper.find('span')

      expect(spans.at(1)).to.have.text('On')
      expect(spans.at(2)).to.have.text('Off')
    })

    it('should apply correct swtich status after trigger change event', () => {
      const wrapper1 = mount(<Switch />)

      wrapper1.find('input').simulate('change', {target: { checked: true }})

      expect(wrapper1.instance().getValue()).to.be.true
    })
  })

  describe('Custom', function () {
    it('should apply custom text by text prop', () => {
      const wrapper = mount(<Switch text='Yes|No' />)

      const spans = wrapper.find('span')

      expect(spans.at(1)).to.have.text('Yes')
      expect(spans.at(2)).to.have.text('No')
    })

    it('should ensure additional classes or styles passed in, adding but not overriding', () => {
      const wrapper1 = mount(
        <Switch className='foo' />
      )
      // const wrapper2 = mount(
      // <Switch style={{foo: 'bar'}} />
      // )

      expect(wrapper1).to.have.className('foo')
    // expect(wrapper2).to.have.style('foo', 'bar')
    })

    it('should apply correct class by size prop', () => {
      const wrapper1 = mount(<Switch size='small' />)
      const wrapper2 = mount(<Switch size='large' />)

      expect(wrapper1).to.have.className('small')
      expect(wrapper2).to.have.className('large')
    })

    it('should apply correct class by round prop', () => {
      const wrapper = mount(<Switch round />)

      expect(wrapper).to.have.className('round')
    })

    it('should be read only by readOnly prop', () => {
      const wrapper1 = mount(<Switch readOnly />)
      const wrapper2 = mount(<Switch checked readOnly />)

      expect(wrapper1.find('input')).to.be.disabled()
      expect(wrapper2.find('input')).to.be.disabled()
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = mount(
        <Switch onChange={cb} />
      )

      wrapper1.find('input').simulate('change')
    })
  })
})
