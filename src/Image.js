import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { addStack, removeStack } from './utils/lazyload'
import PropTypes from './utils/proptypes'
import { objectAssign } from './utils/objects'
import Mask from './Mask'
import Spin from './Spin'
import PureRender from './mixins/PureRender'
import config from './config'

import _styles from './styles/_images.scss'

const PLACEHOLDER = 0
const SRC = 1
const ALT = 2
const ERROR = 3

function imagePop (src) {
  const div = document.createElement('div')
  div.className = _styles['img-modal']
  document.body.appendChild(div)

  div.addEventListener('click', (e) => {
    if (e.target !== div) return
    document.body.removeChild(div)
  }, true)

  const img = new window.Image()
  img.onload = () => ReactDOM.render(<img src={src} />, div)
  img.onerror = () => ReactDOM.render(<div className={_styles['error']}>{config.imageNotFound}</div>, div)
  img.src = src
  ReactDOM.render(<Spin color="#f2f2f2" type="fading-circle" />, div)
}

class Image extends Component {
  constructor (props) {
    super(props)

    this.state = {
      status: PLACEHOLDER
    }

    this.handleAlt = this.handleAlt.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.markToRender = this.markToRender.bind(this)
  }

  componentWillMount () {
    if (!this.props.lazy) this.markToRender()
  }

  componentDidMount () {
    if (this.props.lazy) this._lazyId = addStack(this)
  }

  componentWillUnmount () {
    if (this.state.status === PLACEHOLDER) removeStack(this._lazyId)
  }

  handleAlt () {
    const { alt } = this.props
    if (!alt) {
      this.setState({ status: ERROR })
      return
    }

    const image = new window.Image()
    image.onload = () => this.setState({ status: ALT })
    image.onerror = () => this.setState({ status: ERROR })
    image.src = alt
  }

  markToRender () {
    const image = new window.Image()
    image.onload = () => this.setState({ status: SRC })
    image.onerror = this.handleAlt
    image.src = this.props.src
  }

  renderType (src) {
    const { title, type } = this.props

    return type === 'fill' || type === 'fit'
      ? <div className={_styles.inner} title={title} style={{backgroundImage: `url("${src}")`}} />
      : <div className={_styles.inner} title={title}><img src={src} /></div>
  }

  renderImage () {
    const { status } = this.state
    const { alt, placeholder, src, title } = this.props

    switch (status) {
      case PLACEHOLDER:
        return placeholder
          ? <div className={_styles.inner}>{placeholder}</div>
          : <Mask active className={_styles.inner} background="#f2f2f2">
              <div style={{padding: '0 10px', textAlign: 'center'}}>{title || 'Loading'}{' '}<span className={_styles.ellipsis} /></div>
            </Mask>
      case SRC:
        return this.renderType(src)
      case ALT:
        return this.renderType(alt)
      case ERROR:
        return (
          <Mask active className={_styles.inner} background="#f2f2f2">
            <div style={{padding: '0 10px', textAlign: 'center'}}>{title || config.imageNotFound}</div>
          </Mask>
        )
    }
  }

  handleClick (event) {
    const { href } = this.props
    event.preventDefault()

    imagePop(href)
  }

  render () {
    const { href, height, style, shape, type, width, target } = this.props

    const className = classnames(
      this.props.className,
      _styles.img,
      shape && _styles[`img-${shape}`],
      type && _styles[`img-${type}`]
    )

    const Tag = href ? 'a' : 'div'

    return (
      <Tag href={href}
        onClick={href && target === '_modal' && this.handleClick}
        target={target}
        className={className}
        style={objectAssign({}, style, {width, paddingBottom: height})}
      >
        { this.renderImage() }
      </Tag>
    )
  }
}

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  height: PropTypes.number_string,
  href: PropTypes.string,
  lazy: PropTypes.bool,
  placeholder: PropTypes.element,
  shape: PropTypes.oneOf([
    'rounded',
    'circle',
    'thumbnail'
  ]),
  src: PropTypes.string,
  style: PropTypes.object,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_modal'
  ]),
  title: PropTypes.string,
  type: PropTypes.oneOf([
    'fill',
    'fit',
    'stretch',
    'center'
  ]),
  width: PropTypes.number_string
}

Image.defaultProps = {
  lazy: false,
  target: '_modal',
  width: '100%'
}

export default PureRender(false)(Image)
