import React from 'react'
import ReactDOM from 'react-dom'

const Message = require('../../../src/Message.js');
const Overlay = require('../../../src/Overlay.js');

const ReactTestUtils = React.addons ? React.addons.TestUtils : require('react-addons-test-utils');

describe('Basic', ()=> {
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

  const _defaultInstance = ReactTestUtils.renderIntoDocument(<Message messages={[]}/>),
    _singleInstance = ReactTestUtils.renderIntoDocument(<Message messages={[_foo]}/>),
    _multiInstance = ReactTestUtils.renderIntoDocument(<Message messages={[_foo,_bar,_baz]}/>);

  it('Should generate a div container tag', ()=> {
    assert.equal(ReactDOM.findDOMNode(_defaultInstance).nodeName, 'DIV');
    assert.ok(ReactDOM.findDOMNode(_defaultInstance).className.match(_containerRegex))
  });

  it('Should have Overlay as child component', ()=> {
    const overlayInstance = ReactTestUtils.findRenderedComponentWithType(_defaultInstance, Overlay);
    const overlayCss = ReactDOM.findDOMNode(overlayInstance).className;
    assert.ok(ReactTestUtils.isCompositeComponentWithType(overlayInstance, Overlay));
    assert.ok(overlayCss.match(_overlayRegex))
  });

  it('Should have 0 items if message array is empty', ()=> {
    const itemArray = ReactTestUtils.scryRenderedDOMComponentsWithTag(_defaultInstance, 'div').filter((item)=> {
      return ReactDOM.findDOMNode(item).className.match(_messageRegex)
    });

    assert.equal(itemArray.length, 0);
  });

  it('Should have n items if message array\'s length is n', ()=> {
    const itemArray1 = ReactTestUtils.scryRenderedDOMComponentsWithTag(_singleInstance, 'div').filter((item)=> {
      return ReactDOM.findDOMNode(item).className.match(_messageRegex)
    });
    const itemArray2 = ReactTestUtils.scryRenderedDOMComponentsWithTag(_multiInstance, 'div').filter((item)=> {
      return ReactDOM.findDOMNode(item).className.match(_messageRegex)
    });

    assert.equal(itemArray1.length, 1);
    assert.equal(itemArray2.length, 3);
  });

  it('Item Should have type=info by default', ()=> {
    const itemArray1 = ReactTestUtils.scryRenderedDOMComponentsWithTag(_singleInstance, 'div').filter((item)=> {
      return ReactDOM.findDOMNode(item).className.match(/\brct-message-info\b/);
    });
    assert.equal(itemArray1.length, 1);
  });

  it('Item Should have type=error by error type', ()=> {
    const itemArray1 = ReactTestUtils.scryRenderedDOMComponentsWithTag(_multiInstance, 'div').filter((item)=> {
      return ReactDOM.findDOMNode(item).className.match(/\brct-message-error\b/);
    });
    assert.equal(itemArray1.length, 1);
  });
});
