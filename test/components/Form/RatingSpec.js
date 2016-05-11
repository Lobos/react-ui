import React from 'react/lib/ReactWithAddons'
import { shallow, mount } from 'enzyme'
// import { compClass, compData, compSelector } from '../../mock/select'
import Rating from '../../../src/Rating'
import Icon from '../../../src/Icon'
import { hashClassNameTest } from '../../testUtils'

describe('Rating Spec', () => {
  const stars = [
    <Icon size={2} style={{color: 'gold'}}>
      &#xe607
    </Icon>,
    <Icon size={2} style={{color: 'gold'}}>
      &#xe606
    </Icon>
  ]

  const hearts = [
    <Icon size={2} icon='favorite-outline' style={{color: 'red'}} />,
    <Icon size={2} icon='favorite' style={{color: 'red'}} />
  ]

  const THEMES = {stars, hearts}

  const defaultWrapper = mount(<Rating icons={stars} value={3} />)
  const defatulIconsWrapper = defaultWrapper.find('span')

  describe('Default', () => {
    it('should generate container div tag with rating class', () => {
      expect(defaultWrapper).to.have.tagName('div')
      expect(defaultWrapper).to.have.className('rating')
    })

    it('should have 5 icons as default', () => {
      expect(defatulIconsWrapper.length).to.be.equal(5)
    })

    it('should active [value] icons by value prop', () => {
      const activeIconsWrapper = defatulIconsWrapper.filterWhere(e => {
        return e.prop('className').indexOf('active') > 0
      })

      expect(activeIconsWrapper.length).to.be.equal(3)
    })
  })
})
