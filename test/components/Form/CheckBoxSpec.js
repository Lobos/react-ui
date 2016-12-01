import { shallow, mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox'
import Checkbox from '../../../src/Checkbox'
import CheckboxGroup from '../../../src/CheckboxGroup'
import { hashClassNameTest } from '../../testUtils'

describe('Checkbox & Checkbox Group Spec', () => {

  describe('Checkbox', () => {
    const _defaultCheckbox = mount(<Checkbox text='foo' checked/>)

    it('should generate a label container tag', () => {
      expect(_defaultCheckbox.find(compSelector.checkboxItem).length).to.equal(1)
    })

    it('should apply text content by text', () => {
      expect(_defaultCheckbox.find('span').nodes[1].innerHTML).to.equal('foo')
    })

    it('should apply boolean value by default', () => {
      expect(_defaultCheckbox.find('input')).to.have.value('true')
    })

    it('should apply checked value by value', (done) => {
      const cb = (value) => {
        expect(value).to.equal('foo')
        done()
      }
      const wrapper1 = mount(<Checkbox text='foo' onChange={cb} value='foo' />)
      wrapper1.find('input').simulate('change', { target: { checked: true } })
    })

    it('should apply checked status by checked', () => {
      expect(_defaultCheckbox.find('input')).to.be.checked()
    })
  })

  describe('Checkbox Group', () => {
    const _defaultCheckboxGroup1 = mount(<CheckboxGroup data={compData.dataList1} />),
      _defaultCheckboxGroup2 = mount(<CheckboxGroup data={compData.dataList2} />),
      _defaultCheckboxGroup3 = mount(<CheckboxGroup data={compData.dataList3} />)

    describe('should render by data prop', () => {
      const checkboxItemsWrapper1 = _defaultCheckboxGroup1.find(compSelector.checkboxItem),
        checkboxItemsWrapper2 = _defaultCheckboxGroup2.find(compSelector.checkboxItem),
        checkboxItemsWrapper3 = _defaultCheckboxGroup3.find(compSelector.checkboxItem)

      it('simple array', () => {
        expect(checkboxItemsWrapper1.length).to.equal(compData.dataList1.length)
        compData.dataList1.forEach((e, i) => {
          expect(checkboxItemsWrapper1.at(i)).to.have.text(e)
        })
      })

      it('object array', () => {
        expect(checkboxItemsWrapper2.length).to.equal(compData.dataList2.length)
        compData.dataList2.forEach((e, i) => {
          expect(checkboxItemsWrapper2.at(i)).to.have.text(e.text)
        })
      })

      it('key-value object', () => {
        const keys = Object.keys(compData.dataList3)

        expect(checkboxItemsWrapper3.length).to.equal(keys.length)

        keys.forEach((e, i) => {
          expect(checkboxItemsWrapper3.at(i)).to.have.text(compData.dataList3[e])
        })
      })
    })

    describe('should apply checked status by value prop', () => {
      const wrapper1 = mount(<CheckboxGroup data={compData.dataList1} value='foo,bar,baz' />),
        wrapper2 = mount(<CheckboxGroup data={compData.dataList2} value='1,2,3' />),
        wrapper3 = mount(<CheckboxGroup data={compData.dataList3} value='1,2,3' />)

      it('simple array', () => {
        wrapper1.find('input').forEach(e => {
          expect(e).to.be.checked()
        })
      })

      it('object array', () => {
        wrapper1.find('input').forEach(e => {
          expect(e).to.be.checked()
        })
      })

      it('key-value object', () => {
        wrapper1.find('input').forEach(e => {
          expect(e).to.be.checked()
        })
      })
    })

    it('should render by inline/block prop', () => {
      const wrapper1 = mount(<CheckboxGroup inline data={compData.dataList1} />),
        wrapper2 = mount(<CheckboxGroup inline={false} data={compData.dataList1} />),
        wrapper3 = mount(<CheckboxGroup block data={compData.dataList1} />),
        wrapper4 = mount(<CheckboxGroup block={false} data={compData.dataList1} />)

      wrapper1.find('label').forEach((e) => {
        hashClassNameTest(e, compClass.checkboxInlineStyle, true)
        hashClassNameTest(e, compClass.checkboxBlockStyle, false)
      })
      wrapper2.find('label').forEach((e) => {
        hashClassNameTest(e, compClass.checkboxInlineStyle, false)
        hashClassNameTest(e, compClass.checkboxBlockStyle, true)
      })
      wrapper3.find('label').forEach((e) => {
        hashClassNameTest(e, compClass.checkboxInlineStyle, false)
        hashClassNameTest(e, compClass.checkboxBlockStyle, true)
      })
      wrapper4.find('label').forEach((e) => {
        hashClassNameTest(e, compClass.checkboxInlineStyle, true)
        hashClassNameTest(e, compClass.checkboxBlockStyle, false)
      })
    })

    describe('should render by *tpl prop', () => {
      const wrapper = mount(<CheckboxGroup textTpl='{id}' valueTpl='{text}' data={compData.dataList2} />)

      it('textTpl', () => {
        const checkboxItemsWrapper1 = wrapper.find(compSelector.checkboxItem)

        compData.dataList2.forEach((e, i) => {
          expect(checkboxItemsWrapper1.at(i)).to.have.text(e.id)
        })
      })

      it('valueTpl', (done) => {
        wrapper.find('input').forEach(e => {
          e.simulate('change', { target: { checked: true } })
        })

        setTimeout(() => {
          wrapper.find('input').forEach(e => {
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
    it('should be read only by readOnly prop', () => {
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
