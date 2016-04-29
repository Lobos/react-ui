import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox.js'
import Checkbox from '../../../src/Checkbox.js'
import CheckboxGroup from '../../../src/CheckboxGroup.js'

describe('Checkbox & Checkbox Group Spec', () => {
  const _defaultCheckbox = mount(<Checkbox text='foo' checked/>),
    _defaultCheckboxGroup1 = mount(<CheckboxGroup data={compData.dataList1} />),
    _defaultCheckboxGroup2 = mount(<CheckboxGroup data={compData.dataList2} />)

  describe('Checkbox', () => {
    it('should generate a label container tag', () => {
      expect(_defaultCheckbox.find(compSelector.checkboxItem).length).to.equal(1)
    })

    it('should apply text content by text', () => {
      expect(_defaultCheckbox).to.have.text('foo')
    })

    it('should apply boolean value by default', (done) => {
      _defaultCheckbox.find('input').simulate('change', { target: { checked: true } })
      setTimeout(() => {
        expect(_defaultCheckbox.find('input')).to.have.value('true')
        done()
      }, 0)
    })

    it('should apply checked value by value', () => {
      const wrapper1 = shallow(<Checkbox text='foo' value='foo' />),
        wrapper2 = shallow(<Checkbox text='foo' value={1} />)

      expect(wrapper1.instance().getValue()).to.equal('foo')
      expect(wrapper2.instance().getValue()).to.equal(1)
    })

    it('should apply checked status by checked', () => {
      expect(_defaultCheckbox.find('input')).to.be.checked()
    })
  })

  describe('Checkbox Group', () => {
    describe('should render by Array data', () => {
      const checkboxItemsWrapper1 = _defaultCheckboxGroup1.find(compSelector.checkboxItem),
        checkboxItemsWrapper2 = _defaultCheckboxGroup2.find(compSelector.checkboxItem)

      it('should have the same size', () => {
        expect(checkboxItemsWrapper1.length).to.equal(compData.dataList1.length)
        expect(checkboxItemsWrapper2.length).to.equal(compData.dataList2.length)
      })

      it('should have the same text', () => {
        compData.dataList1.forEach((e, i) => {
          expect(checkboxItemsWrapper1.at(i)).to.have.text(e)
        })

        compData.dataList2.forEach((e, i) => {
          expect(checkboxItemsWrapper2.at(i)).to.have.text(e.text)
        })
      })
    })

    it('should render by inline', () => {
      const wrapper1 = mount(<CheckboxGroup inline data={compData.dataList1} />).find('div'),
        wrapper2 = mount(<CheckboxGroup inline={false} data={compData.dataList1} />).find('div')

      expect(wrapper1).to.have.className(compClass.checkboxGroupInlineStyle)
      expect(wrapper2).to.not.have.className(compClass.checkboxGroupInlineStyle)
    })

    describe('should render by Tpl', () => {
      it('should render by textTpl', () => {
        const wrapper1 = mount(<CheckboxGroup textTpl='{id}' data={compData.dataList2} />),
          checkboxItemsWrapper1 = wrapper1.find(compSelector.checkboxItem)

        compData.dataList2.forEach((e, i) => {
          expect(checkboxItemsWrapper1.at(i)).to.have.text(e.id)
        })
      })

      it('should render by valueTpl', (done) => {
        const wrapper1 = mount(<CheckboxGroup valueTpl='{text}' data={compData.dataList2} />)
        wrapper1.find('input').forEach(e => {
          e.simulate('change', { target: { checked: true } })
        })

        setTimeout(() => {
          wrapper1.find('input').forEach(e => {
            expect(e).to.be.checked()
          })
          done()
        }, 0)
      })
    })

    it('should apply value by sep', function (done) {
      const wrapper1 = mount(<CheckboxGroup sep='|' data={compData.dataList2} />)
      wrapper1.find('input').forEach(e => {
        e.simulate('change', { target: { checked: true } })
      })

      setTimeout(() => {
        expect(wrapper1.instance().getValue()).to.be.equal('1|2|3')
        done()
      }, 0)
    })

    it('should apply checked status by value', () => {
      const wrapper1 = mount(<CheckboxGroup data={compData.dataList2} value='1,2,3' />)

      wrapper1.find('input').forEach(e => {
        expect(e).to.be.checked()
      })
    })
  })

  describe('should call onChange callback', () => {
    it('for Checkbox', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(<Checkbox text='foo' onChange={cb} />)

      wrapper1.simulate('change')
    })

    it('for CheckboxGroup', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(<CheckboxGroup data={compData.dataList2} onChange={cb} />)

      wrapper1.simulate('change')
    })
  })

  describe('Feature', () => {
    it('should be read only when readOnly=true', () => {
      const wrapper1 = mount(<Checkbox readOnly data={compData.dataList1} />),
        wrapper2 = mount(<CheckboxGroup readOnly data={compData.dataList2} />)

      expect(wrapper1).to.have.prop('readOnly', true)
      expect(wrapper1.find('input')).to.be.disabled()

      expect(wrapper2).to.have.prop('readOnly', true)
      wrapper2.find('input').forEach(e => {
        expect(e.find('input')).to.be.disabled()
      })
    })
  })
})
