import React from 'react/lib/ReactWithAddons'
import { mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox.js'
import CheckBox from '../../../src/Checkbox.js'
import CheckBoxGroup from '../../../src/CheckboxGroup.js'

describe('Feature', () => {
  it('Should be read only when readOnly=true', () => {
    const wrapper1 = mount(<CheckBox readOnly data={compData.dataList1} />),
      wrapper2 = mount(<CheckBoxGroup readOnly data={compData.dataList2} />)

    expect(wrapper1).to.have.prop('readOnly', true)
    expect(wrapper1.find('input')).to.be.disabled()

    expect(wrapper2).to.have.prop('readOnly', true)
    wrapper2.find('input').forEach(e => {
      expect(e.find('input')).to.be.disabled()
    })
  })
})
