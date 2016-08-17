import { Component } from 'react'
import classnames from 'classnames'
import { addStack, removeStack } from '../utils/lazyload'
import PropTypes from '../utils/proptypes'
import { objectAssign } from '../utils/objects'
import Mask from '../Mask'

import _styles from '../styles/_images.scss'

let _placeholder = (
  <Mask active background="#f2f2f2">
    <div>No Image</div>
  </Mask>
)

class Image extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isRender: !props.lazy
    }

    this.markToRender = this.markToRender.bind(this)
  }

  componentWillMount () {
    if (this.props.lazy) this._lazyId = addStack(this)
  }

  componentWillUnmount () {
    if (!this.state.isRender) removeStack(this._lazyId)
  }

  markToRender () {
    this.setState({ isRender: true })
  }

  render () {
    const { isRender } = this.state
    const { src, width, height, placeholder, style, shape, type } = this.props

    const className = classnames(
      this.props.className,
      _styles.img,
      shape && _styles[`img-${shape}`],
      type && _styles[`img-${type}`]
    )

    return (
      <div className={className} style={objectAssign({}, style, {width, height})}>
        {
          isRender && src
          ? type === 'fill' || type === 'fit'
            ? <div className={_styles.inner} style={{backgroundImage: `url(${src})`}} />
            : <div className={_styles.inner}><img src={src} /></div>
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
  shape: PropTypes.oneOf([
    'rounded',
    'circle',
    'thumbnail'
  ]),
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
