import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox.js'
import Checkbox from '../../../src/Checkbox.js'
import CheckboxGroup from '../../../src/CheckboxGroup.js'

describe('Basic', () => {
  const _defaultCheckbox = mount(<Checkbox text='foo' checked/>),
    _defaultCheckboxGroup1 = mount(<CheckboxGroup data={compData.dataList1} />),
    _defaultCheckboxGroup2 = mount(<CheckboxGroup data={compData.dataList2} />)

  describe('CheckBox', () => {
    it('Should generate a label container tag', () => {
      assert.equal(_defaultCheckbox.find(compSelector.checkboxItem).length, 1)
    })

    it('Should apply text content by text', () => {
      assert.equal(_defaultCheckbox.text(), 'foo')
    })

    it('Should apply boolean value by default', (done) => {
      _defaultCheckbox.find('input').simulate('change', {target: { checked: true }})
      setTimeout(() => {
        assert.equal(typeof _defaultCheckbox.instance().getValue(), 'boolean')
        done()
      }, 0)
    })

    it('Should apply checked value by value', () => {
      const wrapper1 = shallow(<Checkbox text='foo' value='foo' />),
        wrapper2 = shallow(<Checkbox text='foo' value={1} />)

      assert.equal(wrapper1.instance().getValue(), 'foo')
      assert.equal(wrapper2.instance().getValue(), 1)
    })

    it('Should apply checked status by checked', () => {
      assert.ok(_defaultCheckbox.prop('checked'))
    })
  })

  describe('CheckBox Group', () => {
    describe('Should render by Array data', () => {
      const checkboxItemsWrapper1 = _defaultCheckboxGroup1.find(compSelector.checkboxItem),
        checkboxItemsWrapper2 = _defaultCheckboxGroup2.find(compSelector.checkboxItem)

      it('Should have the same size', () => {
        assert.equal(checkboxItemsWrapper1.length, compData.dataList1.length)
        assert.equal(checkboxItemsWrapper2.length, compData.dataList2.length)
      })

      it('Should have the same text', () => {
        compData.dataList1.forEach((e, i) => {
          assert.equal(checkboxItemsWrapper1.at(i).text(), e)
        })

        compData.dataList2.forEach((e, i) => {
          assert.equal(checkboxItemsWrapper2.at(i).text(), e.text)
        })
      })
    })

    it('Should render by inline', () => {
      const wrapper1 = mount(<CheckboxGroup inline data={compData.dataList1} />).find('div'),
        wrapper2 = mount(<CheckboxGroup inline={false} data={compData.dataList1} />).find('div')

      expect(wrapper1).to.have.className(compClass.checkboxGroupInlineStyle)
      expect(wrapper2).to.not.have.className(compClass.checkboxGroupInlineStyle)
    })

    describe('Should render by Tpl', () => {
      it('Should render by textTpl', () => {
        const wrapper1 = mount(<CheckboxGroup textTpl='{id}' data={compData.dataList2} />),
          checkboxItemsWrapper1 = wrapper1.find(compSelector.checkboxItem)

        compData.dataList2.forEach((e, i) => {
          assert.equal(checkboxItemsWrapper1.at(i).text(), e.id)
        })
      })

      it('Should render by valueTpl', (done) => {
        const wrapper1 = mount(<CheckboxGroup valueTpl='{text}' data={compData.dataList2} />)
        wrapper1.find('input').forEach(e => {
          e.simulate('change', {target: { checked: true }})
        })

        setTimeout(() => {
          assert.equal(wrapper1.instance().getValue(), 'foo,bar,baz')
          done()
        }, 0)
      })
    })

    it('Should apply value by sep', function (done) {
      const wrapper1 = mount(<CheckboxGroup sep='|' data={compData.dataList2} />)
      wrapper1.find('input').forEach(e => {
        e.simulate('change', {target: { checked: true }})
      })

      setTimeout(() => {
        assert.equal(wrapper1.instance().getValue(), '1|2|3')
        done()
      }, 0)
    })

    it('Should apply checked status by value', () => {
      const wrapper1 = mount(<CheckboxGroup data={compData.dataList2} value='1,2,3' />)

      wrapper1.find('input').forEach(e => {
        expect(e).to.be.checked()
      })
    })
  })
})
