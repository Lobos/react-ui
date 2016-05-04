import React from 'react/lib/ReactWithAddons'
import { shallow } from 'enzyme'
import { compStatus } from '../../mock/button'
import Button from '../../../src/Button'
import { hashClassNameTest } from '../../testUtils'

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

    it('should not apply button-[hash:base64:5] class on default', () => {
      hashClassNameTest(defaultWrapper, 'button', true)
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
      hashClassNameTest(wrapper, 'secondary', true)
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
          <Button status={status}>Button</Button>
        )
        hashClassNameTest(wrapper, status, true)
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

    /* remove enable disable once 方法，在我现在的观点看来，这样的操作是不应该的，所有的disable的操作都应该通过props传入。
    it('should call enable(elem) to enable disabled Button', () => {
      const wrapper1 = shallow(
        <Button disabled>
          Button
        </Button>
      )

      wrapper1.instance().enable()
      wrapper1.update()

      expect(wrapper1.find('button')).to.not.be.disabled()
    })

    it('should call disable(elem) to disable enabled Button', () => {
      const wrapper1 = shallow(
        <Button>
          Button
        </Button>
      )

      wrapper1.instance().disable()
      wrapper1.update()

      expect(wrapper1.find('button')).to.be.disabled()
    })

    it('should change to disabled after click when once="true"', () => {
      const wrapper1 = shallow(
        <Button once={true}>
          Button
        </Button>
      )

      wrapper1.find('button').simulate('click')

      expect(wrapper1.find('button')).to.be.disabled()
    })
   */
  })
})
