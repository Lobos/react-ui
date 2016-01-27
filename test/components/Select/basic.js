import Select from '../../../src/Select.js'

const ReactTestUtils = React.addons.TestUtils;

describe('Basic', ()=> {
  const _defaultInstance = ReactTestUtils.renderIntoDocument(
      <Select placeholder="single" data={['foo','bar','baz']}/>
    ),
    multiInstance = ReactTestUtils.renderIntoDocument(
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