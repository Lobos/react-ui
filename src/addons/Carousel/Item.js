import PropTypes from '../../utils/proptypes'
import classnames from 'classnames'

import _styles from '../../styles/_carousel.scss'

export default function Item (props) {
  const { children, current, pre } = props

  let className = classnames(
    props.className,
    _styles['carousel-item'],
    current && _styles['carousel-item-current'],
    pre && _styles['carousel-item-pre']
  )

  return (
    <div className={className}>{children}</div>
  )
}

Item.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  current: PropTypes.bool,
  pre: PropTypes.bool
}
