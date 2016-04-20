import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/select.js'
import Select from '../../../src/Select.js'

describe('Feature', () => {
  const {dataList1} = compData

  it('Should be read only when readOnly=true', () => {
    const wrapper1 = shallow(<Select data={dataList1} readOnly={true} />)

    expect(wrapper1).to.have.prop('readOnly', true)
  })

  it(' Should be filtered when filterAble=true', () => {
    const wrapper1 = mount(<Select data={dataList1} filterAble={true} />),
      _selectWrapper1 = wrapper1.find(compClass.select),
      _optionsWrapper1 = _selectWrapper1.find(compClass.options)

    // prop
    expect(wrapper1).to.have.prop('filterAble', true)

    // ui
    wrapper1.instance().showOptions()
    expect(_optionsWrapper1).to.have.exactly(1).descendants('input')
  })

  it(' Should be multi select when mult=true', () => {
    const wrapper1 = shallow(<Select mult={true} data={dataList1} />)

    expect(wrapper1).to.have.prop('mult', true)
  })
})
