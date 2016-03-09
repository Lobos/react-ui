import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Icon from '../../../src/Icon.js'

describe('Behavior', ()=> {
  it('Should append icon-spin class with spin()'
  //  , ()=> {
  //  const instance = ReactTestUtils.renderIntoDocument(<Icon/>);
  //  instance.spin()
  //  assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/));
  //}
  );

  it('Should remove icon-spin class with unspin() a i tag'
  //  , ()=> {
  //  const instance = ReactTestUtils.renderIntoDocument(<Icon spin={true}/>);
  //  instance.unspin();
  //  assert.notOk(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/));
  //}
  );

  it('Should change the prefix with setPrefix(prefix)'
  //  , ()=> {
  //  Icon.setPrefix('fa');
  //  const instance1 = ReactTestUtils.renderIntoDocument(<Icon/>);
  //  const instance2 = ReactTestUtils.renderIntoDocument(<Icon icon='foo'/>);
  //  assert.ok(ReactDOM.findDOMNode(instance1).className.match(/\bfa\b/));
  //  assert.ok(ReactDOM.findDOMNode(instance2).className.match(/\bfa-foo\b/));
  //}
  );
});