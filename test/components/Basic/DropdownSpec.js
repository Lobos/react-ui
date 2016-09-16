import { shallow, mount } from 'enzyme'
import Dropdown from '../../../src/Dropdown'

describe('Dropdown Spec', () => {
  const defaultWrapper = shallow(<Dropdown text='DropDown'>
                                   <a>foo</a>
                                   <a>bar</a>
                                   <a>baz</a>
                                 </Dropdown>)

  describe('Default', () => {
    it('should generate a div tag as container', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should render by children prop', () => {
      expect(defaultWrapper.find('a').length).to.be.equal(3)
    })
  })

  describe('Custom', () => {
    it('should render <hr/> tag as divided placeholder', () => {
      const wrapper1 = mount(
        <Dropdown>
          <a>foo</a>
          <hr/>
          <a>bar</a>
        </Dropdown>
      )

      expect(wrapper1.find('.dropdown-divider').length).to.be.equal(1)
    })

    it('should render by right prop', () => {
      const wrapper1 = mount(
        <Dropdown right>
          <a>foo</a>
        </Dropdown>
      )

      expect(wrapper1.find('.dropdown-menu')).to.have.className('dropdown-menu-right')
    })

    it('should render by status prop', () => {
      const wrapper1 = mount(
        <Dropdown status='primary'>
          <a>foo</a>
        </Dropdown>
      )

      expect(wrapper1.find('button')).to.have.className('primary')
    })

    it('should render by size prop', () => {
      const wrapper1 = mount(
        <Dropdown size='large'>
          <a>foo</a>
        </Dropdown>
      )

      expect(wrapper1.find('button')).to.have.className('large')
    })

    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Dropdown className='foo'>
          <a>foo</a>
        </Dropdown>
      )

      const wrapper2 = shallow(
        <Dropdown style={{foo: 'bar'}}>
          <a>foo</a>
        </Dropdown>
      )

      expect(wrapper1).to.have.className('foo')
      expect(wrapper2).to.have.style('foo', 'bar')
    })

    it('should render onClick prop as split mode', () => {
      const cb = () => {
      }
      const wrapper1 = mount(
        <Dropdown onClick={cb}>
          <a>foo</a>
        </Dropdown>
      )

      expect(wrapper1.find('button').length).to.be.equal(2)
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(
          <Dropdown onClick={cb}>
            <a>foo</a>
          </Dropdown>
      )

      wrapper1.find('Dropdown').simulate('click')
    })
  })
})
