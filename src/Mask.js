import React, { DOM } from 'react'
import PropTypes from './utils/proptypes'
import classnames from 'classnames'
import Spin from './Spin'
import { objectAssign } from './utils/objects'

import _styles from './styles/_mask.scss'

let defaultSpin = <Spin color="#666" size={40} type="fading-circle" />

export default function Mask (props) {
  const { active, children, background, style } = props

  if (!active) return DOM.noscript()

  const className = classnames(
    props.className,
    _styles.mask
  )

  return (
    <div className={className} style={objectAssign({}, style, {background})}>
    { children || defaultSpin }
    </div>
  )
}

Mask.propTypes = {
  active: PropTypes.bool,
  background: PropTypes.string,
  children: PropTypes.element,
  className: PropTypes.string,
  style: PropTypes.object
}

Mask.setDefaultSpin = (spin) => {
  defaultSpin = spin
}
