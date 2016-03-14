import React from 'react/lib/ReactWithAddons'
import {shallow, mount} from 'enzyme'
import {compClass, compData, compSelector} from '../../mock/select.js'
import Select from '../../../src/Select.js'

describe('Feature', ()=> {
  const {dataList1} = compData;

  it('Should be read only when readOnly=true', ()=> {
    const wrapper1 = shallow(<Select data={dataList1} readOnly={true}/>);

    assert.ok(wrapper1.prop('readOnly'));
  });

  it(' Should be filtered when filterAble=true', ()=> {
    const wrapper1 = mount(<Select data={dataList1} filterAble={true}/>),
      _selectWrapper1 = wrapper1.find(compClass.select),
      _optionsWrapper1 = _selectWrapper1.find(compClass.options);

    //prop
    assert.ok(wrapper1.prop('filterAble'));

    //ui
    wrapper1.instance().showOptions();
    assert.equal(_optionsWrapper1.find(compSelector.filterDiv).find('input').length, 1);
  });

  it(' Should be multi select when mult=true', ()=> {
    const wrapper1 = shallow(<Select mult={true} data={dataList1}/>);

    assert.ok(wrapper1.prop('mult'));
  })
});