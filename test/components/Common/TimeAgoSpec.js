import { shallow, mount } from 'enzyme'
import TimeAgo from '../../../src/TimeAgo'

describe('TimeAgo Spec', () => {
  const yearDemo = new Date(2000, 0, 1, 0, 0, 0)

  describe('Default', () => {
    const defaultWrapper = shallow(<TimeAgo base={yearDemo} />)

    it('Should generate a label container tag', () => {
      expect(defaultWrapper).to.have.tagName('label')
    })
  })

  describe('Custom', () => {
    it('should apply correct timeago text on second level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date(now.setSeconds(now.getSeconds() - 10))} />)

      expect(wrapper1).to.be.text(`10秒前`)
    })

    it('should apply correct timeago text on minute level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date((now.setMinutes(now.getMinutes() - 5)))} />)

      expect(wrapper1).to.be.text(`5分钟前`)
    })

    it('should apply correct timeago text on hour level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date(now.setHours(now.getHours() - 2))} />)

      expect(wrapper1).to.be.text(`2小时前`)
    })

    it('should apply correct timeago text on day level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date(now.setDate(now.getDate() - 5))} />)

      expect(wrapper1).to.be.text(`5天前`)
    })

    it('should apply correct timeago text on week level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date(now.setDate(now.getDate() - 8))} />)

      expect(wrapper1).to.be.text(`1周前`)
    })

    it('should apply correct timeago text on month level', () => {
      const now = new Date()
      const wrapper1 = mount(<TimeAgo base={new Date(now.setMonth(now.getMonth() - 2))} />)

      expect(wrapper1).to.be.text(`2月前`)
    })

    it('should apply correct timeago text on year level', () => {
      const wrapper1 = mount(<TimeAgo base={yearDemo} />)

      expect(wrapper1).to.be.text(`17年前`)
    })

    it('should apply correct strategy by mode prop', () => {
      const wrapper1 = mount(<TimeAgo base={yearDemo} mode='least' />)
      const wrapper2 = mount(<TimeAgo base={yearDemo} mode='most' />)

      expect(wrapper1).to.be.text(`16年前`)
      expect(wrapper2).to.be.text(`17年前`)
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
        done()
      }
      const wrapper1 = mount(<TimeAgo onClick={cb} base={yearDemo} />)

      wrapper1.find('a').simulate('click')
    })
  })
})
