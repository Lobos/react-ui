import { shallow, mount } from 'enzyme'
import { themes, compClass } from '../../mock/rating'
import Rating, { registerTheme } from '../../../src/Rating'

describe('Rating Spec', () => {
  const {stars, hearts} = themes

  const defaultWrapper = mount(<Rating icons={stars} className='foo' value={3} />)
  const defatulIconsWrapper = defaultWrapper.find('span')

  describe('Default', () => {
    it('should generate container div tag with rating class', () => {
      expect(defaultWrapper).to.have.tagName('div')
      expect(defaultWrapper).to.have.className('rating')
    })

    it('should apply addition class by className prop', () => {
      expect(defaultWrapper).to.have.className('foo')
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

    it('should active [value] icons by click native event', () => {
      defatulIconsWrapper.at(3).simulate('click')

      const activeIconsWrapper = defatulIconsWrapper.filterWhere(e => {
        return e.prop('className').indexOf('active') > 0
      })

      expect(activeIconsWrapper.length).to.be.equal(4)
    })
  })

  describe('Custom', () => {
    it('should be read only be readOnly prop', () => {
      const wrapper = mount(<Rating icons={stars} readOnly/>)

      expect(wrapper.find('span').length).to.be.equal(0)
    })

    it('should be [maxValue] icons by maxValue prop', () => {
      const wrapper = mount(<Rating icons={stars} maxValue={10} />)

      expect(wrapper.find('span').length).to.be.equal(10)
    })
  })

  describe('Behavior', () => {
    it('should call onChange callback', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(<Rating icons={stars} className='foo' onChange={cb} />)

      wrapper1.simulate('change')
    })

    it('should set corresponding theme by Rating.register(key, icons)', () => {
      registerTheme('foo', hearts)

      const wrapper = mount(<Rating theme='foo' />)
      const iconWrapper = wrapper.find('span').at(0).find('i')

      compClass.heartIcon.split(' ').forEach(e => {
        expect(iconWrapper).to.have.className(e)
      })
    })
  })
})
