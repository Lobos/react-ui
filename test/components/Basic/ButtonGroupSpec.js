import { shallow, mount } from 'enzyme'
import Button from '../../../src/Button'
import ButtonGroup from '../../../src/ButtonGroup'

describe('ButtonGroup Spec', () => {
  const defaultWrapper = shallow(<ButtonGroup>
                                   <Button>
                                     Left
                                   </Button>
                                   <Button>
                                     Middle
                                   </Button>
                                   <Button disabled>
                                     Disabled
                                   </Button>
                                   <Button>
                                     Right
                                   </Button>
                                 </ButtonGroup>)

  describe('Default', () => {
    it('should generate a div tag', () => {
      expect(defaultWrapper).to.have.tagName('div')
    })

    it('should render by children button quantity', () => {
      expect(defaultWrapper.find(Button).length).to.be.equal(4)
    })
  })

  describe('Custom', function () {
    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <ButtonGroup className='foo'>
        </ButtonGroup>
      )

      expect(wrapper1).to.have.className('foo')
    })

    it('should render by vertical prop', () => {
      const wrapper1 = shallow(
        <ButtonGroup vertical>
        </ButtonGroup>
      )

      expect(wrapper1).to.have.className('btn-group-vertical')
    })

    it('should render by size prop', () => {
      const wrapper1 = mount(
        <ButtonGroup size='large'>
          <Button>
            Foo
          </Button>
        </ButtonGroup>
      )

      const itemWrapper1 = wrapper1.find(Button).at(0)

      expect(itemWrapper1).to.have.className('large')
    })
  })
})
