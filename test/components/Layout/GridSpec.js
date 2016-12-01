import { shallow, mount } from 'enzyme'

import Grid from '../../../src/Grid.js'
import { gridClassName } from '../../testUtils';

describe('Grid Spec', () => {
  describe('Default', () => {
    const defaultWrapper = shallow(<Grid width={1 / 2} />)

    it('should be DIV tag by default', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should has "rctui-grid" class by default', () => {
      expect(defaultWrapper).to.have.className(gridClassName('rctui-grid'))
    })

    it('should has "rctui-grid-md" class by default', () => {
      expect(defaultWrapper.prop('className')).to.contain(gridClassName('rctui-grid-md-50-000'))
    })
  })

  describe('Custom', () => {
    const customWrapper = shallow(<Grid
                                    width={1 / 2}
                                    offset={1 / 2}
                                    responsive='lg'
                                    className='foo'
                                    style={{foo: 'bar'}} />)

    it('should has "rctui-offset-[responsive]-[**]-[***] class by offset prop"', () => {
      expect(customWrapper).to.have.className(gridClassName('rctui-offset-lg-50-000'))
    })

    it('should has "rctui-grid-[responsive]" class by responsive prop', () => {
      expect(customWrapper.prop('className')).to.contain(gridClassName('rctui-grid-lg-50-000'))
    })

    it('should merge addtitional classes passed in', () => {
      expect(customWrapper).to.have.className('foo')
    })

    it('should apply inline style by style prop', () => {
      expect(customWrapper).to.have.style('foo', 'bar')
    })
  })
})
