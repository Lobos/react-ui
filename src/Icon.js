import classnames from 'classnames'
import { objectAssign } from './utils/objects'
import PropTypes from './utils/proptypes'
import config from './config'

import Styles from './styles/_icon.scss'

export default function Icon (props) {
  let { style, prefix, font, spin, size, icon } = props
  prefix = prefix || config.iconPrefix
  font = font || config.iconfont

  let classes = [`${prefix}`]

  if (icon) {
    classes.push(`${prefix}-${icon}`)

    if (size) {
      if (typeof size === 'number' || size.length === 1) {
        size = size + 'x'
      }
      classes.push(`${prefix}-${size}`)
    }

    classes.push(spin && `${prefix}-spin`)
  } else {
    classes = [Styles.icon]
    classes.push(spin && Styles.spin)

    if (size > 0) {
      size += 'rem'
      size = {
        fontSize: size,
        width: size,
        height: size
      }
    }
    style = objectAssign({}, { fontFamily: font }, size || {}, style)
  }

  return (
    <i style={style} className={classnames(...classes)}>
      {props.children}
    </i>
  )
}

Icon.propTypes = {
  children: PropTypes.any,
  font: PropTypes.string,
  icon: PropTypes.string,
  prefix: PropTypes.string,
  size: PropTypes.number_string,
  spin: PropTypes.bool,
  style: PropTypes.object
}

