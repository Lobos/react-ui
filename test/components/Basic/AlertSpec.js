import { shallow, mount } from 'enzyme'
import Alert from '../../../src/Alert'

describe('Alert Spec', () => {

  describe('Default', () => {
    const defaultWrapper = shallow(<Alert/>)

    it('Should generate a div container tag', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('render info hint category as default', () => {
      expect(defaultWrapper).to.have.className('info')
    })
  })

  describe('Custom', () => {

    it('should apply correct text or element as children nodes', () => {
      const wrapper1 = mount(<Alert>
                               foo
                             </Alert>)
      const wrapper2 = mount(<Alert>
                               <h1>foo</h1>
                             </Alert>)

      expect(wrapper1).to.contain.text('foo')
      expect(wrapper2).to.contain(<h1>foo</h1>)
    })

    it('should ensure additional classes or styles passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Alert className='foo' />
      )
      const wrapper2 = shallow(
        <Alert style={{foo: 'bar'}} />
      )

      expect(wrapper1).to.have.className('foo')
      expect(wrapper2).to.have.style('foo', 'bar')
    })

    it('render correct hint category by type prop', () => {
      const wrapper1 = shallow(<Alert type='success' />)

      expect(wrapper1).to.have.className('success')
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = mount(
        <Alert onClose={cb} />
      )

      wrapper1.find('a').simulate('click')
    })
  })
})
