import { shallow, mount } from 'enzyme'

import Card from '../../../src/Card.js'

describe('Card Spec', () => {
  describe('Default', () => {
    const defaultWrapper = shallow(<Card>
                                     Hello World
                                   </Card>)
    it('should apply div tag for container', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should apply content by children prop', () => {
      expect(defaultWrapper).to.have.text('Hello World')
    })
  })

  describe('Custom', function () {
    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Card className='foo' />
      )

      expect(wrapper1).to.have.className('foo')
    })

    it('should apply header by Card.Header comp', () => {
      const wrapper1 = mount(<Card>
                               <Card.Header>
                                 Header
                               </Card.Header>
                             </Card>)

      expect(wrapper1.find('.card-header').length).to.be.equal(1)
    })

    it('should apply header by Card.Nav and Card.NavItem comp', () => {
      const wrapper1 = mount(<Card>
                               <Card.Nav active='1'>
                                 <Card.NavItem id='1'>
                                   Tab 1
                                 </Card.NavItem>
                                 <Card.NavItem id='2'>
                                   Tab 2
                                 </Card.NavItem>
                                 <Card.NavItem id='3'>
                                   Tab 3
                                 </Card.NavItem>
                               </Card.Nav>
                             </Card>)

      expect(wrapper1.find('ul.nav').length).to.be.equal(1)
      expect(wrapper1.find('li.item').length).to.be.equal(3)
    })

    it('should render by type prop', () => {
      const wrapper1 = shallow(<Card type='primary' />)

      expect(wrapper1).to.have.className('card-primary')
    })

    it('should render by block prop', () => {
      const wrapper1 = shallow(<Card block/>)

      expect(wrapper1).to.have.className('card-block')
    })
  })
})
