import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Button from '../../../src/Button.js'

describe('Feature', ()=> {
  it('Should change to disabled after click when once="true"', ()=> {
    const wrapper1 = shallow(
      <Button once={true}>Button</Button>
    );

    wrapper1.find('button').simulate('click');

    assert.ok(wrapper1.prop('disabled'));
  });
});
