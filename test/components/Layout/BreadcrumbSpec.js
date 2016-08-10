import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'

import Breadcrumb from '../../../src/Breadcrumb.js'

describe('Breadcrumb Spec', () => {
  describe('Default', () => {
    const defaultWrapper = shallow(<Grid width={1 / 2} />)

    it('should be DIV tag by default', () => {
    })

    it('should has "rctui-grid" class by default', () => {
    })

    it('should has "rctui-grid-md" class by default', () => {
    })
  })
})
