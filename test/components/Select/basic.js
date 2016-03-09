import React from 'react/lib/ReactWithAddons'
import {mount} from 'enzyme'

import Select from '../../../src/Select.js'


describe('Basic', ()=> {
  const _defaultSingleWrapper = mount(
      <Select placeholder="single1" data={['foo','bar','baz']}/>
    ),
    _defaultMultiWrapper = mount(
      <Select mult={true} data={['foo','bar','baz']}/>
    )

  describe('Common', ()=> {
    const _selectWrapper = _defaultSingleWrapper.find('.rct-select'),
      _placeholderWrapper = _defaultSingleWrapper.find('.placeholder')


    it('Should render by data', ()=> {
      const _optionsWrapper = _selectWrapper.find('.rct-select-options');
      assert.equal(_optionsWrapper.find('ul').children().length, 3)
    });

    it('Should render by placeholder', ()=> {
      const _placeholderText = _placeholderWrapper.text();
      assert.equal(_placeholderText.trim(), 'single1');
    });

    it('Should render by groupBy')
    it('Should render by grid')
    it('Should render by optionTpl')
    it('Should render by resultTpl')
    it('Should render by valueTpl')
    it('Should render by value')
  });

  describe('Mutiple Only', ()=> {
    it('Should render by sep')
  });
});