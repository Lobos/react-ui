import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Basic', ()=> {
  it('Should generate a i tag', ()=> {
    const wrapper1 = shallow(<Icon/>);
    assert.ok(wrapper1.is('i'));
  });

  it('Should generate a i tag with default icon prefix', ()=> {
    const wrapper1 = shallow(<Icon icon='foo'/>);
    assert.ok(wrapper1.hasClass('icon-foo'));
  });

  it('Should generate correct size-css with default icon prefix by number', ()=> {
    const wrapper1 = shallow(<Icon size='3'/>);
    const wrapper2 = shallow(<Icon size={4}/>);
    assert.ok(wrapper1.hasClass('icon-3x'));
    assert.ok(wrapper2.hasClass('icon-4x'));
  });

  it('Should generate correct size-css with default icon prefix by multiple', ()=> {
    const wrapper1 = shallow(<Icon size='lg'/>);
    const wrapper2 = shallow(<Icon size='2x'/>);
    assert.ok(wrapper1.hasClass('icon-lg'));
    assert.ok(wrapper2.hasClass('icon-2x'));
  });
});