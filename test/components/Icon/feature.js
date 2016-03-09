import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Feature', ()=> {
  it('Should apply icon-spin class', ()=> {
    const wrapper1 = shallow(<Icon spin={true}/>);
    assert.ok(wrapper1.hasClass('icon-spin'));
  })
});
