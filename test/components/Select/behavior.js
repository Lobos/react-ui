import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/select.js'
import Select from '../../../src/Select.js'

describe('Behavior', () => {
  const {dataList1} = compData,

    _defaultSingleWrapper = shallow(
      <Select data={dataList1} />
    ),
    _defaultInstance = _defaultSingleWrapper.instance()

  it('Should call onChange callback', (done) => {
    const cb = () => {
        done()
      },
      wrapper1 = shallow(<Select data={dataList1} onChange={cb} readOnly={true} />)

    wrapper1.simulate('change')
  })
})
