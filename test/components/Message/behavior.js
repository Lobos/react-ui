const Message = require('../../../src/Message.js');
const Overlay = require('../../../src/Overlay.js');

const ReactTestUtils = React.addons.TestUtils;

describe('Behavior', ()=> {
  const _containerRegex = /\brct-message-container\b/,
    _overlayRegex = /\brct-overlay\b/,
    _messageRegex = /\brct-message-(info|error|success|primary|warning)\b/;

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

  const _singleInstance = ReactTestUtils.renderIntoDocument(<Message messages={[_foo]}/>),
    _multiInstance = ReactTestUtils.renderIntoDocument(<Message messages={[_foo,_bar,_baz]}/>);

  it('Should call Message.clear() to dismiss all items');

  it('Should call Message.dismiss() to dismiss one item');
});
