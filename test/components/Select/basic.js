import React from 'react/lib/ReactWithAddons'
import createComponent from 'react-unit'

import Select from '../../../src/Select.js'


describe('Basic', ()=> {
  const _defaultInstance = createComponent(
      <Select placeholder="single" data={['foo','bar','baz']}/>
    ),
    multiInstance = createComponent(
      <Select mult={true} data={['foo','bar','baz']}/>
    )

  describe('Common', ()=> {
    it('Should render by data')
    it('Should render by placeholder')
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