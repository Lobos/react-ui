import React from 'react/lib/ReactWithAddons'
import {shallow} from 'enzyme'
import {compClass, compData, compSelector} from '../../mock/checkbox.js'
import CheckBox from '../../../src/Checkbox.js'
import CheckBoxGroup from '../../../src/CheckboxGroup.js'

describe('Behavior', ()=> {
  it('Should call onChange callback', (done)=> {
    const cb = () => {
        done();
      },
      wrapper1 = shallow(<CheckBox text='foo' onChange={cb}/>);

    wrapper1.simulate('change');
  });
});
