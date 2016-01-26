const Button = require('../../../src/Button.js');
const ReactTestUtils = React.addons.TestUtils;

describe('Feature', ()=> {
  it('Should change to disabled after click when once="true"', ()=> {
    const instance = ReactTestUtils.renderIntoDocument(
      <Button once={true}>Button</Button>
    );

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));

    assert.ok(ReactDOM.findDOMNode(instance).disabled);
  })
});
