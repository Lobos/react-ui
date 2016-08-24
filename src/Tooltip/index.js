import { Component, PropTypes, cloneElement } from 'react'
import { findDOMNode } from 'react-dom'
import { objectAssign } from '../utils/objects'
import ClickAway from '../higherOrders/ClickAway'
import { show, hide } from './tip'

class Tooltip extends Component {
  constructor (props) {
    super(props)

    this.state = { show: false }

    this.handleShow = this.handleShow.bind(this)
  }

  handleShow () {
    const { placement } = this.props

    const el = findDOMNode(this)
    const rect = el.getBoundingClientRect()
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft

    const style = {}
    switch (placement) {
      case 'top':
        style.left = scrollLeft + rect.left + (rect.width / 2) + 'px'
        style.top = scrollTop + rect.top + 'px'
        break
      case 'bottom':
        style.left = scrollLeft + rect.left + (rect.width / 2) + 'px'
        style.top = scrollTop + rect.top + rect.height + 'px'
        break
      case 'left':
        style.left = scrollLeft + rect.left + 'px'
        style.top = scrollTop + rect.top + (rect.height / 2) + 'px'
        break
      case 'right':
        style.left = scrollLeft + rect.left + rect.width + 'px'
        style.top = scrollTop + rect.top + (rect.height / 2) + 'px'
        break
    }

    const props = objectAssign({}, this.props, { style })
    show(props)
  }

  render () {
    const { children, trigger } = this.props
    const props = {}

    if (trigger === 'hover') {
      props.onMouseEnter = this.handleShow
      props.onMouseLeave = hide
    } else {
      props.onClick = () => {
        setTimeout(this.handleShow, 10)
      }
    }

    return cloneElement(children, props)
  }
}

Tooltip.defaultProps = {
  placement: 'top',
  trigger: 'hover'
}

Tooltip.propTypes = objectAssign({
  className: PropTypes.string,
  placement: PropTypes.oneOf(['top', 'left', 'bottom', 'right']),
  style: PropTypes.object,
  tip: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover'])
}, ClickAway.propTypes)

export default ClickAway(Tooltip)
