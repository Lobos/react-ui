import { Component } from 'react'
import classnames from 'classnames'
import { addStack } from '../utils/lazyload'
import PropTypes from '../utils/proptypes'
import { objectAssign } from '../utils/objects'
import Spin from '../Spin'
import Mask from '../Mask'

import _styles from '../styles/_images.scss'

let _placeholder = (
  <Mask active background="#f2f2f2">
    <Spin size={30} type="fading-circle" color="#ccc" />
  </Mask>
)

class Image extends Component {
  constructor (props) {
    super(props)

    if (props.lazy) addStack(this)

    this.state = {
      isRender: !props.lazy
    }

    this.markToRender = this.markToRender.bind(this)
  }

  markToRender () {
    this.setState({ isRender: true })
  }

  render () {
    const { isRender } = this.state
    const { src, width, height, placeholder, style } = this.props

    const className = classnames(
      this.props.className,
      _styles.img
    )

    return (
      <div className={className} style={objectAssign({}, style, {width, height})}>
        {
          isRender
          ? <img src={src} />
          : placeholder || _placeholder
        }
      </div>
    )
  }
}

Image.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number_string,
  lazy: PropTypes.bool,
  placeholder: PropTypes.element,
  src: PropTypes.string,
  style: PropTypes.object,
  type: PropTypes.oneOf([
    'fill',
    'fit',
    'stretch',
    'center'
  ]),
  width: PropTypes.number_string
}

Image.defaultProps = {
  lazy: false
}

export default Image
