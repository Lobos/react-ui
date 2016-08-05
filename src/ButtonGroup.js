import { Children, cloneElement } from 'react'
import classnames from 'classnames'
import PropTypes from './utils/proptypes'
import _styles from './styles/_button-group.scss'

function ButtonGroup (props) {
  const { children, size, vertical, ...other } = props
  const className = classnames(
    other.className,
    _styles['btn-group'],
    vertical && _styles['btn-group-vertical']
  )

  const btns = Children.toArray(children).map(child => {
    return cloneElement(child, {
      className: _styles.btn,
      size
    })
  })

  return <div {...other} className={className}>{btns}</div>
}

ButtonGroup.propTypes = {
  children: PropTypes.array_element,
  size: PropTypes.string,
  vertical: PropTypes.bool
}

ButtonGroup.defaultProps = {
  size: 'middle'
}

export default ButtonGroup
