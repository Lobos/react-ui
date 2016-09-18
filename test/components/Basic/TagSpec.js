import { shallow } from 'enzyme'
import Tag from '../../../src/Tag'

describe('Tag Spec', () => {
  const defaultWrapper = shallow(<Tag>
                                   default
                                 </Tag>)

  describe('Default', () => {
    it('should generate a span tag', () => {
      expect(defaultWrapper).to.have.tagName('span')
    })
  })

  describe('Custom', () => {
    it('should ensure additional classes or styles passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Tag className='foo' />
      )

      const wrapper2 = shallow(
        <Tag style={{foo: 'bar'}} />
      )

      expect(wrapper1).to.have.className('foo')
      expect(wrapper2).to.have.style('foo', 'bar')
    })

    it('should render by pill prop', () => {
      const wrapper1 = shallow(
        <Tag pill/>
      )

      expect(wrapper1).to.have.className('tag-pill')
    })

    it('should render by type prop', () => {
      const wrapper1 = shallow(
        <Tag type='primary' />
      )

      expect(wrapper1).to.have.className('tag-primary')
    })
  })
})
