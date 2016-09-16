import { shallow, mount } from 'enzyme'
import { compData, compSelector } from '../../mock/radio'
import RadioGroup from '../../../src/RadioGroup'

describe('RadioGroup Spec', function () {
  const _defaultRadioGroup1 = mount(<RadioGroup data={compData.dataList1} />),
    _defaultRadioGroup2 = mount(<RadioGroup data={compData.dataList2} />),
    _defaultRadioGroup3 = mount(<RadioGroup data={compData.dataList3} />)

  describe('Default', function () {
    describe('should render by data prop', () => {
      const itemsWrapper1 = _defaultRadioGroup1.find(compSelector.radioItem),
        itemsWrapper2 = _defaultRadioGroup2.find(compSelector.radioItem),
        itemsWrapper3 = _defaultRadioGroup3.find(compSelector.radioItem)

      it('simple array', () => {
        expect(itemsWrapper1.length).to.equal(compData.dataList1.length)
        compData.dataList1.forEach((e, i) => {
          expect(itemsWrapper1.at(i)).to.have.text(e)
        })
      })

      it('object array', () => {
        expect(itemsWrapper2.length).to.equal(compData.dataList2.length)
        compData.dataList2.forEach((e, i) => {
          expect(itemsWrapper2.at(i)).to.have.text(e.text)
        })
      })

      it('key-value object', () => {
        const keys = Object.keys(compData.dataList3)

        expect(itemsWrapper3.length).to.equal(keys.length)
        keys.forEach((e, i) => {
          expect(itemsWrapper2.at(i)).to.have.text(compData.dataList3[e])
        })
      })
    })

    describe('should apply checked status by value prop', () => {
      const wrapper1 = mount(<RadioGroup data={compData.dataList1} value='foo' />),
        wrapper2 = mount(<RadioGroup data={compData.dataList2} value='1' />),
        wrapper3 = mount(<RadioGroup data={compData.dataList3} value='1' />)

      it('simeple array', () => {
        expect(wrapper1.find('input').at(0)).to.be.checked()
      })

      it('object array', () => {
        expect(wrapper2.find('input').at(0)).to.be.checked()
      })

      it('key-value object', () => {
        expect(wrapper3.find('input').at(0)).to.be.checked()
      })
    })
  })

  describe('Custom', function () {
    it('should render by inline/block prop')

    describe('should render by *tpl prop', () => {
      const wrapper = mount(<RadioGroup textTpl='{id}' valueTpl='{text}' data={compData.dataList2} />)

      it('textTpl', () => {
        const itemsWrapper = wrapper.find(compSelector.radioItem)

        compData.dataList2.forEach((e, i) => {
          expect(itemsWrapper.at(i)).to.have.text(e.id)
        })
      })

      it('valueTpl', (done) => {
        const inputWrapper1 = wrapper.find('input').at(0)

        inputWrapper1.simulate('click')

        setTimeout(() => {
          expect(inputWrapper1).to.be.checked()
          done()
        }, 0)
      })
    })
  })

  describe('Behavior', () => {
    it('should call onChange callback', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(<RadioGroup data={compData.dataList1} onChange={cb} />)

      wrapper1.simulate('change')
    })
  })

  describe('Feature', function () {
    it('should be read only by readOnly prop', () => {
      const wrapper = mount(<RadioGroup readOnly data={compData.dataList1} />),
        inputWrapper = wrapper.find('input').at(0)

      expect(wrapper).to.have.prop('readOnly', true)

      inputWrapper.simulate('click')

      expect(wrapper).to.be.not.checked()
    })
  })
})
