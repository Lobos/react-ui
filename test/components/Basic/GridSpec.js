import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'

import Grid from '../../../src/Grid.js'

describe('Grid Spec', function () {
  describe('Default', function () {
    const defaultWrapper = shallow(<Grid width={1 / 2} />)

    it('should be DIV tag by default', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should has "rct-grid" class by default', () => {
      expect(defaultWrapper).to.have.className('rct-grid')
    })

    it('should has "rct-grid-md" class by default', function () {
      expect(defaultWrapper.prop('className')).to.contain('rct-grid-md')
    })
  })

  describe('Custom', function () {
    const customWrapper = shallow(<Grid
                                    width={1 / 2}
                                    offset={1 / 2}
                                    responsive='lg'
                                    className='foo'
                                    style={{foo: 'bar'}} />)

    it('should has "rct-offset-[responsive]-[**]-[***] class by offset prop"', function () {
      expect(customWrapper).to.have.className('rct-offset-lg-50-000')
    })

    it('should has "rct-grid-[responsive]" class by responsive prop', function () {
      expect(customWrapper.prop('className')).to.contain('rct-grid-lg')
    })

    it('should merge addtitional classes passed in', () => {
      expect(customWrapper).to.have.className('foo')
    })

    it('should apply inline style by style prop', () => {
      expect(customWrapper).to.have.style('foo', 'bar')
    })
  })
})
