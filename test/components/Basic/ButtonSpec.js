import { shallow } from 'enzyme'
import { compStatus } from '../../mock/button'
import Button from '../../../src/Button'

describe('Button Spec', () => {
  const defaultWrapper = shallow(<Button>
                                   Default
                                 </Button>)

  describe('Default', () => {
    it('should generate a button tag', () => {
      expect(defaultWrapper).to.have.tagName('button')
    })

    it('should have type=button by default', () => {
      expect(defaultWrapper).to.have.prop('type', 'button')
    })
  })

  describe('Custom', () => {
    it('should show the type if passed button or submit', () => {
      const wrapper1 = shallow(
          <Button type='button'>
            Button1
          </Button>
        ),
        wrapper2 = shallow(
          <Button type='submit'>
            Button2
          </Button>
      )
      expect(wrapper1).to.have.prop('type', 'button')
      expect(wrapper2).to.have.prop('type', 'submit')
    })

    it('undefined status button should be secondary', () => {
      const wrapper = shallow(
        <Button>
          Button
        </Button>
      )

      expect(wrapper).to.have.className('secondary')
    // hashClassNameTest(wrapper, 'secondary', true)
    })

    it('should be disabled', () => {
      const wrapper1 = shallow(
        <Button disabled>
          Button
        </Button>
      )
      expect(wrapper1).to.be.disabled('disabled')
    })

    it('should apply [status]-[hash:base64:5] class with status attr', () => {
      compStatus.forEach((status) => {
        const wrapper = shallow(
          <Button status={status}>
            Button
          </Button>
        )

        expect(wrapper).to.have.className(status)
      // hashClassNameTest(wrapper, status, true)
      })
    })

    it('should ensure additional classes passed in, adding but not overriding', () => {
      const wrapper1 = shallow(
        <Button className='foo'>
          Button
        </Button>
      )

      expect(wrapper1).to.have.className('foo')
    })
  })

  describe('Behavior', () => {
    it('should call onClick callback', (done) => {
      const cb = () => {
          done()
        },
        wrapper1 = shallow(
          <Button onClick={cb}>
            Button
          </Button>
      )

      wrapper1.find('button').simulate('click')
    })
  })
})
