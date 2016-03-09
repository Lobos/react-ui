import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'

import Message from '../../../src/Message.js'
import Overlay from '../../../src/Overlay.js'

describe('Basic', ()=> {
  const _foo = {
      type: 'info',
      content: 'foo'
    },
    _bar = {
      type: 'info',
      content: 'foo'
    },
    _baz = {
      type: 'error',
      content: 'foo'
    };

  const _defaultWrapper = shallow(<Message messages={[]}/>),
    _singleWrapper = mount(<Message messages={[_foo]}/>),
    _multiWrapper = mount(<Message messages={[_foo,_bar,_baz]}/>);

  it('Should generate a div container tag', ()=> {
    assert.ok(_defaultWrapper.is('div'));
    assert.ok(_defaultWrapper.hasClass('rct-message-container'))
  });

  it('Should have Overlay as only child component', ()=> {
    const _overlayWrapper = _defaultWrapper.find(Overlay);

    assert.equal(_overlayWrapper.length, 1);
  });

  it('Should have 0 items if message array is empty', ()=> {
    const itemWrapper = _defaultWrapper.find('.rct-message');

    assert.equal(itemWrapper.length, 0);
  });

  it('Should have n items if message array\'s length is n', ()=> {
    const itemWrapper1 = _singleWrapper.find('.rct-message'),
      itemWrapper2 = _multiWrapper.find('.rct-message');

    assert.equal(itemWrapper1.length, 1);
    assert.equal(itemWrapper2.length, 3);
  });

  it('Should apply rct-message-info by default', ()=> {
    const itemWrapper1 = _singleWrapper.find('.rct-message-info');

    assert.equal(itemWrapper1.length, 1);
  });

  it('Should apply rct-message-[type] by type', ()=> {
    const itemWrapper1 = _multiWrapper.find('.rct-message-info');
    const itemWrapper2 = _multiWrapper.find('.rct-message-error');

    assert.equal(itemWrapper1.length, 2);
    assert.equal(itemWrapper2.length, 1);
  });
});
