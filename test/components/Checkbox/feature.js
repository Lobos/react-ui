import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/checkbox.js'
import CheckBox from '../../../src/Checkbox.js'
import CheckBoxGroup from '../../../src/CheckboxGroup.js'

describe('Feature', () => {
  it('Should be read only when readOnly=true', () => {
    const wrapper1 = shallow(<CheckBox readOnly={true} />)

    assert.ok(wrapper1.prop('readOnly'))
  })
})
