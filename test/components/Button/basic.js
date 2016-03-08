import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'

import Button from '../../../src/Button.js'

describe('Basic', ()=> {
  const defaultWrapper = shallow(<Button>Default</Button>);

  describe('For default one', ()=> {
    it('Should generate a button tag', () => {
      assert.ok(defaultWrapper.is('button'));
    });

    it('Should have type=button by default', () => {
      assert.equal(defaultWrapper.prop('type'), 'button');
    });
  });

  //describe('For customize one', ()=> {
  //  it('Should show the type if passed button or submit', () => {
  //    const wrapper1 = shallow(
  //        <Button type='button'>Button1</Button>
  //      ),
  //      wrapper2 = shallow(
  //        <Button type='submit'>Button2</Button>
  //      );
  //    assert.equal(wrapper1.prop('type'), 'button');
  //    assert.equal(wrapper2.prop('type'), 'submit');
  //  });
  //
  //  it('Should be disabled', () => {
  //    const wrapper1 = shallow(
  //      <Button disabled>Button</Button>
  //    );
  //    assert.ok(wrapper1.prop('disabled'));
  //  });
  //
  //  it('Should not apply rct-button-[status] class on default', () => {
  //    assert.notOk(defaultComponent.prop('className').match(/\brct-button-default\b/));
  //  });
  //
  //  it('Should apply rct-button-[status] class with status attr', () => {
  //    const wrapper1 = shallow(
  //        <Button status='danger'>Button1</Button>
  //      ),
  //      wrapper2 = shallow(
  //        <Button status='primary'>Button2</Button>
  //      );
  //
  //    assert.ok(wrapper1.prop('className').match(/\brct-button-danger\b/));
  //    assert.ok(wrapper2.prop('className').match(/\brct-button-primary\b/));
  //  });
  //
  //  it('Should ensure additional classes passed in, adding but not overriding', () => {
  //    const wrapper1 = shallow(
  //      <Button className="foo" status="danger">Button</Button>
  //    );
  //    assert.ok(wrapper1.prop('className').match(/\bfoo\b/));
  //    assert.ok(wrapper1.prop('className').match(/\brct-button-danger\b/));
  //  });
  //})
});