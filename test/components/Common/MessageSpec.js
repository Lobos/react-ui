/*

import { shallow, mount } from 'enzyme'
import { compClass, compData, compSelector } from '../../mock/message'
import Message from '../../../src/Message'
import Overlay from '../../../src/Overlay'

describe('Basic', () => {
  const {_foo, _bar, _baz} = compData

  const _defaultWrapper = shallow(<Message messages={[]} />),
    _singleWrapper = mount(<Message messages={[_foo]} />),
    _multiWrapper = mount(<Message messages={[_foo, _bar, _baz]} />)

  it('Should generate a div container tag', () => {
    expect(_defaultWrapper).to.have.tagName('div')
    expect(_defaultWrapper).to.have.className(compClass.messageContainer)
  })

  it('Should have Overlay as only child component', () => {
    expect(_defaultWrapper).to.have.exactly(1).descendants(Overlay)
  })

  it('Should have 0 items if message array is empty', () => {
    expect(_defaultWrapper).to.not.have.descendants(compSelector.messageItem)
  })

  it("Should have n items if message array's length is n", () => {
    expect(_singleWrapper).to.have.exactly(1).descendants(compSelector.messageItem)
    expect(_multiWrapper).to.have.exactly(3).descendants(compSelector.messageItem)
  })

  it('Should apply rct-message-info by default', () => {
    expect(_singleWrapper).to.have.exactly(1).descendants(compSelector.info)
  })

  it('Should apply rct-message-[type] by type', () => {
    expect(_multiWrapper).to.have.exactly(2).descendants(compSelector.info)
    expect(_multiWrapper).to.have.exactly(1).descendants(compSelector.error)
  })

  describe('Behavior', () => {
    it('Should call Message.clear() to dismiss all items')

    it('Should call Message.dismiss() to dismiss one item')
  })
})
*/
