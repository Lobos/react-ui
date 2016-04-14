import React from 'react/lib/ReactWithAddons'
import { mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox.js'
import CheckBox from '../../../src/Checkbox.js'
import CheckBoxGroup from '../../../src/CheckboxGroup.js'

describe('Feature', () => {
  it('Should be read only when readOnly=true', () => {
    const wrapper1 = mount(<CheckBox readOnly data={compData.dataList1} />),
      wrapper2 = mount(<CheckBoxGroup readOnly data={compData.dataList2} />)

    assert.ok(wrapper1.prop('readOnly'))
    assert.ok(wrapper1.find('input').get(0).disabled)
    
    assert.ok(wrapper2.prop('readOnly'))
    wrapper2.find('input').forEach(e => {
      assert.ok(e.get(0).disabled)
    })
  })
})
