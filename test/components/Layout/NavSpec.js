import { shallow, mount } from 'enzyme'

import Nav from '../../../src/Nav.js'
import NavItem from '../../../src/NavItem.js'

describe('Nav Spec', () => {
  describe('Default', () => {
    const defaultWrapper = mount(<Nav>
                                   <NavItem/>
                                   <NavItem/>
                                   <NavItem/>
                                 </Nav>)
    const defaultContainerWrapper = shallow(<Nav/>)
    const defaultItemWrapper = shallow(<NavItem/>)

    it('should apply UL tag for container', () => {
      expect(defaultContainerWrapper).to.have.tagName('ul')
    })

    it('should apply LI tag for item', () => {
      expect(defaultItemWrapper).to.have.tagName('li')
    })

    it('should apply right quantity by items quantity', () => {
      expect(defaultWrapper.find(NavItem).length).to.be.equal(3)
    })

    it('should apply item index as id by default', () => {
      const itemsWrapper = defaultWrapper.find(NavItem)

      itemsWrapper.forEach((e, i) => {
        expect(e).to.have.prop('id', i + '')
      })
    })
  })

  describe('Custom', function () {
    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Nav className='foo' />
      )

      expect(wrapper1).to.have.className('foo')
    })

    it('should render by active prop', () => {
      const wrapper1 = mount(<Nav active='0'>
                               <NavItem/>
                               <NavItem/>
                               <NavItem/>
                             </Nav>)

      expect(wrapper1.find('a').at(0)).to.have.className('active')
    })

    it('should render by type prop', () => {
      const wrapper1 = shallow(<Nav type='pill' />)
      const wrapper2 = shallow(<Nav type='tab' />)

      expect(wrapper1).to.have.className('pills')
      expect(wrapper2).to.have.className('tabs')
    })

    it('should render by inline prop', () => {
      const wrapper1 = shallow(<Nav inline/>)

      expect(wrapper1).to.have.className('inline')
    })

    it('should render by id prop', () => {
      const wrapper1 = mount(<NavItem id='foo' />)

      expect(wrapper1).to.have.prop('id', 'foo')
    })

    it('should render by disabled', () => {
      const wrapper1 = mount(<NavItem disabled/>)

      expect(wrapper1.find('a')).to.have.className('disabled')
    })
  })

  describe('Behavior', () => {
    it('should call onSelect callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = mount(
        <Nav onSelect={cb}>
          <NavItem/>
          <NavItem/>
          <NavItem/>
        </Nav>
      )

      wrapper1.find('li a').at(0).simulate('click')
    })

    it('should call onClick callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = mount(
        <Nav>
          <NavItem onClick={cb} />
          <NavItem/>
          <NavItem/>
        </Nav>
      )

      wrapper1.find('li a').at(0).simulate('click')
    })
  })
})
