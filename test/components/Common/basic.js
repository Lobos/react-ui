const Button = require('../../../src/Button.js');
const ReactTestUtils = React.addons.TestUtils;

describe('Basic', ()=> {
  it('Should exist as a React Component', ()=> {
    const button = ReactTestUtils.renderIntoDocument(<Button>Button</Button>);
    assert.ok(ReactTestUtils.isCompositeComponent(button, Button));
    //TODO the rest of components
  });
});
