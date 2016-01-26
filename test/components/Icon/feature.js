const Icon = require('../../../src/Icon.js');
const ReactTestUtils = React.addons.TestUtils;

describe('Feature', ()=> {
  it('Should apply icon-spin class', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(<Icon spin={true}/>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bicon-spin\b/));
  })
});
