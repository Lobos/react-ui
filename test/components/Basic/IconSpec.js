import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Icon Spec', () => {

  describe('Default', function () {
    it('Should generate a i tag', () => {
      const wrapper1 = shallow(<Icon/>)
      expect(wrapper1).to.have.tagName('i')
    })

    it('Should generate a i tag with default icon prefix', () => {
      const wrapper1 = shallow(<Icon icon='foo' />)
      expect(wrapper1).to.have.className('icon-foo')
    })

    it('Should generate correct size-css with default icon prefix by number', () => {
      const wrapper1 = shallow(<Icon size='3' />)
      const wrapper2 = shallow(<Icon size={4} />)
      expect(wrapper1).to.have.className('icon-3x')
      expect(wrapper2).to.have.className('icon-4x')
    })

    it('Should generate correct size-css with default icon prefix by multiple', () => {
      const wrapper1 = shallow(<Icon size='lg' />)
      const wrapper2 = shallow(<Icon size='2x' />)
      expect(wrapper1).to.have.className('icon-lg')
      expect(wrapper2).to.have.className('icon-2x')
    })
  })

  describe('Behavior', () => {
    it('Should append icon-spin class with spin()'
    //  , ()=> {
    //  const instance = ReactTestUtils.renderIntoDocument(<Icon/>)
    //  instance.spin()
    //  assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/))
    // }
    )

    it('Should remove icon-spin class with unspin() a i tag'
    //  , ()=> {
    //  const instance = ReactTestUtils.renderIntoDocument(<Icon spin={true}/>)
    //  instance.unspin()
    //  assert.notOk(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/))
    // }
    )

    it('Should change the prefix with setPrefix(prefix)'
    //  , ()=> {
    //  Icon.setPrefix('fa')
    //  const instance1 = ReactTestUtils.renderIntoDocument(<Icon/>)
    //  const instance2 = ReactTestUtils.renderIntoDocument(<Icon icon='foo'/>)
    //  assert.ok(ReactDOM.findDOMNode(instance1).className.match(/\bfa\b/))
    //  assert.ok(ReactDOM.findDOMNode(instance2).className.match(/\bfa-foo\b/))
    // }
    )
  })

  describe('Feature', () => {
    it('Should apply icon-spin class', () => {
      const wrapper1 = shallow(<Icon spin={true} />)
      expect(wrapper1).to.have.className('icon-spin')
    })
  })
})
