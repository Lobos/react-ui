import { shallow, mount } from 'enzyme'
import { compData } from '../../mock/breadcrumb'

import Breadcrumb from '../../../src/Breadcrumb.js'

describe('Breadcrumb Spec', () => {
  describe('Default', () => {
    const defaultWrapper1 = shallow(<Breadcrumb />)
    const defaultWrapper2 = mount(<Breadcrumb data={compData.dataList1} />)
    const defaultWrapper3 = mount(<Breadcrumb data={compData.dataList2} />)
    const defaultWrapper4 = mount(<Breadcrumb data={compData.dataList4} />)

    it('should be OL tag by default', () => {
      expect(defaultWrapper1).to.have.tagName('ol')
    })

    it('should apply LI tag for item', () => {
      expect(defaultWrapper2.childAt(0)).to.have.tagName('li')
    })

    it('should apply right quantity by items array length', () => {
      expect(defaultWrapper3.find('li').length).to.be.equal(compData.dataList2.length)
    })

    it('should apply A tag for item with href or onClick properties', () => {
      const itemWrappers = defaultWrapper4.find('li')

      itemWrappers.forEach((e, i) => {
        expect(e.childAt(0)).to.have.tagName('a')
      })
    })
  })

  describe('Custom', function () {
    it('should apply right text by text prop', () => {
      const wrapper1 = mount(<Breadcrumb data={compData.dataList1} />)
      const wrapper2 = mount(<Breadcrumb data={compData.dataList2} />)

      const itemWrapper1 = wrapper1.find('li')
      const itemWrapper2 = wrapper2.find('li')

      expect(itemWrapper1).to.have.text('foo')
      itemWrapper2.forEach((e, i) => {
        expect(e).to.have.text(compData.dataList2[i].text)
      })
    })

    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Breadcrumb data={compData.dataList1} className='foo' />
      )

      expect(wrapper1).to.have.className('foo')
    })

    it('should apply right active class for item by active property', () => {
      const wrapper1 = mount(<Breadcrumb data={compData.dataList3} />)

      expect(wrapper1.find('li').at(2)).to.have.className('active')
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = shallow(
        <Breadcrumb data={[{onClick: cb}]} className='foo' />
      )

      wrapper1.find('li a').simulate('click')
    })
  })
})
